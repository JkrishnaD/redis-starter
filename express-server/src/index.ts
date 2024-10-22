import express from "express";
import { createClient } from "redis";

const client = createClient();
client.on("error", (err) => console.log("Redis client error", err));

const app = express();
app.use(express.json());

app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  try {
    //we can add the data into database before pushing them into redis
    await client.lPush(
      "problems",
      JSON.stringify({ problemId, userId, code, language })
    );
    res.json({
      message: "Submission Recieved",
    });
  } catch (error) {
    res.json({
      messsage: "Submission Cancled",
    });
  }
});

const startServer = async () => {
  try {
    await client.connect();
    console.log("client connected");

    app.listen(8080, () => {
      console.log("Express server is running");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
