import React from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { Navigate } from 'react-router-dom';
import Member from '../components/MemberItem';

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  const { members } = currentUser;

  return (
    <div>
      <table style={{ width: '100%' }}>
        <thead>
          <tr className="d-flex">
            <td className="member-name">Name</td>
            <td className="member-company">Company</td>
            <td className="member-status"> Status</td>
            <td className="member-last-updated">Last Updated</td>
            <td className="member-notes"> Notes</td>
            <td className="member-remove">&nbsp;</td>
          </tr>
        </thead>

        <tbody>
          {members && members.length > 0 ? (
            <>
              {members.map((member) => (
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
