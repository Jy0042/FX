import { Link } from 'react-router-dom'; // Link를 import합니다.

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">FX</a> */}
          <Link className="navbar-brand" to="/">
            FX
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  환율계산기
                </a>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" to="/community" href="#">커뮤니티</a> */}
                <Link className="nav-link" to="/community">
                  커뮤니티
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex ms-auto">
            <button className="btn btn-outline-primary me-2">로그인</button>
            <button className="btn btn-primary">회원가입</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
