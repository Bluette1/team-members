import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import MemberService from '../services/member.service';
import { removeMember } from '../actions/member';
import { setMessage } from '../actions/message';
import authHeader from '../services/auth.header';

const MemberItem = ({ item }) => {
  const { id, name, company, status, updatedAt, notes, createdAt } = item;
  let dateUpdated = createdAt;
  if (updatedAt) {
    dateUpdated = updatedAt;
  }
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);

  const handleRemove = (e) => {
    e.preventDefault();
    try {
      const headers = authHeader(currentUser);
      MemberService.deleteMember(id, headers)
        .then(() => {
          dispatch(removeMember(item));
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch(setMessage(message));
        });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(setMessage(message));
    }
  };

  return (
    <tr className="d-flex">
      <td>
        <input
          className="mx-2"
          type="checkbox"
          name="select-member"
          id="select-member"
        />
        {name}
      </td>
      <td>{company}</td>
      <td>{status}</td>
      <td>{moment(dateUpdated).format('DD/MM/YYYY')}</td>
      <td>{notes}</td>
      <td>
        <i onClick={handleRemove} className="fa fa-trash" aria-hidden="true" />
      </td>
    </tr>
  );
};

MemberItem.propTypes = {
  /* eslint-disable */
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  /* eslint-enable */
};
export default MemberItem;
