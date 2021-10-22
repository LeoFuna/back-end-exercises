

const errors = (err, _req, res) => {
  return res.status(400).json({ message: err.details[0].message });
};

module.exports = { errors }