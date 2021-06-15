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
    res.status(400).json({ success: false, error: ["Validation Error"] });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!transaction) {
    return res.status(404).json({
      success: false,
      error: "No transaction found",
    });
  }

  await Transaction.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = router;
