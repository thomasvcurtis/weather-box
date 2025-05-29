import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/tomorrowioRoutes";

const app = express();
const port = process.env.PORT;
app.use(cors());

app.use('/weather', weatherRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});