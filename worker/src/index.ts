import { createClient } from "redis";

const client = createClient();

const worker = async () => {
  try {
    await client.connect();
    console.log("worker connected to redis");
    while (1) {
      try {
        const submission = await client.brPop("problems", 0);
        //the submissions can be verified by passing them another functions
        console.log(submission);
        await new Promise((reslove) => setTimeout(reslove, 1000));
      } catch (error) {
        console.error("Error processing submission:", error);
      }
    }
  } catch (error) {
    console.error("Error processing submission:", error);
  }
};

worker();
