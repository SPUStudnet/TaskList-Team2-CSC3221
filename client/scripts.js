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
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

async function GetList() {
<<<<<<< Updated upstream

}
=======
  showLoading();
  try{
    console.log(http.get("/api"))
      const response = await http.get("/api");
      if (response.ok){
  throw new Error("HTTP Error: " + response.status);
      }
      theList = response;
      ShowList();
  }catch(error){
      result.innerHTML = error.message;
  }
  }
>>>>>>> Stashed changes

async function WriteList() {

}

/* Listener Functions */
async function httpPost(e) {

  
}

function httpDelete(e) {


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