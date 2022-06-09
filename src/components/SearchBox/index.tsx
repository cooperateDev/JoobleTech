import React from "react";
import { useAppSelector } from "../../store/hooks";

import "./style.css";

interface Props {
  value: string;
  error: string;
  onChange: (cityName: string) => void;
  handleClickSearch: () => void;
}

const SearchBox: React.FC<Props> = ({
  value,
  error,
  onChange,
  handleClickSearch,
}) => {
  const requestError = useAppSelector((state) => state.weather.error);

  return (
    <>
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Search city"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />

        <button className="search-button" onClick={handleClickSearch}>
          Search
        </button>
      </div>

      {error && <p className="search-error">{error}</p>}

      {requestError && <p className="search-error">{requestError}</p>}
    </>
  );
};

export default SearchBox;
