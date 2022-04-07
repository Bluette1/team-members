import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/auth.service';
import registerMembers from '../actions/member';
import { loginSuccess, loginFail } from '../actions/auth';
import { setMessage } from '../actions/message';
import soccerIcon from '../public/images/man-silhouette-playing-soccer-svgrepo-com.svg';
import styles from '../SoccerIcon.module.css';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return null;
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const history = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      try {
        AuthService.login({ username, password })
          .then((response) => {
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));

            dispatch(registerMembers(user.members));

            dispatch(loginSuccess(user));

            history('/');
          })
          .catch((error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            dispatch(loginFail());
            dispatch(setMessage(message));
            setLoading(false);
          });
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(loginFail());
        dispatch(setMessage(message));
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="row justify-content-center" data-testid="login-container">
      <div className="col-md-3 card card-container">
        <img src={soccerIcon} alt="soccer-icon" className={styles.soccerIcon} />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <p>username</p>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <p>Password</p>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
              type="submit"
              data-testid="submit-btn"
            >
              {loading && <span className="spinner-border spinner-border-sm" />}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
