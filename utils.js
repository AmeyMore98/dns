const DNSHeader = require("./DNSHeader");
const DNSQuestion = require("./DNSQuestion");
const struct = require("./struct");

function headerToBytes(header) {
  return struct(">HHHHHH").pack(...header.getValues());
}

function questionToBytes(question) {
  return question.name + struct(">HH").pack(question.type, question.class_);
}

function encodeDnsName(domainName) {
  let encoded = "";
  for (const part of domainName.split(".")) {
    encoded += String.fromCharCode(part.length) + part;
  }
  return encoded + String.fromCharCode(0);
}

const TYPE_A = 1;
const CLASS_IN = 1;

function buildQuery(domainName, recordType) {
  const name = encodeDnsName(domainName);

  // Random number between 0 and 65535
  const id = Math.floor(Math.random() * 65536);
  RECURSION_DESIRED = 1 << 8;

  const header = new DNSHeader(id, RECURSION_DESIRED, 1);
  const question = new DNSQuestion(name, recordType, CLASS_IN);

  return headerToBytes(header) + questionToBytes(question);
}

module.exports = {
  headerToBytes,
  questionToBytes,
  encodeDnsName,
  buildQuery,
};
