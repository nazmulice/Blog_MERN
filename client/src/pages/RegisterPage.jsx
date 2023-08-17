import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast } from "../helper/Validation";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const changeHandler = (property, value) => {
    setFormData({ ...formData, [property]: value });
  };

  const onSubmit = () => {
    const isEmptyField = Object.values(formData).some((value) => value === "");
    if (isEmptyField) {
      errorToast("Please fill all fields");
    } else {
      try {
        let URL = "http://localhost:8000/api/v1/register";
        axios.post(URL, formData).then((res) => {
          if (res.status === 200) {
            toast.success("User Registration Successfully");
          }
          if (!res.status === 200) {
            toast.error("An error occurred");
          }
          navigate("/login"); //redirect to login
        });
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="container  shadow border rounded mt-3 py-2 p-md-5">
      <span className="fs-2">Register Form</span>
      <div className="row">
        <div className="col-md-12">
          <label className="py-2 text-black-50">Name</label>
          <input
            placeholder="Enter Your Name"
            type="text"
            onChange={(e) => {
              changeHandler("name", e.target.value);
            }}
            value={formData.name}
            className="form-control"
          />
          <br />
        </div>
        <div className="col-md-12">
          <label className="pb-2 text-black-50">Email</label>
          <input
            placeholder="Enter Your email"
            type="text"
            value={formData.email}
            onChange={(e) => {
              changeHandler("email", e.target.value);
            }}
            className="form-control"
          />
          <br />
        </div>
        <div className="col-md-12">
          <label className="pb-2 text-black-50">Password</label>
          <input
            type="password"
            onChange={(e) => {
              changeHandler("password", e.target.value);
            }}
            className="form-control"
            placeholder="Password"
          />
          <br />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12 pb-2  text-md-start text-center">
          <button onClick={onSubmit} className="btn bg-success text-white">
            Register
          </button>
        </div>
        <div className="col-md-9">
          <p>
            Already have an account!{" "}
            <Link to={"/login"} className="btn btn-outline-primary btn-sm m-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
