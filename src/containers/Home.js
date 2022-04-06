import React from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { Navigate } from 'react-router-dom';
import Member from '../components/MemberItem';
import StatusSort from '../components/StatusSort';

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  const { members } = currentUser;
  const { sortorder: status } = useSelector((state) => state.sortorder);

  const sortedMembers = JSON.parse(JSON.stringify(members));

  if (status !== '') {
    if (status === 'ASC') {
      sortedMembers.sort((a, b) => a.status.localeCompare(b.status));
    } else {
      sortedMembers.sort((a, b) => a.status.localeCompare(b.status)).reverse();
    }
  }

  return (
    <div>
      <StatusSort />
      <table style={{ width: '100%' }}>
        <thead>
          <tr className="d-flex">
            <td className="member-name mx-2">Name</td>
            <td className="member-company">Company</td>
            <td className="member-status"> Status</td>
            <td className="member-last-updated">Last Updated</td>
            <td className="member-notes"> Notes</td>
            <td className="member-remove">&nbsp;</td>
          </tr>
        </thead>

        <tbody>
          {sortedMembers && sortedMembers.length > 0 ? (
            <>
              {sortedMembers.map((member) => (
                <Member key={`member-${uuid()}`} item={member} />
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
