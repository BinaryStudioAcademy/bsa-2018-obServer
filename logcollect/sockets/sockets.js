const ioClient = require("socket.io-client");
const secretToken = process.env.LOGCOLLECT_SECRET_TOKEN;
const eventEmitter = require("../events");

module.exports = (io, port) => {
  const logviewSocket = ioClient.connect("http://localhost:3060");

  io.set("origins", `http://localhost:${port}`);
  io.origins("*:*");

  logviewSocket.emit("logcollect get settings", secretToken);

  logviewSocket.on("logview post settings", settings => {
    eventEmitter.emit("get new settings", settings);
  });
};
