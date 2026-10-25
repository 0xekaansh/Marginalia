import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import UserBookList from "./components/UserBookList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/list" element={<UserBookList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;