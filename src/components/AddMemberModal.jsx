import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import uuid from 'react-uuid';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import MemberService from '../services/member.service';
import { addMember } from '../actions/member';
import showMemberModal from '../actions/membermodal';
import authHeader from '../services/auth.header';

import { setMessage } from '../actions/message';

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

const AddMemberModal = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const companies = [
    'LA Galaxy',
    'Manchester United',
    'DC United',
    'Liverpool',
    'Bayern Munich',
  ];

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeCompany = (e) => {
    const company = e.target.value;
    setCompany(company);
  };

  const onChangeStatus = (e) => {
    const status = e.target.value;
    setStatus(status);
  };

  const onChangeNotes = (e) => {
    const notes = e.target.value;
    setNotes(notes);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    const body = document.getElementsByClassName('main')[0];
    dispatch(showMemberModal({ flag: false }));
    body.classList.remove('add-member');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      try {
        const headers = authHeader(currentUser);
        MemberService.createMember({ name, company, status, notes }, headers)
          .then((response) => {
            const member = response.data;
            dispatch(addMember(member));
            dispatch(showMemberModal({ flag: false }));
            const body = document.getElementsByClassName('main')[0];
            body.classList.remove('add-member');
          })
          .catch((error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

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

        dispatch(setMessage(message));
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className="row col-md-11 add-member-modal p-0 m-0"
      data-testid="add-member-container"
    >
      <div className="d-flex justify-content-center p-0 m-0">
        <div className="col-md-11 pl-1 pt-4">
          <h5>Add Members</h5>
          <Form className="col-md-11" onSubmit={handleSubmit} ref={form}>
            <div className="form-group">
              <p>Name</p>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={onChangeName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <p>Company</p>
              <Select
                name="company-select"
                id="companies-select"
                onChange={onChangeCompany}
              >
                <option value="">--Please choose a company--</option>
                {companies.map((item) => (
                  <option
                    value={item}
                    key={`company-${uuid()}`}
                    validations={[required]}
                  >
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            <div className="form-group">
              <p>Status</p>
              <Input
                type="text"
                className="form-control"
                name="status"
                value={status}
                onChange={onChangeStatus}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <p>Notes</p>
              <textarea
                id="notes"
                name="notes"
                rows="4"
                cols="50"
                value={notes}
                onChange={onChangeNotes}
              />
            </div>

            <div className="d-flex justify-content-end pt-1">
              <div>
                <button
                  className="modal-btn cancel-btn"
                  disabled={loading}
                  type="button"
                  data-testid="cancel-btn"
                  onClick={handleCancel}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm" />
                  )}
                  <span>Cancel</span>
                </button>
                <button
                  className="modal-btn"
                  disabled={loading}
                  type="submit"
                  data-testid="submit-btn"
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm" />
                  )}
                  <span>Save</span>
                </button>
              </div>
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
    </div>
  );
};

export default AddMemberModal;
