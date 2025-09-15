# InnoBee Feedback App 🐝

A simple full-stack application that collects user feedback.

- **Backend**: Flask API (Task 1)
- **Frontend**: React (Task 2)

---

## 🚀 Backend (Flask)

```bash
cd backend
source .venv/Scripts/activate
python app.py
```

→ available at: [http://127.0.0.1:5000](http://127.0.0.1:5000)

### Test with curl:

```bash
# health
curl http://127.0.0.1:5000/api/health

# valid submission
curl -X POST http://127.0.0.1:5000/api/feedback \
 -H "Content-Type: application/json" \
 -d '{"rating":5,"opinion":"Nice!","interestedInResearch":true,"email":"rahaf@test.com"}'

# invalid (missing email but interested)
curl -X POST http://127.0.0.1:5000/api/feedback \
 -H "Content-Type: application/json" \
 -d '{"rating":4,"interestedInResearch":true}'
```

---

## 🎨 Frontend ( React )

### 1. Setup

```bash
cd frontend
npm install
```

### 2. Run the frontend

```bash
npm run dev
```

Runs at: [http://127.0.0.1:5173](http://127.0.0.1:5173)

---
# InnoBee-Feedback-App
