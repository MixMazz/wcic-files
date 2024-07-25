import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    fish: { type: String, required: true },
    bug: { type: String, required: true },
    sealife: { type: String, required: true },
    alkKey: { type: String, required: true },
})

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);