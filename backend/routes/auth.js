const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      email,
      password: hashedPassword
    })

    await user.save()

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "SECRET123",
      { expiresIn: "1d" }
    )

    res.json({
      success: true,
      message: "User created successfully",
      user: {
        email: user.email,
        balance: user.balance,
        transactions: user.transactions
      },
      token
    })
  } catch (err) {
    console.error(err)
    res.json({ success: false, message: "Registration failed" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.json({ success: false, message: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.json({ success: false, message: "Wrong password" })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "SECRET123",
      { expiresIn: "1d" }
    )

    res.json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
        balance: user.balance,
        transactions: user.transactions
      },
      token
    })
  } catch (err) {
    console.error(err)
    res.json({ success: false, message: "Login failed" })
  }
})

module.exports = router
