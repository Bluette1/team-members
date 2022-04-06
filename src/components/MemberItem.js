import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const MemberItem = ({ item }) => {
  const { name, company, status, updatedAt, notes, createdAt } = item;
  let dateUpdated = createdAt;
  if (updatedAt) {
    dateUpdated = updatedAt;
  }

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
        <i className="fa fa-trash" aria-hidden="true" />
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
