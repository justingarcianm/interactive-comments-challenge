import prisma from "@/prisma/client";

export default async function handler(req, res) {
  const comment = JSON.parse(req.body);
  console.log(comment);
  if (req.method === "DELETE") {
    // Check if author
    if (comment.authorId !== comment.currentUserID) {
      return res.status(500).json({ message: "You are not authorized to delete other users comments" });
    }
    try {
      const data = await prisma.comment.delete({ where: { id: comment.id } });
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: "Error deleting comment" });
    }
  }
}
