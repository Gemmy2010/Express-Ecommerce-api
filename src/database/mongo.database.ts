import mongoose from "mongoose";

const createMongooseConnection = async () => {
  try {
    console.log("Connecting to the database");

    // @ts-ignore
    const mongooseUrl: string = process.env.MONGOOSE_URL;

    const connection = await mongoose.connect(mongooseUrl);

    console.log("Connected to the database");

    return connection;
  } catch (error) {
    console.log({
      connectionError: error,
    });

    process.exit();
  }
};

export default createMongooseConnection;
