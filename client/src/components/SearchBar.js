import { useEffect, useState, useCallback } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Wrapper } from "../assets/wrappers/SearchBar.js";
import Button from "./Button.js";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext.js";
import debounce from 'lodash.debounce';
import { toLowerCaseAndCompare } from "../utils/Helpers.js";
import Loading from "./Loading.js";

const SearchBar = ({visible, setShowSearchPanel}) => {
  const {  getAPISuggestions, handleSearchResults } = useAppContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false)

  const getSuggestions = async (word) => {
    if (word) {
        setLoading(true);
        let response = await getAPISuggestions(word);
        setOptions(response);
        setLoading(false);
    } else {
        setOptions([]);
    }
};
//https://dev.to/danilo95/react-autocomplete-search-input-debounce-2mof
const debouncedSave = useCallback(
  debounce((newValue) => getSuggestions(newValue), 700),
  []
);

const updateValue = (newValue) => {
  setSearch(newValue);
  debouncedSave(newValue);
  setIsVisible(true)
};
  const handleSelect = (id) => {
    handleSearchResults(id)
    setSearch("");
    setOptions([]);
    if (visible) {setShowSearchPanel(false)}
    navigate("/reports");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch("");
    setOptions([]);
    handleSearchResults(search)
    if (visible) {setShowSearchPanel(false)}
    navigate("/reports");
  };
  return (
    //https://stackoverflow.com/questions/44142273/react-ul-with-onblur-event-is-preventing-onclick-from-firing-on-li
    <Wrapper className={visible && "active"} onBlur={() => setIsVisible(false)} tabIndex='0'> 
      <form className="search-form flex align-center"
          onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search Transactions..."
          className="search-input"
          value={search}
          onChange={(e) => updateValue(e.target.value)}
        />
        <Button
          classList="search-btn"
          type="button"
          icon={<FaSearch />}
          ariaLabel="Search"
        />
        {search !== "" && (
          <span className="clear-search-icon grid grid-center" onClick={(e) => setSearch("")}>
            <FaTimes />
          </span>
        )}
      </form>
      {loading && <ul className="search-autocomplete"><li><Loading /></li></ul>}
      {options?.length > 0 && isVisible && !loading && (
        <ul className="search-autocomplete">
          {options.map((item, ind) => {
            let result = ""
            for (const prop in item) {
              if (toLowerCaseAndCompare(item[prop], search)) result = item[prop]
            }
            return (
              <li
                key={ind}
                onMouseDown={() => handleSelect(result)}
              >
                {result}
              </li>
            );
          })}
        </ul>
      )}
    </Wrapper>
  );
};

export default SearchBar;
