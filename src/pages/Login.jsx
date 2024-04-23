import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { redirect, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
    const [data, setData] = useState(initialState);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, []);

  const handleChangeEmail = (e) => {
    setData({ ...data, email: e.target.value });
  };

  const handleChangePassword = (e) => {
    setData({ ...data, password: e.target.value });
  };

  const login = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        if (response.status == 401) {
          throw new Error(json.message);
        }
      }

      localStorage.setItem('name', json.user.name);
      localStorage.setItem('email', json.user.email);
      localStorage.setItem('token', json.user.accessToken);

      setSuccess(json);

      setTimeout(() => navigate('/home'), 3000);
    } catch (error) {
        setError(error.message);
    }
  };

  const handleSubmitLoginForm = (e) => {
    e.preventDefault();
    login();
    
  };

  return (
    <>
    <Navbar /> 
      <main>
        <section className="login">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6 card p-0">
                <div className="card-header">
                  <h1 className="text-center">Formify</h1>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmitLoginForm}>
                    {error && (
                      <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        {error.toString()}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    )}
                    {
                        success && 
                        <div
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                      >
                        {success.message.toString()}
                      </div>
                    }
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fs-6">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChangeEmail}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label fs-6">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        className="form-control"
                        placeholder="Password"
                        required
                        onChange={handleChangePassword}
                      />
                    </div>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
