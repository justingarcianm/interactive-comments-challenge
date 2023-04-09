import prisma from "@/prisma/client";

export default async function handler(req, res) {
  const id = Number(req.query.id);

  if (req.method === "DELETE") {
    try {
      const data = await prisma.reply.delete({ where: { id } });
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: "Error deleting reply" });
    }
  }
}
