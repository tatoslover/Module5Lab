const express = require("express"); // import the express package
const cors = require("cors");
const friendRoutes = require('./routes/friendRoutes');

const app = express(); // create a new app
const port = 3006; // change this to run the app on a different port - usually a 4 digit number

// parse requests of content-type - application/json (needed for POST and PUT requests using req.body)
app.use(cors());
app.use(express.json());

app.use('/', express.static('public'))
app.use('/friends', friendRoutes);

// starts the backend app on the given port
app.listen(port, () => {
  console.log(`🚀 Exercise 4 - Friends API listening at http://localhost:${port}`);
  console.log(`📝 Try: http://localhost:${port}/friends`);
  console.log(`🔍 Filter: http://localhost:${port}/friends/filter?gender=male&letter=R`);
});
