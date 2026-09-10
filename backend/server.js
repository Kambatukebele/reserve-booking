import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config(); // Environment variables

app.get("/", (req, res) => {
  res.send("Hello there");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
