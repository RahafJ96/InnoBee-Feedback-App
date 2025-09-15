import "./App.css";
import FeedBackPage from "./FeedBackPage";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        <main className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
            InnoBee <span className="text-accent">Feedback</span>
            <img
              src="../src/assets/bee.webp"
              alt="Bee Logo"
              className="m-3 w-12 h-12 inline-block"
            />
          </h1>
          <div className="mt-10">
            <FeedBackPage />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
