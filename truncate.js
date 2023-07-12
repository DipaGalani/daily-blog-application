const truncate = (str) => {
  return str.length > 100 ? str.slice(0, 99) + "…" : str;
};

module.exports = truncate;
