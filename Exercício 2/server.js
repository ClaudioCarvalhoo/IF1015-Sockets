const net = require("net");

let connectedSockets = [];

const sendMessage = (socket, name, message) => {
  socket.write(Buffer.from(JSON.stringify({ name: name, message: message })));
};

const handleConnection = (socket) => {
  connectedSockets.push(socket);
  let name = "";
  sendMessage(
    socket,
    "SERVER",
    "Hello, welcome to the SERVER.\nWhat is your name?"
  );
  socket.on("close", () => {
    connectedSockets = connectedSockets.filter(
      (otherSocket) => otherSocket !== socket
    );
  });
  socket.on("data", (data) => {
    if (name.length === 0) {
      if (data.toString().length !== 0) {
        name = data.toString();
        sendMessage(socket, "SERVER", `Ok, your name is ${data.toString()}.`);
      } else {
        sendMessage(socket, "SERVER", "Your name cannot be empty, dummy.");
      }
    } else {
      for (otherSocket of connectedSockets) {
        if (otherSocket !== socket) {
          sendMessage(otherSocket, name, data.toString());
        }
      }
    }
  });
};

const server = net.createServer(handleConnection);
server.listen(7474, "127.0.0.1");
