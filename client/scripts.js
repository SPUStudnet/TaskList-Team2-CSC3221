const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */
function ShowList() {
	let output = "<ul>";
	for (const itm of theList) {
		output += `<li class="listItem", contentEditable="true">${itm}</li>`;
	}
	output += "</ul>";
	result.innerHTML = output;

	let listItems = document.getElementsByClassName("listItem")
	
	for (let item of listItems) {
		item.onkeydown = function(event) {
			if (event.key == 'Enter') {
				event.preventDefault();
				item.blur();
			}
			if (event.key == '\\' || event.key == '^' || event.key == '(' || event.key == ')') {
				console.log("This is a task editor, not a place to input escape sequences.");
				event.preventDefault();
			}
		}
		item.addEventListener("blur", function() {
			httpPost({mode:"modify", data:item.textContent, index:Array.prototype.indexOf.call(listItems, item)});
			
		});
	}
}

async function GetList() {
  showLoading();
  try{
      const response = await fetch("/api");
      if (!response.ok){
  throw new Error("HTTP Error: " + response.status);
      }
      theList = await response.json();
      ShowList();
  }catch(error){
      result.innerHTML = error.message;
  }
}

async function WriteList() {
showLoading();
try{
    const response = await fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
     if (!response.ok) throw new Error("HTTP Error: " + response.status);
    await GetList();
  } catch (error) {
    result.innerHTML = error.message;
  }
}

async function httpPost(e) {
	showLoading();
	try {
		const response = await http.post("/api", e);
		GetList();
	}
	catch (error) {
		console.log(error);
		alert("An unrecoverable error was encountered: " + error);
		GetList();
	}
}

async function addListItem(e) {
	// Ask professor if this line is ok, as it overrides formal logic for form submissions to POST.
	e.preventDefault();
	
	await httpPost({mode:"add", data:input.value});
	input.value = "";
}


function httpDelete(e) {}

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