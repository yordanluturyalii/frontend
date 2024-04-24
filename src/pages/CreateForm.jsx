import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import axios from "axios";

const CreateForm = () => {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
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
    localStorage.removeItem("token");

    navigate("/");
  };

  const createForm = (data) => {
    axios.post("http://127.0.0.1:8000/api/v1/forms", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleSubmitCreateForm = (e) => {
    e.preventDefault();
    createForm({
      name: e.target[0].value,
      slug: e.target[1].value,
      description: e.target[2].value,
      allowed_domains: e.target[3].value,
      limit_one_response: e.target[4].value
    });
  }

  return (
    <>
      <Navbar name={name} onClick={handleClickLogout} />
      <main className="mt-5 pt-5">
        <div className="container">
          <div className="header mb-5">
            <h1 className="text-center fw-bold">Create Form</h1>
          </div>
          <form onSubmit={handleSubmitCreateForm}>
            <div className="form-floating my-3">
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name"
              />
              <label htmlFor="name" className="form-label">
                Name
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="slug"
                className="form-control"
                placeholder="Slug"
              />
              <label htmlFor="slug" className="form-label">
                Slug
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="description"
                className="form-control"
                placeholder="Description"
              />
              <label htmlFor="description" className="form-label">
                Description
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="domain"
                className="form-control"
                placeholder="Domain"
              />
              <label htmlFor="domain" className="form-label">
                Domain
              </label>
            </div>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                id="limit_one_response"
                className="form-check-input"
              />
              <label htmlFor="limit_one_response" className="form-check-label">
                Limit One Response
              </label>
            </div>
            <div className="mb-3">
              <input
                type="submit"
                value="Create Form"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateForm;
