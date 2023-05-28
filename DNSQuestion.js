class DNSQuestion {
  constructor(name, type, class_) {
    this.name = name;
    this.type = type;
    this.class_ = class_;
  }
}

module.exports = DNSQuestion;
