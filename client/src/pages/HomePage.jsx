import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/footer/Footer";
import AppNavbar from "./../components/common/Navbar";
import CreatePage from "./CreatePage";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import ReadPage from "./ReadPage";
import RegisterPage from "./RegisterPage";
import SinglePage from "./SinglePage";
import Update from "./Update";
import "./style.css";
const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div>
      <BrowserRouter>
        <AppNavbar isLoggedIn={isLoggedIn} />
        <main>
          <Routes>
            <Route path="/" element={<ReadPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/getOne/:id" element={<SinglePage />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Homepage;
