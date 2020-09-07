const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new net.Socket();
const connectClient = () => {
  client.connect(7474, "127.0.0.1", () => {
    console.log("Connected to server!\n");
    rl.addListener("line", (line) => {
      client.write(line);
    });
  });
};

client.on("data", (data) => {
  payload = JSON.parse(data);
  console.log(`${payload.name}: ${payload.message}`);
});

client.on("error", async () => {
  console.log("Lost connection, trying to reconnect...");
  setTimeout(connectClient, 3000);
});

connectClient();
