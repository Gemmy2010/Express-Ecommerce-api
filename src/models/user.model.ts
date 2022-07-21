import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface UserInput {
  name: string;
  email: string;
  role: string;
  password: string;
}

interface UserDocument extends UserInput, mongoose.Document {
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      min: [4, "You  name is too short"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} not supported",
      },
      required: [true, "User role is required"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);

  user.password = await bcrypt.hash(user.password, salt);

  return next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  let user = this as UserDocument;
  return await bcrypt
    .compare(enteredPassword, user?.password)
    .catch((error) => false);
};

const User = mongoose.model<UserDocument>("user", userSchema);

export default User;
