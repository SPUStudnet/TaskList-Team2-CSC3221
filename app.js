/**
 * app.js
 * Backend for list project.
 * 
 * CSC 3221
 * 
 * Joyce Tang
 * Kyler Veenstra
 * Dorothy Prosser
 * 5/31/2024
 * 
 */

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
app.get("/api", async (req, res) => {
	try {
		const data = await fm.ReadData();
		if (data === -1) throw new Error("It's not working");
		res.json(data);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});

/**
 * Post request handler.
 * Gets a post request with three properties: mode, data, index (optional).
 * Calls the filemanager to write the data to the list.
 * Has multiple error messages in case the POST request is malformed.
 */
app.post("/api", async (req, res) => {
	// Log the recieved request to the console.
	console.log("POST request recieved!");
	try {
		console.log(req.body);
		let item = req.body;

		// The request should have one of two things as its mode: modify, or add.
		// Modify should mutilate the list. Add should add an item.
		if (item.hasOwnProperty("mode")) {
			if (item.mode == "modify") {
				if (
					(item.hasOwnProperty("index"), item.hasOwnProperty("data"))
				) {
					// Log the modification.
					console.log(
						"Modifying item #" +
							item.index +
							" with data " +
							item.data
					);
					await fm.ModifyItem(item.index, item.data);
					res.json("Recieved");
				} else {
					console.log("User attempted to pass invalid data: " + item);
					res.status(403);
					return;
				}
			} else if (item.mode == "add") {
				if (item.hasOwnProperty("data")) {
					// Add an item to the list.
					if (item.data != "") {
						console.log(
							"Adding item " +
								item.data +
								" to the end of the list!"
						);
						await fm.AddItem(0, item.data);
						res.json("Recieved");
					} else {
						console.log(
							"User tried to pass blank string to POST data."
						);
					}
				} else {
					console.log(
						"User attempted to send POST request without data."
					);
					res.status(403);
					return;
				}
			} else {
				console.log("Invalid POST mode type: " + req.mode);
				res.status(403);
			}
		} else {
			console.log("Post request made without mode: " + req.body);
			res.status(403);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json("Post request error.");
	}
});

/**
 * Delete
 * Recieves a blank delete request, and deletes the first item from the database.
 */
app.delete("/api", async (req, res) => {
	try {
		let item = req.body;
		console.log("Deleting item.");

		const data = await fm.DeleteItem();
		if (data === -1) {
			throw new Error("Item not found");
		}
		res.json(data);
		return;
	} catch {
		res.status(500).json(error.message);
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
