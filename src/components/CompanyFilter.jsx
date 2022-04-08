import React, { useState, useEffect } from 'react';

import downArrow from '../public/images/down-arrow-svgrepo-com.svg';

const CompanyFilter = () => {
  const [selected, setSelected] = useState([]);
  const handleClick = () => {
    document.getElementById('customDropdown').classList.toggle('show');
  };

  useEffect(() => {
    console.log('Selected: ', selected);
  }, [selected]);

  const handleSelect = (e) => {
    const {
      target: { value },
    } = e;

    if (selected.includes(value)) {
      setSelected((state) => {
        let updatedSelected = state.slice();
        updatedSelected = updatedSelected.filter((val) => val !== value);
        return updatedSelected;
      });
    } else {
      setSelected((state) => {
        const updatedSelected = state.slice();
        updatedSelected.push(value);
        return updatedSelected;
      });
    }
  };

  window.onclick = function (event) {
    if (
      !event.target.matches('.dropbtn') &&
      !event.target.matches('.dropdown-content.show') &&
      !event.target.matches('.checkbox-li') &&
      !event.target.matches('.checkbox')
    ) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      let i;
      for (i = 0; i < dropdowns.length; i += 1) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };

  return (
    <div className="dropdown">
      <button type="button" onClick={handleClick} className="dropbtn">
        Company
        <img src={downArrow} alt="down arrow" className="down-arrow" />
      </button>
      <div
        id="customDropdown"
        className="dropdown-content"
        onChange={handleSelect}
      >
        <input className="checkbox" type="checkbox" value="All" /> Select All
        <br />
        {/* eslint-disable*/}
        <input className="checkbox" type="checkbox" value="LA Galaxy" />LA Galaxy<br />
        <input className="checkbox" type="checkbox" value="Manchester United" />Manchester United<br />
        <input className="checkbox" type="checkbox" value="DC United" /> DC
        United
        <br />
        <input className="checkbox" type="checkbox" value="Liverpool" />
        Liverpool
        <br />
        <input className="checkbox" type="checkbox" value="Bayern Munich" />
        Bayern Munich
        <br />
      </div>
    </div>
  );
};

export default CompanyFilter;
