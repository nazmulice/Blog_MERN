import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";

const SinglePage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/getOne/${id}`
        );
        if (res.status === 200) {
          setPost(res.data["data"]); // Assuming your API returns the entire post object
        } else {
          setError("Error fetching post data");
        }
      } catch (error) {
        setError("Error fetching");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <img
          width="580px"
          height="340px"
          src={post.img}
          className="card-image"
          alt={post.title}
        />
        <div className="card-body">
          <div className="text-justify">
            <h1 className="mb-4">{post.title}</h1>

            <p style={{ textAlign: "justify" }}>{post.content}</p>
            <p>Create Date - {new Date(post.createdAt).toLocaleDateString()}</p>
            <h5>Author - {post.author}</h5>
          </div>

          <Link to={"/"} className="btn btn-success btn-lg m-1">
            Back
          </Link>

          <Link
            to={"/update/" + post["_id"]}
            className="btn btn-warning btn-lg m-1"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
