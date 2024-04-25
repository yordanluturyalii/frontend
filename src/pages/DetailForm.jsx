import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";

const DetailForm = () => {

  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({});
  const [question, setQuestion] = useState([]);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    
    axios.get(`http://127.0.0.1:8000/api/v1/forms/${param.slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      console.log(response.data.forms);
      console.log(response.data.forms.questions);
      setForm(response.data.forms);
      setQuestion(response.data.forms.questions);
    })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleClickCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Copied");
  }

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

  return (
    <>
        <Navbar name={name} onClick={handleClickLogout} /> 
        <main className="mt-5 pt-5">
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <div className="col-12">
                            <h1 className="display-4 fw-bold">{form.name}</h1>
                            <p className="lead">{form.description}</p>
                            <div className="input-group input-group-lg mt-3">
                                <input type="text" className="form-control" value={window.location.href} disabled />
                                <span className="input-group-text bg-primary text-white" role="button" onClick={handleClickCopyUrl}>Copy Url</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 pt-5 justify-content-center">
                  <div className="card col-8 p-0">
                    <div className="card-body">
                      <h1 className="text-header text-center">Post Question</h1>
                      <form>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input type="text" id="name" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="choice type" className="form-label">Choice Type</label>
                          <select id="choice type" className="form-select">
                            <option selected disabled>Choices</option>
                            <option value="short answer">Short Answer</option>
                            <option value="paragraph">Paragraph</option>
                            <option value="date">Date</option>
                            <option value="multiple choice">Multiple Choice</option>
                            <option value="dropdown">Dropdown</option>
                            <option value="checkboxes">Checkboxes</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="choices" className="form-label">Choices</label>
                          <input type="text" id="choices" className="form-control" />
                          <div className="form-text">
                            Jika domain lebih dari satu, pisahkan dengan koma
                          </div>
                        </div>
                        <div className="mb-3 form-check form-switch">
                          <input type="checkbox" id="is required" className="form-check-input"/>
                          <label htmlFor="is required" className="form-check-label">Is Required</label>
                        </div>
                        <div className="mb-3">
                          <input type="submit" value="Post Question" className="btn btn-primary" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default DetailForm