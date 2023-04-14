import prisma from "@/prisma/client";

export default async function handler(req, res) {
  console.log(req.body);
  const comment = req.body;
  const id = Number(req.query.id);

  if (req.method === "DELETE") {
    try {
      const data = await prisma.comment.delete({ where: { id } });
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: "Error deleting comment" });
    }
  }
  if (req.method === "PATCH") {
    if (comment.currentUserId !== comment.authorID) {
      return res.status(500).json({ message: "You are not allowed to updated other users comments." });
    }

    function determineUpdate(comment) {
      if (comment.score) {
        return {
          score: Number(comment.score),
        };
      }
      if (comment.content && comment.date) {
        return {
          content: comment.content,
          createdAt: comment.date,
        };
      }
    }

    const determinedData = determineUpdate(comment);

    try {
      const data = await prisma.comment.update({
        where: { id },
        data: determinedData,
      });
      res.status(200).json(data);
    } catch (err) {
      // return res.status(500).json({ message: "Error updating comment" });
      return res.status(500).json({ message: comment });
    }
  }
}
