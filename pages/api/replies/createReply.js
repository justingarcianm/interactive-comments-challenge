import prisma from "@/prisma/client";

export default async function handler(req, res) {
  const reply = JSON.parse(req.body);
  console.log(reply);
  if (req.method === "POST") {
    // Check for Content
    if (!reply.content.length) {
      return res.status(500).json({ message: "Please add content before creating a reply" });
    }
    try {
      const data = await prisma.reply.create({
        data: {
          authorId: reply.authorId,
          content: reply.content,
          commentID: reply.commentID,
          replyToID: reply.replyToID,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ message: "Error creating new reply" });
    }
  }
}
