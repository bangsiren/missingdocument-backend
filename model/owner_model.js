const mongoose = require('../db');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const schema = new mongoose.Schema({
  name: {
    desc: "The owner's name",
    type: String
  },
  type: {
    desc: "The Documents's type",
    type: String,
    trim: true,
    required: true
  },
  location: {
    desc: "Owners Location.",
    trim: true,
    type: String,
    required: true,
    maxlength: 250
  },
  email: {
    desc: "The owner's email.",
    trim: true,
    type: String,
    required: true
  },


  dateTime: {
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
  fields: ['name', 'location', 'type', 'email']
})
module.exports = mongoose.model("Owners", schema);