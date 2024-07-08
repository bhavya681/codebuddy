import { connect } from "mongoose";

const connectDb = async () => {
  try {
    await connect(
      process.env.MONGO_URI
    );
    console.log("Successfully Connected to database");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
