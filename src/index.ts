import express, { Request, Response } from "express";
import { postRoutes } from "./routes/postRoutes";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
