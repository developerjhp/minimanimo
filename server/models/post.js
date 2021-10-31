import mongoose from 'mongoose';
import moment from 'moment';
import 'moment-timezone';

moment.tz.setDefault('Asia/Seoul');

const postSchema = mongoose.Schema(
  {
    user: {
      // 어느 유저의 글인지 연결
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      type: String,
      default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
    },
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
