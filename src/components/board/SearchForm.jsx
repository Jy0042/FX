import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchForm = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="container">
      <div className="input-group d-flex justify-content-center">
        <input
          id="searchInput"
          type="text"
          placeholder="Search posts..."
          className="col-8 w-full rounded"
        />
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <button id="filterButton" className="rounded">
          Filter
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
