import { handledError, throwSpecificError } from "./errorHandler";

// Function to get a page of Star Wars characters
export async function getPeople(page = 1) {
  try {
    const response = await fetch(`http://swapi.dev/api/people/?page=${page}`);
    
    if(!response.ok) {
      return handledError(response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throwSpecificError(error);
  }
}

// Function to get a specific Star Wars character by ID
export async function getCharacter(id = 1) {
  try {
    const response = await fetch(`http://swapi.dev/api/people/${id}/`);

    if (!response.ok) {
      return handledError(response.status);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throwSpecificError(err);
  }
}

// Function to search for Star Wars characters by name
export async function searchCharacter(name) {
  try {
    const response = await fetch(`http://swapi.dev/api/people/?search=${name}`);

    if (!response.ok) {
      return handledError(response.status);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throwSpecificError(err);
  }
}
