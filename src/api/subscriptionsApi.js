import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3100/subscriptions";

export function getAllSubscriptions() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
