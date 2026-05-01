const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "SECRET123")
    const user = await User.findById(payload.id)
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    req.user = user
    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ success: false, message: "Unauthorized" })
  }
}
