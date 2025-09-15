from __future__ import annotations

import json
import re
import threading
import uuid

from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Tuple
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from datetime import datetime, timezone

# ----------- Config -----------
STORE_PATH = Path("feedback_store.json")  # flat file for persistence
app = Flask(__name__)
CORS(app)

# ----------- Module-scope storage -----------
feedback_store: list[dict] = []

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


# Validation
def _bad_request(field: str, message: str):
    """Return a standardized 400 response with a clear, human-readable error."""
    return make_response(jsonify({"field": field, "error": message}), 400)


def _validate_payload(payload: Dict[str, Any]) -> Tuple[dict, None] | Tuple[None, Any]:
    if not isinstance(payload, dict):
        return None, _bad_request("body", "JSON body must be an object.")

    rating = payload.get("rating")
    if rating is None:
        return None, _bad_request("rating", "Rating is required (1–5).")
    if not isinstance(rating, int):
        return None, _bad_request("rating", "Rating must be an integer.")
    if not (1 <= rating <= 5):
        return None, _bad_request("rating", "Rating must be between 1 and 5.")

    opinion = payload.get("opinion", payload.get("improvementText", "")) or ""
    if not isinstance(opinion, str):
        return None, _bad_request("opinion", "Opinion must be a string.")
    if len(opinion) > 500:
        return None, _bad_request("opinion", "Opinion cannot exceed 500 characters.")

    interested = payload.get("interestedInResearch", False)
    if not isinstance(interested, bool):
        return None, _bad_request("interestedInResearch", "Must be true or false.")

    email = payload.get("email", "")
    if interested:
        if not email:
            return None, _bad_request("email", "Email is required when interested in research.")
        if not isinstance(email, str) or not EMAIL_RE.match(email):
            return None, _bad_request("email", "Please provide a valid email address.")

    record = {
        "id": str(uuid.uuid4()),
        "rating": rating,
        "opinion": opinion,  # normalized key
        "interestedInResearch": interested,
        "email": email if interested else "",
        "submittedAt": datetime.now(timezone.utc).isoformat(),
    }
    return record, None


# ---------------------------- Persistence ------------------------------------
def _load_from_disk() -> None:
    """Load existing items from the JSON store into memory (best-effort)."""
    if not STORE_PATH.exists():
        return
    try:
        data = json.loads(STORE_PATH.read_text(encoding="utf-8"))
        if isinstance(data, list):
            feedback_store.extend(data)
    except Exception:
        pass  # ignore corrupt/unreadable file for this exercise


def _append_to_disk(item: dict) -> None:
    """Append an item to the JSON file (simple overwrite with whole list)."""
    try:
        if STORE_PATH.exists():
            current = json.loads(STORE_PATH.read_text(encoding="utf-8"))
            if not isinstance(current, list):
                current = []
        else:
            current = []
        current.append(item)
        STORE_PATH.write_text(json.dumps(
            current, ensure_ascii=False, indent=2), encoding="utf-8")
    except Exception:
        pass

# ----------- Routes -----------


@app.route("/api/feedback", methods=["POST"])
def create_feedback():
    """Create a feedback entry (validates → stores in memory + JSON file)."""
    if not request.is_json:
        return _bad_request("Content-Type", "Content-Type must be application/json.")
    payload = request.get_json(silent=True)

    record, err = _validate_payload(payload)
    if err is not None:
        return err

    feedback_store.append(record)  # in-memory
    _append_to_disk(record)        # flat-file persistence

    return make_response(jsonify({"id": record["id"], "message": "Feedback received."}), 201)


@app.route("/api/health", methods=["GET"])
def health():
    """Simple liveness check with the in-memory count (not the file count)."""
    return jsonify({"status": "ok", "count": len(feedback_store)})


if __name__ == "__main__":
    app.run(debug=True)
