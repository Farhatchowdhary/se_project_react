// (schemas) Define the data structure and validation rules
import mongoose from 'mongoose';
import validator from 'validator';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // other fields like weather, imageUrl, owner,likes etc,
  weather: {
    type: String,
    required: true,
    enum: ['hot', 'warm', 'cold'],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    },

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,

  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model('Item', ItemSchema);
