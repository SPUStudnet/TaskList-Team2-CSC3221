// Get 3rd Party modules
const express = require("express");
// Get Custom built modules
const fm = require("./filemgr");

// Create the express http server
const app = express();

// Define some built-in middleware
app.use(express.static("./client"));
app.use(express.json());

// Define HTTP routes listenting for requests
app.get("/api", async (req,res) => {
try{
const data = await fm.ReadData();
if (data===-1) throw new Error("It's not working");
res.json(data);
}catch(error){
  res.status(500).json({ error: error.message });
}
});

app.post("/api", async (req, res) => {
	console.log("Request recieved!");
	try {
		console.log(req.body);
		let item = req.body;
		if (item.hasOwnProperty("mode")) {
			if (item.mode == "modify") {
				if (item.hasOwnProperty("index"), item.hasOwnProperty("data")) {
					console.log("Modifying item #" + item.index + " with data " + item.data);
					await fm.ModifyItem(item.index, item.data);
					res.json("Recieved");
				}
				else {
					console.log("User attempted to pass invalid data: " + item);
					res.status(403);
					return;
				}
			}
			else if (item.mode == "add") {
				if (item.hasOwnProperty("data")) {
					if (item.data != "") {
						console.log("Adding item " + item.data + " to the end of the list!");
						await fm.AddItem(0, item.data);
						res.json("Recieved");
					}
					else {
						console.log("User tried to pass blank string to POST data.");
					}
					
				}
				else {
					console.log("User attempted to send POST request without data.");
					res.status(403);
					return;
				}
			}
			else {
				console.log("Invalid POST mode type: " + req.mode);
				res.status(403);
			}
		}
		else {
			console.log("Post request made without mode: " + req.body);
			res.status(403);
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json("Post request error.")
	}
});

// page not found route
app.all("*", (req, res) => {
	res.status(404).send("<h1>Page Not Found...</h1>");
});

// Create a server
const appName = "Simple List";
const port = 5000;
app.listen(port, () => {
	console.log(`App ${appName} is running on port ${port}`);
});
