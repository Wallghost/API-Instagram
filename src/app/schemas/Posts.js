import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    image: String,
    description: String,
    likes: {
      type: Number,
      default: 0,
    },
    comentaries: [
      { content: String, }
    ]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Posts', postSchema);
