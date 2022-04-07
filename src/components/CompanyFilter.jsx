import downArrow from '../public/images/down-arrow-svgrepo-com.svg';

const CompanyFilter = () => {
  const handleClick = () => {
    document.getElementById('customDropdown').classList.toggle('show');
  };

  return (
    <div className="dropdown">
      <button type="button" onClick={handleClick} className="dropbtn">
        Company
        <img src={downArrow} alt="down arrow" className="down-arrow" />
      </button>
      <div id="customDropdown" className="dropdown-content">
        <input type="checkbox" name="" id="" /> Select All <br />
        <input type="checkbox" name="" id="" /> DC United <br />
        <input type="checkbox" name="" id="" /> Manchester United
        <br />
        <input type="checkbox" name="" id="" /> LA Galaxy
        <br />
      </div>
    </div>
  );
};

export default CompanyFilter;
