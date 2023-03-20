import { MdSearch } from 'react-icons/md';
import React from 'react';

const SearchNotes = ({ handleSearchNote }) => {
    return (
        <div className="search__notes">
            <MdSearch className="search__icon" size="1.3em" />
            <input
                type="text"
                placeholder="Search..."
                onChange={(event) =>
                    handleSearchNote(event.target.value)
                } />
        </div>
    )
}

export default SearchNotes;
