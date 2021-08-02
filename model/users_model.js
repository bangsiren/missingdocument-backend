const mongoose = require('../db');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const schema = new mongoose.Schema({
  files: [
    mongoose.Schema({
      path: String,
      name: String
    })
  ],
  number: {
    desc: "The users's number.",
    type: String,
  },
  f_number: {
    desc: "The users's f_number.",
    type: String,
  },
  name: {
    desc: "The users's name.",
    type: String,
  },
  f_name: {
    desc: "The users's f_name.",
    type: String,
  },
  type: {
    desc: "The Documents's type",
    type: String,
    trim: true,
    required: true,
  },
  name: {
    desc: "The user name.",
    trim: true,
    type: String,
    required: true,
  },
  f_email: {
    desc: "The user email.",
    trim: true,
    type: String,
    required: true,
  },

  address: {
    desc: "users l_location.",
    trim: true,
    type: String,
    required: true,
    maxlength: 250
  },

  dateTime: {
    type: Date
  },

  claimAt: {
    type: Date
  },
  createdTime: {
    type: String
  },
  updatedTime: {
    type: String
  },
  isActive: {
    desc: "is Active.",
    type: Boolean,
    default: false,
    required: true,
  },

},
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
)
schema.plugin(mongoose_fuzzy_searching, {
  fields: ['name', 'f_name', 'address', 'f_number', 'number', 'email']
})
module.exports = mongoose.model("Users", schema);