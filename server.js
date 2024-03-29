const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  path = require("path"),
  api = require("./server/routes/api"),
  mongoose = require("mongoose"),
  Plants = require("./server/model/Plants"),
  Users = require("./server/model/Users"),
  MyPlants = require("./server/model/myPlants"),
  moment = require("moment"),
  server = require("http").createServer(app),
  request = require("request"),
  socketManager = require("./server/SocketManager"),
  socket = require("socket.io");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/sensor_plant",
  { useNewUrlParser: true, useFindAndModify: false }
)

// app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});
app.use("/", api);

//for production only
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// })

// let users = require("./users.json");
// for (let u of users) {
//   let u1 = new Users(u);
//   console.log(u);
//   u1.save();
// }

// let data = require("./data.json");
// for (let d of data) {
//   let t1 = new Plants(d);
//   console.log(d);
//   t1.save();
// }

const io = socket(server);
socketManager.load(io);


const PORT = 2805;
app.listen(process.env.PORT || PORT, function() {
  console.log(`server running on ${PORT}`);
});
