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
    <div className="container row d-flex">
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th className="member-name">Name</th>
            <th className="member-company">Company</th>
            <th className="member-status"> Status</th>
            <th className="member-last-updated">Last Updated</th>
            <th className="member-notes"> Notes</th>
            <th className="member-remove">&nbsp;</th>
          </tr>
        </thead>

        <tbody>
          {members && members.length > 0 ? (
            <div className="row d-flex">
              {' '}
              {members.map((member) => (
                <Member key={`member-${uuid()}`} member={member} />
              ))}
            </div>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
