import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  referenceUrl: {
    type: String,
    trim: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const Recipe = mongoose.model('Recipe', recipeSchema);