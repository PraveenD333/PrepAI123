import { model, Schema } from "mongoose";

const questionSchema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: "session" },
    question: String,
    answer: String,
    note: String,
    isPinned: { type: Boolean, default: false },
}, { timestamps: true });

const Question = model("question", questionSchema);

export default Question;