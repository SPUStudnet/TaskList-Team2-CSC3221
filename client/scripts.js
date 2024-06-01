/**
 * scripts.js
 * Frontend scripts for list project.
 * 
 * CSC 3221
 * 
 * Joyce Tang
 * Kyler Veenstra
 * Dorothy Prosser
 * 5/31/2024
 * 
 */

const http = new coreHTTP();

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input = document.querySelector("#listitem");
const addButton = document.querySelector(".add-btn");
const delButton = document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", addListItem);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */
/**
 * ShowList
 * Modified to allow raw text editing.
 */
function ShowList() {
	let output = "<ul>";
	for (const itm of theList) {
		// Add the class property and contentEditable so the item can be changed.
		output += `<li class="listItem", contentEditable="true">${itm}</li>`;
	}
	output += "</ul>";
	result.innerHTML = output;

	// Upon generating the entire list of items, a number of event listeners and functionalities need to be configured each item.
	let listItems = document.getElementsByClassName("listItem");

	for (let item of listItems) {
		// For each item in the list,
		// When a key is pressed.
		item.onkeydown = function (event) {
			if (event.key == "Enter") {
				event.preventDefault();
				item.blur();
				// If it's the enter key, instead of adding a <div>, prevent the default behavior and unfocus the item.
			}
			if (
				event.key == "\\" ||
				event.key == "^" ||
				event.key == "(" ||
				event.key == ")"
			) {
				// If the user tries to enter something weird, stop them from doing so. (All input validation needs to be done on the backend, this was for experimentation purposes.)
				console.log(
					"This is a task editor, not a place to input escape sequences."
				);
				event.preventDefault();
			}
		};

		// For each item, when blurred (Unfocused)
		item.addEventListener("blur", function () {
			// Call a post request with the new data, and an index to modify for the backend.
			httpPost({
				mode: "modify",
				data: item.textContent,
				index: Array.prototype.indexOf.call(listItems, item),
			});
		});
	}
}

/**
 * GetList
 * Sends a GET request to the backedn and updates the list.
 */
async function GetList() {
	showLoading();
	try {
		const response = await fetch("/api");
		if (!response.ok) {
			throw new Error("HTTP Error: " + response.status);
		}
		theList = await response.json();
		ShowList();
	} catch (error) {
		result.innerHTML = error.message;
	}
}

async function WriteList() {
	return http
		.post(URL, theList)
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.error(`Error ${error}`);
		});
}

/**
 * Http Delete
 * Send a delete request using the COREHttp library.
 * @param {} e The event parameter.
 * Removes the reload functionality on page submit.
 */
async function httpDelete(e) {
	showLoading();
	try {
		e.preventDefault();
		const response = await http.delete("/api");
		input.value = "";
		GetList();
	} catch (error) {
		console.log("Error when trying to delete!" + error + " Passed: " + e);
	}
}

/**
 * Http POST
 * Sends new items or updates to the list to the backedn using COREHTTP
 * @param {} e The data to send in the POST request.
 */
async function httpPost(e) {
	showLoading();
	try {
		const response = await http.post("/api", e);
		GetList();
	} catch (error) {
		console.log(error);
		alert("An unrecoverable error was encountered: " + error);
		GetList();
	}
}

/**
 * addListItem
 * Add an item to the list using a POST request.
 * Prevents default form submission behavior of reloading the page.
 * @param {*} e 
 */
async function addListItem(e) {
	// Ask professor if this line is ok, as it overrides formal logic for form submissions to POST.
	e.preventDefault();

	await httpPost({mode: "add", data: input.value});
	input.value = "";
}

// Loading functions
function showLoading() {
	result.innerHTML = "Loading...";
}

async function main() {
	addButton.disabled = true;
	delButton.disabled = true;
	showLoading();

	await GetList();

	addButton.disabled = false;
	delButton.disabled = false;
}

main();
