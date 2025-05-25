import { Request, Response } from "express";
import prisma from "../helpers/prisma";
import { postRequest } from "../helpers/request/postRequest";

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findFirstOrThrow({
      where: {
        id: Number.parseInt(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error,
    });
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const result = postRequest.safeParse(req.body);

    if (!result.success) {
      const errorMessage = result.error.issues.map(
        (e) => `${e.path} - ${e.message}`
      );

      res.status(400).json({
        success: false,
        message: errorMessage,
        data: null,
      });
      return;
    }

    const post = await prisma.post.create({
      data: {
        title: result.data.title,
        author_name: result.data.author_name,
        content: result.data.content,
        published: result.data.published,
      },
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = postRequest.safeParse(req.body);

    if (!result.success) {
      const errorMessage = result.error.issues.map(
        (e) => `${e.path} - ${e.message}`
      );

      res.status(400).json({
        success: false,
        message: errorMessage,
        data: null,
      });
      return;
    }

    const post = await prisma.post.update({
      where: {
        id: Number.parseInt(id),
      },
      data: {
        title: result.data.title,
        author_name: result.data.author_name,
        content: result.data.content,
        published: result.data.published,
      },
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });

    await prisma.post.delete({
      where: {
        id: Number.parseInt(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error,
    });
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
