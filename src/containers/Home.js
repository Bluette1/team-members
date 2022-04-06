import React from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { Navigate } from 'react-router-dom';
import Member from '../components/MemberItem';
import StatusFilter from '../components/StatusFilter';

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  const { members } = currentUser;
  const { filter: status } = useSelector((state) => state.filter);
  let filteredMembers = members;
  if (status !== '') {
    filteredMembers = members.filter((member) => member.status === status);
  }

  return (
    <div>
      <StatusFilter />
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
          {filteredMembers && filteredMembers.length > 0 ? (
            <>
              {filteredMembers.map((member) => (
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
