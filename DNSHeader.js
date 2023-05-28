class DNSHeader {
  constructor(
    id,
    flags,
    num_Questions,
    numAnswers,
    numAuthorities,
    numAdditionals
  ) {
    this.id = id;
    this.flags = flags;
    this.num_Questions = num_Questions;
    this.numAnswers = numAnswers;
    this.numAuthorities = numAuthorities;
    this.numAdditionals = numAdditionals;
  }

  getValues() {
    return [
      this.id,
      this.flags,
      this.num_Questions,
      this.numAnswers,
      this.numAuthorities,
      this.numAdditionals,
    ];
  }
}

module.exports = DNSHeader;
