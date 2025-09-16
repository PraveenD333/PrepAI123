import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input'
import SpinnerLoader from '../../Components/Loader/SpinnerLoader'
import axios from 'axios'

const CreateSessionForm = () => {

    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    })

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }

    const handleCreateSession = async (e) => {
        e.preventDefault();


        const { role, experience, topicsToFocus } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields..");
            return;
        }

        setError("");
        setIsLoading(true);


        const newAiData = {
            role,
            experience,
            topicsToFocus,
            numberOfQuestions: 10,
        }

        try {
            const token = localStorage.getItem("token")
            // call the Api to Generate the Questions
            const airesponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/ai/generate-questions`, newAiData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            console.log(airesponse);

            // Should be Array like [{question, answer}, ...]

            const generatedQuestions = airesponse.data

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/sessions/create`, {
                ...formData,
                questions: generatedQuestions,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
            );
            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }

        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. please try again.")
            }
        } finally {
            setIsLoading(false);
        }
    };

    return <div className="p-[1px] rounded bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500">
        <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center bg-black rounded-xl'>
            <h3 className='text-lg font-semibold text-white'>
                Start a New Interview Journey
            </h3>
            <p className='text-xs text-white mt-[5px] mb-3'>
                Fill out a few Quick details and unlock your personalized set of interview Questions!
            </p>

            <form onSubmit={handleCreateSession} className='flex flex-col gap-3'>
                <Input
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
                    type="text"
                />

                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Years Of Experience"
                    placeholder="(e.g., 1 Year, 3 Years, 5+Years)"
                    type="number"
                />

                <Input
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics To Focus On"
                    placeholder="(Comma-separated, e.g., React.js,Node.js MongoDB)"
                    type="text"
                />

                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Description"
                    placeholder="(Any Specific goals or notes for this session)"
                    type="text"
                />
                {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                <button
                    className='btn-primary w-full mt-2'
                    type='submit'
                    disabled={isLoading}>
                    {isLoading ? <SpinnerLoader /> : "Create Session"}</button>
            </form>
        </div>
    </div>

}

export default CreateSessionForm