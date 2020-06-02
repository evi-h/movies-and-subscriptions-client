import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3100/members";

export function getAllMembers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveMember(member) {
  let url = baseUrl;
  url = url + (member._id ? "/update" : "/addNewMember");

  return fetch(url, {
    method: member._id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(member),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteMember(id) {
  let url = baseUrl + "/delete/" + id;
  return fetch(url, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
