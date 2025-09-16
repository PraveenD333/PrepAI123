import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuSparkles } from "react-icons/lu";
import HERO_IMG from '../assets/Home.png'
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { APP_FEATURES } from '../utils/data'
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Modal from '../Components/Modal';
import { UserContext } from '../Context/UserContext';
import ProfileInfo from '../Components/Cards/ProfileInfo';

const LoadingPage = () => {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login")

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  }
  return (
    <div>
      <div className='w-full min-h-screen bg-black relative responsive-bg'>
        <div className='w-[500px] h-[700px] blur-[65px] absolute top-0 left-0' />

        <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
          {/* Header */}
          <header className='flex justify-between items-center mb-16'>
            <div className='text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500  to-purple-600 font-bold'>
              Prep AI
            </div>
            {user ? (<ProfileInfo />) : (
              <div className="inline-block p-[2px] rounded-full bg-gradient-to-tr from-indigo-600  to-purple-500  transition-transform transform ml-6">
                <button
                  onClick={() => setOpenAuthModal(true)}
                  className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black transition-colors cursor-pointer w-full"
                >
                  Login / SignUp
                </button>
              </div>

            )}
          </header>

          {/* Hero Content */}
          <div className='flex flex-col md:flex-row items-center pt-32'>
            <div className='w-full md:w-1/2 pr-4 mb-6 mb:mb-0'>
              <div className='flex items-center justify-left mb-2'>
                <div className='flex items-center gap-2 text-[13px] text-black font-semibold bg-gradient-to-tr from-indigo-600  to-purple-500  px-3 py-1 rounded-full border-2 border-black'>
                  <LuSparkles /> AI Powered

                </div>
              </div>

              <h1 className='text-6xl text-white font-medium mb-6 leading-tight'>
                Ace Interview With <br />
                <span className='text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-600 to-purple-600 animate-text-shine font-semibold'>
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className='w-full md:w-1/2'>
              <p className='text-[16px] font-semibold text-gray-300 pl-6 mb-6'>
                Unlock role-specific questions designed for your success. Explore detailed answers when you’re ready to dive deeper.
                Organize your learning your way, at your own pace. From preparation to mastery, this is your ultimate interview toolkit.
                Build confidence with practice questions and refine your skills effortlessly.Your journey to acing every interview starts here.
              </p>

              <div className="inline-block p-[2px] animate-text-shine rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 transition-transform transform hover:-translate-y-1 duration-300 ease-in-out hover:shadow-[0_3px_30px_rgba(255,_105,_180,_0.8)] ml-6">
                <button
                  onClick={handleCTA}
                  className="bg-black text-base font-semibold text-white px-8 py-2.5 rounded-full transition-colors cursor-pointer w-full"
                >
                  Get Started
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className='w-full min-h-full relative z-10 bg-black'>
        <div>
          <section className='flex items-center justify-center -mt-24'>
            <img src={HERO_IMG} alt="Hero Image" className='w-[80vw] rounded-lg' />
          </section>
        </div>

        <div className='w-full min-h-full bg-black mt-10'>
          <div className='container mx-auto px-4 pt-10 pb-20'>
            <section className='mt-5'>
              <h2 className='animate-text-shine text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-600 to-purple-600 text-5xl font-medium text-center mb-12'>
                Features That Make You Shine
              </h2>

              <div className='flex flex-col items-center gap-8'>
                {/* First 3 Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className='p-[1.5px] rounded-xl bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 transition-transform transform hover:-translate-y-2 duration-300 ease-in-out shadow-sm hover:shadow-[0_5px_20px_rgba(255,_105,_180,_0.8)]'>

                      <div className='bg-black p-6 rounded-[10px] shadow-lg h-full'>
                        <h3 className='text-base font-semibold mb-3 text-white'>
                          {feature.title}
                        </h3>
                        <p className='text-white'>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>


                {/* Remaing 2 Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {APP_FEATURES.slice(3).map((fea) => (
                    <div key={fea.id}
                      className='p-[1.5px] rounded-xl bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 transition-transform transform hover:-translate-y-2 duration-300 ease-in-out shadow-sm hover:shadow-[0_3px_20px_rgba(255,_105,_180,_0.8)]'>
                      <div className='bg-black p-6 rounded-[10px] shadow-lg h-full'>
                        <h3 className='text-base font-semibold mb-3 text-white'>
                          {fea.title}
                        </h3>
                        <p className='text-white'>{fea.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className='bg-black text-white py-10 mt-16 border-t border-gray-800'>
          <div className='container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm'>

            {/* Left - Branding */}
            <div className='text-center md:text-left'>
              <div className='text-lg font-bold'>
                Prep AI
              </div>
              <p className='text-gray-500 mt-1'>
                Built With ❤️ For Better Interviews.
              </p>
            </div>

            {/* Center - Links */}
            <div className='flex gap-6 text-gray-500'>
              {/* Social Links */}
              <a href="https://www.linkedin.com/in/praveend369" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition" aria-label="LinkedIn">
                <FaLinkedin size={30} />
              </a>

              <a href="https://github.com/PraveenD333" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition" aria-label="GitHub">
                <FaGithub size={30} />
              </a>

              <a href="mailto:praveendhane97@gmail.com" className="hover:text-white transition" aria-label="Gmail">
                <HiOutlineMail size={30} />
              </a>
            </div>

            {/* Right - Copyright */}
            <div className='text-gray-500 text-center md:text-right'>
              © {new Date().getFullYear()} Prep AI. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader>
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  )
}
export default LoadingPage