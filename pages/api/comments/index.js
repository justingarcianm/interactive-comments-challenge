import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.comment.findMany({
        include: {
          author: true,
          replies: {
            include: {
              author: true,
              replyTo: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
