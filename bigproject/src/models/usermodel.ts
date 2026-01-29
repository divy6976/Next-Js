import mongoose, { Schema, Document, Model } from "mongoose";

/* Export User interface */
export interface User extends Document {
  name: string;
  age: number;
  email: string;
  image?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/* Schema */
const userSchema = new Schema<User>(
  {
    name: { type: String },
    age: { type: Number },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

/* Export Model directly */
export const User: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", userSchema);


