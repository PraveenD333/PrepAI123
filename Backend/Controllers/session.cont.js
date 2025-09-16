import Question from "../Models/question.model.js";
import Session from "../Models/session.model.js";

export const createsession = async (req, res) => {
    try {

        const { role, experience, topicsToFocus, description, questions } = req.body;

        const userId = req.user._id;  //Assuming you have a userid in Muddleware

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        })
        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id
            })
        )

        session.questions = questionDocs;
        await session.save()

        res.status(201).json({ success: true, session })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getsession= async(req,res)=>{
    try {
        const session=await Session.find({user:req.user.id})
        .sort({createdAt: -1})
        .populate("questions");
        res.status(200).json({session})
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        
    }
}

export const getsessionById= async(req,res)=>{
    try {
        const session= await Session.findById(req.params.id)
        .populate({
            path:"questions",
            options: {sort:{isPinned:-1,createdAt:1}},
        })
        .exec();

        if(!session){
            return res.status(404).json({success:false,message:"Session not found"});
        }

        res.status(201).json({success:true,session})
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const deletesession=async(req,res)=>{
    try {

        const session=await Session.findById(req.params.id);

        if(!session){
           return res.status(404).json({message:"Session not found"});
        }

        // check if the  logged-in user owns this session
        if(session.user.toString() !== req.user.id){
            return res.status(401).json({message:"Not Authorized to delete this session"})
        }
        // First delete all the questions linked to this sesion
        await Question.deleteMany({session:session._id});

        // Then delete the session
        await session.deleteOne();

        res.status(200).json({message:"Session deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}