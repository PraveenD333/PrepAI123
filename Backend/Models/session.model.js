import { model, Schema } from "mongoose";

const sessionSchema = new Schema({
    user: { type:Schema.Types.ObjectId, ref:"user"},
    role: { type: String, required: true},
    experience: { type: String, required: true },
    topicsToFocus:{type:String, required:true},
    description:String,
    questions:[{type:Schema.Types.ObjectId,ref:"question"}],
}, { timestamps: true });

const Session = model ("session", sessionSchema);

export default Session;