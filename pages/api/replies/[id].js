import prisma from "@/prisma/client";

export default async function handler(req, res) {
  console.log(req.body);
  const reply = req.body;
  const id = Number(req.query.id);

  if (req.method === "DELETE") {
    try {
      const data = await prisma.reply.delete({ where: { id } });
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: "Error deleting reply" });
    }
  }
  if (req.method === "PATCH") {
    if (reply.currentUserId !== reply.authorID) {
      return res.status(500).json({ message: "You are not allowed to updated other users replies." });
    }

    function determineUpdate(reply) {
      if (reply.score) {
        return {
          score: Number(reply.score),
        };
      }
      if (reply.content && reply.date) {
        return {
          content: reply.content,
          createdAt: reply.date,
        };
      }
    }

    const determinedData = determineUpdate(reply);

    try {
      const data = await prisma.reply.update({
        where: { id },
        data: determinedData,
      });
      res.status(200).json(data);
    } catch (err) {
      // return res.status(500).json({ message: "Error updating reply" });
      return res.status(500).json({ message: reply });
    }
  }
}
