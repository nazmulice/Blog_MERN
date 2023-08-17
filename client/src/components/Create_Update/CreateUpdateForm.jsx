import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
//import { errorToast, successToast } from "../../helper/Validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Set default values based on your model
  const defaultFormValues = {
    title: "",
    author: " ",
    content: "",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmiqR_gB1aE6SmGpJvgdi6j6MZYtLpcSittA&usqp=CAU",
  };

  const [FormValue, setFormValue] = useState(id ? {} : defaultFormValues);

  useEffect(() => {
    (async () => {
      let res = await axios.get("http://localhost:8000/api/v1/getOne/" + id);
      setFormValue(res.data["data"]);
    })();
  }, []);

  const InputOnChange = (property, value) => {
    setFormValue({ ...FormValue, [property]: value });
  };

  const handleSaveData = async () => {
    const isEmptyField = Object.values(FormValue).some((value) => value === "");

    if (isEmptyField) {
      toast.error("Please fill all fields");
    } else {
      try {
        let URL = "http://localhost:8000/api/v1/create";

        if (id) {
          URL = `http://localhost:8000/api/v1/update/${id}`;
        }

        const res = await axios.post(URL, FormValue);
        if (res.status === 200) {
          toast.success("Data saved successfully");
          navigate("/", { replace: true });
        } else {
          toast.error("Data failed to save. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred");
      
      }
    }
  };

  return (
    <div className="container card mt-2 shadow border rounded mb-3 py-2 p-md-4">
      <h3 className="text-center text-success fw-bold card-title">
        {id ? "UPDATE BLOG" : "CREATE NEW BLOG"}
      </h3>
      <hr />
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 pl-4 pb-2">
            <label>
              <h5>Blog Title</h5>
            </label>
            <input
              onChange={(e) => {
                InputOnChange("title", e.target.value);
              }}
              value={FormValue.title}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-12 pl-4 pb-2">
            <label>
              <h5>Author Name</h5>
            </label>
            <input
              onChange={(e) => {
                InputOnChange("author", e.target.value);
              }}
              value={FormValue.author}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-12 pl-4 pb-2">
            <label>
              <h5>Content Blog</h5>{" "}
            </label>
            <textarea
              onChange={(e) => {
                InputOnChange("content", e.target.value);
              }}
              value={FormValue.content}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-12 pl-4 pb-2">
            <label>
              <h5>Image</h5>
            </label>
            <input
              onChange={(e) => {
                InputOnChange("img", e.target.value);
              }}
              value={FormValue.img}
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 p-1">
            <button onClick={handleSaveData} className="btn btn-success w-50">
              <h4>Submit</h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUpdateForm;
