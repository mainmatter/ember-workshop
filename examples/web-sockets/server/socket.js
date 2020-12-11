module.exports = function (app) {
  const io = app.get("io");
  io.on("connection", function (socket) {
    socket.on("messaging", function (data) {
      io.sockets.emit("messaging", data);
    });
  });
};
