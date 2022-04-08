import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { Navigate } from 'react-router-dom';
import Member from '../components/MemberItem';
import StatusSort from '../components/StatusSort';
import registerMembers from '../actions/member';
import CompanyFilter from '../components/CompanyFilter';
import MemberService from '../services/member.service';

const Home = () => {
  const [errDisplay, setErrDisplay] = useState('');
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  const members = useSelector((state) => state.member);

  const { sortorder: status } = useSelector((state) => state.sortorder);
  const company = useSelector((state) => state.filter);
  let filteredMembers = members;

  filteredMembers = filteredMembers.filter((member) =>
    company.includes(member.company),
  );
  const sortedMembers = JSON.parse(JSON.stringify(filteredMembers));

  if (status !== '') {
    if (status === 'ASC') {
      sortedMembers.sort((a, b) => a.status.localeCompare(b.status));
    } else {
      sortedMembers.sort((a, b) => a.status.localeCompare(b.status)).reverse();
    }
  }

  useEffect(() => {
    if (members.length === 0) {
      try {
        MemberService.getMembersByUser(currentUser.id)
          .then((response) => {
            dispatch(registerMembers(response.data));
          })
          .catch((error) => {
            const errorContent =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            setErrDisplay(JSON.stringify(errorContent));
          });
      } catch (error) {
        const errorContent =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setErrDisplay(JSON.stringify(errorContent));
      }
    }
  }, [members]);

  if (errDisplay !== '') {
    console.log(errDisplay);
    return null;
  }

  return (
    <div>
      <div className="d-flex">
        <CompanyFilter />
        <StatusSort />
      </div>
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
              {sortedMembers.map((member, idx) => (
                <Member
                  key={`member-${uuid()}`}
                  item={member}
                  highlight={idx % 2 === 0}
                />
              ))}
            </>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
