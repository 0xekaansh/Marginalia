import HubIcon from "@mui/icons-material/Hub";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from "./Navigation";
import Search from "./Search";
import UserBookList from "./UserBookList"

function Header() {
  return (
    <header>
      <h1><HubIcon /> Marginalia</h1>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/list" element={<UserBookList />} />
        </Routes>
      </BrowserRouter>
    </header>
  );
}

export default Header;
