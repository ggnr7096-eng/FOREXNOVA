const express = require("express")
const auth = require("../middleware/auth")

const router = express.Router()

router.get("/", auth, async (req, res) => {
  res.json({ success: true, transactions: req.user.transactions })
})

router.post("/invest", auth, async (req, res) => {
  try {
    const amount = Number(req.body.amount)

    if (!amount || amount <= 0) {
      return res.json({ success: false, message: "Invalid investment amount" })
    }

    const user = req.user
    if (user.balance < amount) {
      return res.json({ success: false, message: "Insufficient balance" })
    }

    user.balance -= amount
    user.transactions.push({
      type: "Investment",
      amount,
      status: "Completed"
    })

    await user.save()

    res.json({
      success: true,
      balance: user.balance,
      transactions: user.transactions
    })
  } catch (err) {
    console.error(err)
    res.json({ success: false, message: "Investment failed" })
  }
})

module.exports = router
