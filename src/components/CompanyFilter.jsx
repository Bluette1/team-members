import downArrow from '../public/images/down-arrow-svgrepo-com.svg';

const CompanyFilter = () => {
  const handleClick = () => {
    document.getElementById('customDropdown').classList.toggle('show');
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
        Company
        <img src={downArrow} alt="down arrow" className="down-arrow" />
      </button>
      <div id="customDropdown" className="dropdown-content">
        <input className="checkbox" type="checkbox" name="" id="" /> Select All{' '}
        <br />
        <input className="checkbox" type="checkbox" name="" id="" /> DC United{' '}
        <br />
        <input className="checkbox" type="checkbox" name="" id="" /> Manchester
        United
        <br />
        <input className="checkbox" type="checkbox" name="" id="" /> LA Galaxy
        <br />
      </div>
    </div>
  );
};

export default CompanyFilter;
