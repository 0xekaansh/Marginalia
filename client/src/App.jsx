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
import "./app.css"

function App() {
  return (
    <BrowserRouter>
      <div className="appWrapper">
        <Header />
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
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
