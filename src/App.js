import './App.css';
import { getPeople, getCharacter, searchCharacter } from './api/people';
import { useState, useEffect, useRef } from 'react';

function App() {
  // Defining state variables for input search and its text
  const inputSearch = useRef(null);
  const [textSearch, setTextSearch] = useState("");

  // Defining state variables for characters, current character and its details, and current page
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharater] = useState(1);
  const [details, setDetails] = useState({});
  const [page, setPage] = useState(1);

  // Defining state variable for error state
  const [errorState, setErrorState] = useState({ hasError: false });

  // Use effect for loading people according to the current page
  useEffect(() => {
    getPeople(page).then(setPeople).catch(handleError);
  }, [page]);

  // Use effect for loading character details according to the current character
  useEffect(() => {
    getCharacter(currentCharacter).then(setDetails).catch(handleError);
  }, [currentCharacter]);

  // Function for handling errors
  const handleError = (err) => {
    setErrorState({ hasError: true, message: err.message });
  };

  // Function for showing character details
  const showDetails = (character) => {
    const id = Number(character.url.split('/').slice(-2)[0]);
    setCurrentCharater(id);
  };

  // Function for handling changes in the search input field
  const onChangeTextSearch = (event) => {
    event.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
  };

  // Function for handling search submission
  const onSearchSubmit = (event) => {
    if (event.key !== 'Enter') return;
    //inputSearch.current.value = '';
    setDetails({});
    searchCharacter(textSearch).then(setPeople).catch(handleError);
  };

  // Function for changing the current page
  const onChangePage = (next) => {
    if (!people.previous && next < 0) return;
    if (!people.next && next > 0) return;
    setPage(page + next);
  };

  return (
    <div>
      <input
        ref={inputSearch}
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
        type="text"
        placeholder="Search a character"
      />
      <ul>
        {errorState.hasError && <div>{errorState.message}</div>}
        {people?.results?.map((character) => (
          <li key={character.name} onClick={() => showDetails(character)}>
            {character.name}
          </li>
        ))}
      </ul>

      <section>
        <button onClick={() => onChangePage(-1)}>Prev</button>| {page} |
        <button onClick={() => onChangePage(1)}>Next</button>
      </section>

      {details && (
        <aside>
          <h1>{details.name}</h1>
          <ul>
            <li>height: {details.height}</li>
            <li>mass: {details.mass}</li>
            <li>Year of Birth: {details.birth_year}</li>
          </ul>
        </aside>
      )}
    </div>
  );
}

export default App;
