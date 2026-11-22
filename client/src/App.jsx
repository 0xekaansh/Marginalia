import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import UserBookList from "./components/UserBookList";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchResultsPage from "./components/SearchResultPage";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <div className="appWrapper">
        <Header />
        <Toaster
          position="top-right"
          containerStyle={{
            top: 100,
            right: 24,
          }}
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--card-bg)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "10px",
              fontSize: "0.9rem",
              fontWeight: 500,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            },
            success: {
              iconTheme: {
                primary: "var(--accent-color)",
                secondary: "var(--card-bg)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--danger-color)",
                secondary: "var(--card-bg)" ,
              },
            },
          }}
        />
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/list" element={<UserBookList />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
