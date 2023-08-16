import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./pages/HomePage";

function App() {
  return (
    <div>
      <ToastContainer />
      <Homepage />
    </div>
  );
}

export default App;
