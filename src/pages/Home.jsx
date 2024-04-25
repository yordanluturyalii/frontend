import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    axios
      .get("http://127.0.0.1:8000/api/v1/forms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.forms);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickLogout = () => {
    axios
      .post("http://127.0.0.1:8000/api/v1/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err.response.data.message));

    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <>
      <Navbar name={name} onClick={handleClickLogout} />
      <main className="mt-5 pt-5">
        <div className="container">
          <Link to={"/create-form"} className="btn btn-primary mx-5">
            Create Form
          </Link>
          <div className="row">
            {data.map((form) => {
              return (
                <div
                  key={form.id}
                  className="col-3 card p-0 mx-5 my-4"
                  style={{ height: "300px", overflow: "hidden" }}
                >
                  <div className="card-header">
                    <h1 className="fs-5">
                      <Link
                        to={`/forms/${form.slug}`}
                        className="text-decoration-none text-dark"
                      >
                        {form.name}
                      </Link>
                    </h1>
                  </div>
                  <div className="card-body">
                    <p className="">{form.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
