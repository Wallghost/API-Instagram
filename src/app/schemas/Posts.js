import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    image: String,
    description: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Posts', postSchema);
