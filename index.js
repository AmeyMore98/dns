const { buildQuery, headerToBytes } = require("./utils");
const dgram = require("dgram");

const query = buildQuery("www.example.com", 1);
console.log("query", query);

// Create a UDP socket
const sock = dgram.createSocket("udp4");

// Send our query to 8.8.8.8, port 53. Port 53 is the DNS port.
sock.send(query, 0, query.length, 53, "8.8.8.8", (err) => {
  if (err) {
    console.error("Error sending query:", err);
    sock.close();
  }
  console.log("Query sent");
});

// Read the response. UDP DNS responses are usually less than 512 bytes,
// so reading 1024 bytes is enough.
sock.on("message", (response, rinfo) => {
  console.log("Response:", response.toString("hex"));
  sock.close();
});

// Handle errors
sock.on("error", (err) => {
  console.error("Socket error:", err);
  sock.close();
});
