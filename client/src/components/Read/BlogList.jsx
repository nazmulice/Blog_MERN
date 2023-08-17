import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { cancelToast, errorToast } from "../../helper/Validation";
import Loader from "../common/Loader";

const BlogList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/getAll");
      if (res.status === 200) {
        setData(res.data["data"]);
      } else {
        errorToast("Error fetching data");
      }
    } catch (error) {
      errorToast("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Confirm Deletion",
        text: "Are you sure you want to delete this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:8000/api/v1/delete/${id}`
        );

        if (response.status === 200) {
          //errorToast("Post deleted successfully");
          Swal.fire({
            icon: "success",
            title: "Post Deleted",
            text: "Blog deleted successfully.",
          });

          fetchData();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong while deleting the post.",
          });
        }
      } else {
        cancelToast("Deletion canceled!");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the post.",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const filteredData = data.filter((item) => {
    const regex = new RegExp(searchQuery, "i"); 
    return regex.test(item.title) || regex.test(item.content);
  });

  return (
    <div className="container mt-4">
      <input
        type="text"
        placeholder="Search blog posts..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-4"
      />

      {searchQuery && (
        <p className="mb-4 p-2 bg-body-secondary">
          {filteredData.length === 0
            ? "No matching results"
            : `Showing ${filteredData.length} ${
                filteredData.length === 1 ? "result" : "results"
              } for "${searchQuery}"`}
        </p>
      )}

      {/* {filteredData.length > 0 && (
        <h1 className="mb-4 p-2 bg-body-secondary">Latest Blog</h1>
      )} */}

      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <div className="card">
                <img
                  height="260px"
                  src={item.img}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    {item.content.length > 100
                      ? item.content.substring(0, 100) + "..."
                      : item.content}
                  </p>

                  <Link
                    to={"/getOne/" + item["_id"]}
                    className="btn btn-outline-primary btn-sm m-1"
                  >
                    Read More
                  </Link>

                  <Link
                    to={"/update/" + item["_id"]}
                    className="btn btn-success btn-sm m-1"
                  >
                    Update
                  </Link>

                  <button
                    className="btn btn-danger btn-sm m-1"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-danger">
            {searchQuery ? "No matching results" : "Enter a search query"}
          </h4>
        )}
      </div>
    </div>
  );
};

export default BlogList;
