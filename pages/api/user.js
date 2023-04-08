import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: 1,
        },
      });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
