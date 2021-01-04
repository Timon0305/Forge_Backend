const mongoose = require('mongoose');

const CpuSchema = new mongoose.Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  coreCount: {
    type: String
  },
  coreClock: {
    type: String,
  },
  boostClock: {
    type: String,
  },
  tdp: {
    type: String,
  },
  graphics: {
    type: String
  },
  smt: {
    type: String
  },
  price: {
    type: String
  }
});



module.exports = mongoose.model('Cpu', CpuSchema);
