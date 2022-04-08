import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import changeFilter from '../actions/filter';
import downArrow from '../public/images/down-arrow-svgrepo-com.svg';

const CompanyFilter = () => {
  const initial = useSelector((state) => state.filter);
  const [selected, setSelected] = useState(initial);
  const [companies, setCompanies] = useState(0);
  const [all, setAll] = useState(true);
  const dispatch = useDispatch();

  const handleClick = () => {
    document.getElementById('customDropdown').classList.toggle('show');
  };

  useEffect(() => {
    setCompanies(selected.length);
    const checkboxes = document.getElementsByClassName('checkbox');
    if (selected.includes('All')) {
      const updatedSelected = [];
      for (let i = 0; i < checkboxes.length; i += 1) {
        checkboxes[i].checked = true;
        if (checkboxes[i].value !== 'All') {
          updatedSelected.push(checkboxes[i].value);
        }
      }
      setSelected(updatedSelected);
      setAll(true);
    }
    dispatch(changeFilter(selected));
  }, [selected]);

  const handleSelect = (e) => {
    const {
      target: { value },
    } = e;
    if (all) {
      setAll((state) => !state);
      if (value === 'All') {
        setSelected([]);
        const checkboxes = document.getElementsByClassName('checkbox');
        for (let i = 0; i < checkboxes.length; i += 1) {
          checkboxes[i].checked = false;
        }
      } else {
        const checkboxes = document.getElementsByClassName('checkbox');
        for (let i = 0; i < checkboxes.length; i += 1) {
          checkboxes[i].checked = false;
        }
        e.target.checked = true;
        setSelected([value]);
      }
      return;
    }

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
        Company{`(${companies})`}
        <img src={downArrow} alt="down arrow" className="down-arrow" />
      </button>
      <div
        id="customDropdown"
        className="dropdown-content"
        onChange={handleSelect}
      >
        {/* eslint-disable*/}
        <input className="checkbox" type="checkbox" value="All" /> Select All
        <br />
        <input className="checkbox" type="checkbox" value="LA Galaxy" />
        LA Galaxy
        <br />
        <input className="checkbox" type="checkbox" value="Manchester United" />
        Manchester United
        <br />
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
