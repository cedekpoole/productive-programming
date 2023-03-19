import { MdSearch } from 'react-icons/md';
import React from 'react';

const SearchNotes = () => {
    return (
        <div className="search__notes">
            <MdSearch className="search__icon" size="1.3em" />
            <input type="text" placeholder="Search..." />
        </div>
    )
}

export default SearchNotes;
    