module.exports = function (app) {
  var server = require("http").Server(app);
  var io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
    },
  });

  server.listen(3000);
  // eslint-disable-next-line no-console
  console.log("Websocket server on http://localhost:3000");

  io.on("connection", function (socket) {
    socket.on("messaging", function (data) {
      io.sockets.emit("messaging", data);
    });
  });
};
