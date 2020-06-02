import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3100/subscriptions";

export function getAllSubscriptions() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveSubscription(subscription) {
  let url = baseUrl;
  url = url + (subscription.MemberId ? "/update" : "/addNewSubscription");
  return fetch(url, {
    method: subscription.MemberId ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(subscription),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function addSubscription(movie, _id) {
  let movieData = { movie, _id };
  let url = baseUrl;
  url = url + "/addSubscription";
  return fetch(url, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieData),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteSubscription(id) {
  let url = baseUrl + "/delete/" + id;
  return fetch(url, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
