import { Link } from "react-router-dom";

const Navbar = ({name, onClick}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary fixed-top">
      <div className="container">
        <Link to={"/"} className="navbar-brand text-white">
          Formify
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                {name}
              </a>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-link btn ms-4 bg-white text-primary fw-bold"
                onClick={onClick}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
