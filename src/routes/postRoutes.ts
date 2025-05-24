import express from "express";
import { getAllPosts } from "../controllers/postController";

const postRoutes = express.Router();

postRoutes.get("/posts", getAllPosts);

export { postRoutes };
