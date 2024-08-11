import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongodb connected");
    });

    connection.on("error", (err) => {
      console.log(
        "mongodb connection error, please make sure DB is up and running: " +
          err
      );
      process.exit();
    });
    
  } catch (error) {
    console.log("Something went wrong in connecting to DB");
    console.log(error);
  }
}
