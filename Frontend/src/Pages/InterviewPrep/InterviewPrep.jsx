import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion'
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import RoleInfoHeadre from './Components/RoleInfoHeadre';
import axios from 'axios';
import QuestionsCard from '../../Components/Cards/QuestionsCard';
import AIResponsePreview from './Components/AIResponsePreview';
import Drawer from '../../Components/Drawer';
import SkeletonLoader from '../../Components/Loader/SkeletonLoader';
import SpinnerLoader from '../../Components/Loader/SpinnerLoader';

const InterviewPrep = () => {

  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, seterrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch sessionData by session ID
  const fetchSessionDetailsById = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data && response.data.session) {
        setSessionData(response.data.session)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      seterrorMsg("");
      setExplanation(null)

      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const token = localStorage.getItem("token")
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ai/generate-explanation`, { question }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null)
      seterrorMsg("Failed to generate explanation, Try again later");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pin Questions
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/questions/${questionId}/pin`, (questionId), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response);

      if (response.data && response.data.question) {
        // toast.success('Question Pinned Successfully')
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const token = localStorage.getItem("token")
      // Call the API to Generate Questions
      const aiResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/ai/generate-questions`, {
        role: sessionData.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Should be Array like [{Question, answer}, ...]
      const generateQuestion = aiResponse.data;

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/questions/add`, {
        sessionId,
        questions: generateQuestion
      }, { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data) {
        toast.success("Added More Q&A!!")
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        seterrorMsg(error.response.data.message)
      } else {
        seterrorMsg("Something went wrong. Please try Again.")
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => { };
  }, []);


  return (
    <DashboardLayout>
      <RoleInfoHeadre
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions?.length || ""}
        description={sessionData?.description || ""}
        lastUpdated={sessionData?.updatedAt
          ? moment(sessionData.updatedAt).format("DD MM YYYY") : ""}
      />

      <div className='bg-black text-white mx-auto pt-4 pb-4 px-4 md:px-0'>
        <h2 className='animate-text-shine text-4xl font-semibold ml-[23%] text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-600 to-purple-600'> Interview  Q&A</h2>

        <div className='grid grid-cols-12 gap-4 bg-black mt-5 mb-10'>
          <div className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}>
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout //This is the key prop that animates position changes
                    layoutId={`question-${data._id || index}`} //Heps framer track specific items
                  >
                    <>
                      <QuestionsCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => generateConceptExplanation(data.question)}
                        isPinned={data.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)} />
                    </>
                    {/* Load More */}
                    {!isLoading &&
                      sessionData?.questions?.length == index + 1 && (
                        <div className="flex items-center bg-black justify-center mt-5">
                          <div className="p-[2px] rounded-full bg-gradient-to-tr from-indigo-600  to-purple-500 transition-transform transform hover:-translate-y-1 duration-300 ease-in-out hover:shadow-[0_3px_30px_rgba(255,_105,_180,_0.8)]">
                            <button
                              className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? <SpinnerLoader /> : <LuListCollapse className='text-lg' />}
                              Load More
                            </button>
                          </div>
                        </div>

                      )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading && explanation?.title}>
            {errorMsg && (
              <p className='flex gap-2 text-sm text-amber-600 font-medium'>
                <LuCircleAlert className='mt-1' /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (<AIResponsePreview content={explanation?.explanation} />)}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep