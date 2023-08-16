import loader from "../../assets/img/loader2.svg";
import "./loader.css";

const Loader = () => {
  return (
    <div className="ProcessingDiv">
      <div className="center-screen">
        <img className="loader-size" src={loader} alt="loader img" />{" "}
      </div>
    </div>
  );
};

export default Loader;
