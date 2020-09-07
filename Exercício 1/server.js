const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const handleConnection = (socket) => {
  rl.addListener("line", (line) => {
    socket.write(line);
  });

  socket.on("data", (data) => {
    console.log(`Client said: ${data.toString()}`);
  });
};

const server = net.createServer(handleConnection);
server.listen(7474, "127.0.0.1");
