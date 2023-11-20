import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
