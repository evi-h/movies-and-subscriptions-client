import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3100/movies";

export function getAllMovies() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
