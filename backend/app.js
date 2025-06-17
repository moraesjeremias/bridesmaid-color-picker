import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colorsRouter from "./routes/colors.js";
import sequelize from "./db.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/colors", colorsRouter);

const init = async () => {  
    await sequelize.sync({ force: true });
    console.log("DB synced and seeded.");
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    await init();
  console.log(`Backend running on http://localhost:${PORT}`);
});
