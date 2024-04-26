import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { redirect, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DetailForm = () => {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const [choiceType, setChoiceType] = useState("");
  const [choices, setChoices] = useState([]);
  const [isRequired, setIsRequired] = useState(false);
  const [errorQuestion, setErrorQuestion] = useState({});
  const [isFillInput, setIsFillInput] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const [form, setForm] = useState({});
  const [questions, setQuestions] = useState([]);
  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    axios
      .get(`http://127.0.0.1:8000/api/v1/forms/${param.slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.forms);
        console.log(response.data.forms.questions);
        setForm(response.data.forms);
        setQuestions(response.data.forms.questions);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.status == 403) {
          setErrorForm(err.response.data.message);
        }
      });
  }, [questions]);

  const deleteQuestion = (questionId) => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/v1/forms/${param.slug}/questions/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addQuestion = (data) => {
    axios
      .post(`http://127.0.0.1:8000/api/v1/forms/${form.slug}/questions`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setIsFillInput(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrorQuestion(err.response.data.errors);
      });
  };

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
          <div className="row">
            {errorForm ? (
              <div className="alert alert-danger">{errorForm}</div>
            ) : (
              <>
                <div className="jumbotron">
                  <div className="display-4 fw-bold">{form.name}</div>
                  <div className="lead text-break">{form.description}</div>
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      value={window.location.href}
                    />
                    <label
                      className="input-group-text bg-primary text-white pointer"
                      role="button"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Copied");
                      }}
                    >
                      Copy Link
                    </label>
                  </div>
                </div>
                {!isFillInput && (
                  <section className="add-question mt-5">
                    <div className="row">
                      <div className="col-12 card">
                        <form
                          className="card-body"
                          onSubmit={(e) => {
                            e.preventDefault();
                            let data = {
                              name: e.target[0].value,
                              choice_type: choiceType,
                              is_required: isRequired,
                            };

                            if (
                              choiceType == "multiple choice" ||
                              choiceType == "dropdown" ||
                              choiceType == "checkboxes"
                            ) {
                              let arr = choices.split(",");
                              data.choices = arr;
                            }

                            addQuestion(data);
                          }}
                        >
                          <h1 className="text-header text-center mb-5">
                            Add Question
                          </h1>
                          <div className="form-floating mb-4">
                            <input
                              type="text"
                              id="name"
                              className={`form-control ${
                                errorQuestion.name && "is-invalid"
                              }`}
                              placeholder="Name"
                            />
                            <label htmlFor="name" className="form-label">
                              Name
                            </label>
                            {errorQuestion.name && (
                              <div className="invalid-feedback">
                                {errorQuestion.name}
                              </div>
                            )}
                          </div>
                          <div className="mb-4">
                            <select
                              name="choice_type"
                              id="choice_type"
                              className={`form-select ${
                                errorQuestion.choice_type && "is-invalid"
                              }`}
                              onChange={(e) => {
                                console.log(e.target.value);
                                setChoiceType(e.target.value);
                              }}
                            >
                              <option value="Choice Type" selected disabled>
                                Choice Type
                              </option>
                              <option value="short answer">Short Answer</option>
                              <option value="paragraph">Paragraph</option>
                              <option value="date">Date</option>
                              <option value="multiple choice">
                                Multiple Choice
                              </option>
                              <option value="dropdown">Dropdown</option>
                              <option value="checkboxes">Checkboxes</option>
                            </select>
                            {errorQuestion.name && (
                              <div className="invalid-feedback">
                                {errorQuestion.choice_type}
                              </div>
                            )}
                          </div>
                          {choiceType == "multiple choice" ||
                          choiceType == "dropdown" ||
                          choiceType == "checkboxes" ? (
                            <div className="form-floating mb-4">
                              <input
                                type="text"
                                id="choices"
                                className={`form-select ${
                                  errorQuestion.choice_type && "is-invalid"
                                }`}
                                placeholder="Choices"
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  setChoices(e.target.value);
                                }}
                              />
                              <label htmlFor="choices" className="form-label">
                                Choice
                              </label>
                              <div className="form-text">
                                Jika pilihan lebih dari 1 pisahkan dengan koma
                              </div>
                              {errorQuestion.name && (
                                <div className="invalid-feedback">
                                  {errorQuestion.choice_type}
                                </div>
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="form-check form-switch mb-3">
                            <input
                              type="checkbox"
                              id="is_required"
                              className="form-check-input"
                              onChange={(e) => {
                                console.log(e.target.checked);
                                setIsRequired(e.target.checked);
                              }}
                            />
                            <label
                              htmlFor="is_required"
                              className="form-check-label"
                            >
                              Is Required
                            </label>
                          </div>
                          <div className="mb-4">
                            <input
                              type="submit"
                              value="Save"
                              className="btn btn-primary"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
                )}
                <section className="question mt-5">
                  <div className="row">
                    {questions.map((question) => {
                      return question.choice_type == "multiple choice" ||
                        question.choice_type == "dropdown" ||
                        question.choice_type == "checkboxes" ? (
                        <div className="col-12 card my-3 p-0" key={question.id}>
                          <div className="card-body d-flex justify-content-between align-items-center">
                            <div className="content">
                              <p className="text-base">{question.name}</p>
                              <ol className="">
                                {question.choices.map((choice, i) => {
                                  return <li key={i}>{choice}</li>;
                                })}
                              </ol>
                            </div>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                deleteQuestion(question.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="col-12 card my-3 p-0" key={question.id}>
                          <div className="card-body d-flex justify-content-between align-items-center">
                            <p className="textbase">{question.name}</p>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                deleteQuestion(question.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailForm;
