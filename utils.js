const { randomBytes } = require("crypto");
const DNSHeader = require("./DNSHeader");
const DNSQuestion = require("./DNSQuestion");
const struct = require("python-struct");

/**
 *
 * @param {DNSHeader} header
 * @returns
 */
function headerToBytes(header) {
  return struct.pack("!HHHHHH", ...header.getValues()).toString("binary");
}

function questionToBytes(question) {
  return (
    question.name +
    struct.pack("!HH", question.type, question.class_).toString("binary")
  );
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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function buildQuery(domainName, recordType) {
  const name = encodeDnsName(domainName);

  // For some reason a max of 65535 gives incorrect results, randomly
  const id = randomBytes(2).readUInt16BE();
  // const id = 14274;
  // const id = 0x1314;

  const RECURSION_DESIRED = 1 << 8;

  const header = new DNSHeader(id, RECURSION_DESIRED, 1);
  const question = new DNSQuestion(name, recordType, CLASS_IN);

  console.log("h", headerToBytes(header));

  return headerToBytes(header) + questionToBytes(question);
}

module.exports = {
  headerToBytes,
  questionToBytes,
  encodeDnsName,
  buildQuery,
};
