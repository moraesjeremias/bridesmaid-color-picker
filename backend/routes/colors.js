import express from "express";
import Color from "../models/color.js";
import User from "../models/user.js";
import sequelize from "../db.js";

const router = express.Router();

// GET /colors?available=true
router.get("/", async (req, res) => {
  const { available } = req.query;
  let where = {};
  if (available === "true") where.avaiable = true;
  try {
    const colors = await Color.findAll({ where });
    res.json(colors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch colors" });
  }
});

// POST /colors
router.post("/", async (req, res) => {
  const { id, displayName, userId, userName } = req.body;
  if (!userId || !userName) return res.status(400).json({ error: "Missing fields" });

  const t = await sequelize.transaction();
  try {
    // Check if color is still available
    const color = await Color.findOne({ where: { id, avaiable: true }, transaction: t, lock: t.LOCK.UPDATE });
    if (!color) {
      await t.rollback();
      return res.status(409).json({ error: "Color already taken" });
    }

    // Find or create user
    let [user] = await User.findOrCreate({
      where: { userId },
      defaults: { name: userName, userId },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    // Update color
    color.avaiable = false;
    color.status = "TAKEN";
    color.userId = user.id;
    await color.save({ transaction: t });

    await t.commit();
    res.status(200).json({ success: true });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: "Failed to select color" });
  }
});

export default router;
