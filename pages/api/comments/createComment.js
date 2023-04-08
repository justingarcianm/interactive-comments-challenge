import prisma from "@/prisma/client";

export default async function handler(req, res) {
  const comment = JSON.parse(req.body);
  console.log(comment);
  if (req.method === "POST") {
    // Check for Content
    if (!comment.content.length) {
      return res.status(500).json({ message: "Please add content before creating a comment" });
    }
    try {
      const data = await prisma.comment.create({
        data: {
          authorId: comment.authorId,
          content: comment.content,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: "Error creating new comment" });
    }
  }
}
