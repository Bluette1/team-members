import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import changeFilter from '../actions/filter';

const StatusFilter = () => {
  const { filter: status } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  let statuses = ['Active', 'Closed'];
  if (status) {
    statuses = statuses.filter(
      (item) => item.toLowerCase() !== status.toLowerCase(),
    );
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(changeFilter(value));
  };

  return (
    <div
      className="col-md-3 status-select-div mb-5"
      data-testid="status-filter"
    >
      <label htmlFor="status-select">
        <select
          className="m-2"
          name="status"
          id="status-select"
          onChange={handleChange}
        >
          <option className="current-option" value={'' || status}>
            {status || 'Status'}
          </option>
          <option value="">All</option>
          {statuses.map((item) => (
            <option key={`status-${uuid()}`} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default StatusFilter;
