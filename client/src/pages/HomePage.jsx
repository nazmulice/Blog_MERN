import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/footer/Footer";
import AppNavbar from "./../components/common/Navbar";
import CreatePage from "./CreatePage";
import ReadPage from "./ReadPage";
import SinglePage from "./SinglePage";
import Update from "./Update";
import "./style.css";
const Homepage = () => {
  return (
    <div>
      <BrowserRouter>
        <AppNavbar />
        <main>
          <Routes>
            <Route path="/" element={<ReadPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/getOne/:id" element={<SinglePage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Homepage;
