import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    favourities: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    disliked: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestampls: true }
);

const User = model("user", UserSchema);
User.createIndexes();
export default User;
