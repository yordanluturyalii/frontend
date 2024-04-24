import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import axios from "axios";

const DetailForm = () => {

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

  return (
    <>
        <Navbar name={name} onClick={handleClickLogout} /> 
        <main className="mt-5 pt-5">
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <div className="col-12">
                            <h1 className="display-4 fw-bold">Hello World</h1>
                            <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, perferendis dolores possimus dolorum, dignissimos quisquam a amet ipsa delectus hic aliquam maiores! Sunt sapiente nesciunt commodi. Illo earum esse eos.</p>
                            <div className="input-group input-group-lg mt-3">
                                <input type="text" className="form-control" value={window.location.href} disabled />
                                <span className="input-group-text bg-primary text-white" role="button">Copy Url</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default DetailForm