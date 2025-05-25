import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/postController";

const postRoutes = express.Router();

postRoutes.get("/posts", getAllPosts);
postRoutes.get("/posts/:id", getPostById);
postRoutes.post("/posts", createPost);
postRoutes.put("/posts/:id", updatePost);
postRoutes.delete("/posts/:id", deletePost);

export { postRoutes };
