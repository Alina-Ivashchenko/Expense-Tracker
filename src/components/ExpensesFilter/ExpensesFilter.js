import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {

  const filterChangeHandler = (event) => {
    props.onFilterChange(event.target.value);
  }

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select value={props.selected} onChange={filterChangeHandler}>
          { (props.years || ['2025','2024','2023','2022']).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
