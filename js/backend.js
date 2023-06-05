let url = "https://kbl98.pythonanywhere.com/";

async function getContacts() {
  token = sessionStorage.getItem("Token");
  allContactsAsText = await fetch(url + "contacts/", {
    headers: { Authorization: "Token " + token },
    mode: "cors",
  }).then((r) => r.json().then((data) => ({ status: r.status, body: data })));
  allContacts = allContactsAsText["body"] || [];
}

/**
 * function to load all tasks which are saved on the server
 */
async function loadTasks() {
  token = sessionStorage.getItem("Token");
  all_tasksAsText = await fetch(url + "tasks/", {
    headers: { Authorization: "Token " + token },
    mode: "cors",
  }).then((r) => r.json().then((data) => ({ status: r.status, body: data })));
  all_tasks = all_tasksAsText["body"] || [];
}

async function taskSave(task) {
  token = sessionStorage.getItem("Token");
  all_tasks.push(task);
  body = JSON.stringify(task);
  let response = await fetch(url + "tasks/", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    body: body,
    mode: "cors",
  });
}

// load and upload to backend
async function boardSaveToBackend(index) {
  token = sessionStorage.getItem("Token");
  let id = findId(index);
  body = JSON.stringify(loadedBoard[index]);
  let saveResponse = await fetch(url + "tasks/" + id + "/", {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    body: body,
    mode: "cors",
  });
}

async function loadAllTaskFromBackend() {
  token = sessionStorage.getItem("Token");
  all_tasksAsText = await fetch(url + "tasks/", {
    headers: { Authorization: "Token " + token },
    mode: "cors",
  }).then((r) => r.json().then((data) => ({ status: r.status, body: data })));
  loadedBoard = all_tasksAsText["body"];
  if (!loadedBoard) {
    loadedBoard = [];
  }
}

async function loadContactsFromBackend() {
  token = sessionStorage.getItem("Token");
  allContactsAsText = await fetch(url + "contacts/", {
    headers: { Authorization: "Token " + token },
    mode: "cors",
  }).then((r) => r.json().then((data) => ({ status: r.status, body: data })));
  loadedContacts = allContactsAsText["body"];
  if (!loadedContacts) {
    loadedContacts = [];
  }
}

/**
 * save contact and load to backend
 */
async function saveContactsToBackend(object) {
  token = sessionStorage.getItem("Token");
  let contactAsText = JSON.stringify(object);
  let response = await fetch(url + "contacts/", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    body: contactAsText,
    mode: "cors",
  });
}

async function editOneContact(id, token, body) {
  let response = await fetch(url + "contacts/" + id + "/", {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    body: body,
    mode: "cors",
  });
}

async function checkLoginBackend(email, password) {
  let body = JSON.stringify({
    email: email,
    password: password,
  });
  let response = await fetch(url + "login/", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: body,
    mode: "cors",
  });
  return response;
}

async function patchTask(id, body, token) {
  let saveResponse = await fetch(url + "tasks/" + id + "/", {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    body: body,
    mode: "cors",
  });
}

async function newTaskBackend(body, token) {
  let response = await fetch(url + "tasks/", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    body: body,
    mode: "cors",
  });
}

async function taskDelete(token, id) {
  let saveResponse = await fetch(url + "tasks/" + id + "/", {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    mode: "cors",
  });
}

async function registrateToBackend(password, email, username, color) {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    password: password,
    email: email,
    username: username,
    color: color,
  });
  try {
    let response = await fetch(url + "register/", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: body,
      mode: "cors",
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getAllTasksFromBackend() {
  token = sessionStorage.getItem("Token");
  await includeHTML();
  all_tasksAsText = await fetch(url + "tasks", {
    headers: { Authorization: "Token " + token },
    mode: "cors",
  }).then((r) => r.json().then((data) => ({ status: r.status, body: data })));
  all_tasks = all_tasksAsText["body"];
}
