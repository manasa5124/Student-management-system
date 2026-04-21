const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative'],
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Student', StudentSchema);