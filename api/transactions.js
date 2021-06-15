const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const { transaction: Transaction } = new PrismaClient();

router.get("/", async (req, res) => {
  const transactions = await Transaction.findMany();

  res.json({ success: true, count: transactions.length, data: transactions });
});

router.post("/", async (req, res) => {
  try {
    const { text, amount } = req.body;
    await Transaction.create({
      data: {
        text,
        amount,
      },
    });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: ["Validation Error"] });
  }
});

module.exports = router;
