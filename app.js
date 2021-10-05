const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const vote = require("./routes/vote");
const starter = require("./routes/starter");

// Create an App
const app = express();

// Serve the static files from public
app.use( express.static( path.join(__dirname, "public") ) );

// Include the body-parser middleware
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

// Enable CORS
app.use( cors() );


// app.use('/', (req, res, next) => {
//   req.url = "/pages/register"
//   next()
// })
app.use("/vote", vote);
app.use("/starter", starter);

// Set the port
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});

