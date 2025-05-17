import express from 'express';
import { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Starting Server for Weather Box");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});