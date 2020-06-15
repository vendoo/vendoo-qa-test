// Libs
import React from "react";

const Search = ({ state }) => {
  const [searchState, setSearchState] = state;
  return (
    <div>
      <input
        type="text"
        placeholder="Search your inventory"
        value={searchState}
        onChange={(evt) => {
          setSearchState(evt.currentTarget.value);
        }}
      />
    </div>
  );
};

export default Search;
