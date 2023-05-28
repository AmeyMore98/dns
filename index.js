const { buildQuery, headerToBytes } = require("./utils");
const dgram = require("dgram");

const query = buildQuery("www.example.com", 1);

const socket = dgram.createSocket("udp4");

// socket.bind(53);

socket.send(query, 53, "8.8.8.8", (err) => {
  if (err) console.error(err);
  else console.log("Message sent");
});

socket.on("message", (msg, rinfo) => {
  console.log(`Received message: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
