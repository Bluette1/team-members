import React, { useEffect } from 'react';
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import AddMemberModal from './components/AddMemberModal';
import Home from './containers/Home';
import history from './helpers/history';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { logout } from './actions/auth';
import showMemberModal from './actions/membermodal';
import { clearMessage } from './actions/message';
import '../node_modules/bootstrap/dist/js/bootstrap.min';

const App = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const { showAddMemberModal } = useSelector((state) => state.membermodal);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    history.listen(() => {
      dispatch(clearMessage());
    });
  }, [dispatch]);
  const logOut = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => {
      alert('You have successfully logged out');
      window.location.reload();
    });
  };
  const handleAddMembers = (e) => {
    e.preventDefault();
    dispatch(showMemberModal({ flag: true }));
    const body = document.getElementsByClassName('main')[0];
    body.classList.add('add-member');
  };
  return (
    <Router navigator={history}>
      <div className="main">
        <nav className="d-flex justify-content-between navbar navbar-expand-lg navbar-text">
          <div className="p-3">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerLeft"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-nav mr-auto" id="navbarTogglerLeft">
              <a href="/" className="navbar-brand">
                &nbsp;Team Members
              </a>
              {currentUser && (
                <li className="nav-item">
                  &nbsp;
                  <button
                    type="button"
                    className="navbtn"
                    onClick={handleAddMembers}
                  >
                    Add Members
                    <i className="fa fa-plus p-2" aria-hidden="true" />
                  </button>
                  {message && (
                    <span className="alert alert-danger">{message}</span>
                  )}
                </li>
              )}
            </div>
          </div>
          <div className="p-3">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerRight"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-nav mr-auto" id="navbarTogglerRight">
              {!currentUser && (
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    &nbsp;Register
                  </Link>
                </li>
              )}

              {!currentUser && (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    &nbsp;Login
                  </Link>
                  {message && (
                    <span className="alert alert-danger">{message}</span>
                  )}
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    &nbsp;Logout
                  </a>
                  {message && (
                    <span className="alert alert-danger">{message}</span>
                  )}
                </li>
              )}
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </div>
      </div>
      {showAddMemberModal && <AddMemberModal />}
      <div />
    </Router>
  );
};

export default App;
