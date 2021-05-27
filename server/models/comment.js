import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userID: String,
  commentText: String,
  userName: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
