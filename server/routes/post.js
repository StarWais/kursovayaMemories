import express from 'express';
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
  addComment,
  removeComment,
  deletePosts,
  getMaxLikes,
} from '../controllers/posts.js';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/', verifyToken, getPosts);
router.get('/getMaxLikes', verifyToken, getMaxLikes);
router.post('/create', verifyToken, createPost);
router.post('/delete', verifyToken, deletePost);
router.post('/like', verifyToken, likePost);
router.post('/addComment', verifyToken, addComment);
router.post('/deletePosts', verifyToken, deletePosts);
router.post('/removeComment', verifyToken, removeComment);

export default router;
