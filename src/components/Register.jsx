import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/auth.service';
import { loginSuccess, registerFail } from '../actions/auth';
import registerMembers from '../actions/member';
import { setMessage, clearMessage } from '../actions/message';
import soccerIcon from '../public/images/man-silhouette-playing-soccer-svgrepo-com.svg';

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

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register({ username, email, password })
        .then((response) => {
          const user = response.data;
          localStorage.setItem('user', JSON.stringify(user));

          dispatch(registerMembers(user.members));

          dispatch(loginSuccess(user));

          dispatch(clearMessage());

          navigate('/');
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch(registerFail());

          dispatch(setMessage(message));
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div
      className="row justify-content-center register-container"
      data-testid="register-container"
    >
      <div className="col-md-3 card card-container">
        <img src={soccerIcon} alt="soccer-icon" className="soccer-icon-card" />

        <Form onSubmit={handleRegister} ref={form}>
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
            <p>email</p>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
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

          <div className="form-group mt-3">
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
              type="submit"
              data-testid="submit-btn"
            >
              {loading && <span className="spinner-border spinner-border-sm" />}
              <span>Sign Up</span>
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

export default Register;
