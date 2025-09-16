import React, { useContext, useState } from 'react'
import Input from '../../Components/Inputs/Input';
import ProfilePic from '../../Components/Inputs/ProfilePic';
import { validateEmail } from '../../utils/healper';
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SpinnerLoader from '../../Components/Loader/SpinnerLoader';

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);


  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);


    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name..");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please Enter a Valid email address...")
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError("Please enter the Password...")
      setIsLoading(false);
      return;
    }

    // SignUp API Call
    try {
      //Upload Image if present
      if(profilePic){
        const imgUploadres= await uploadImage(profilePic);
        profileImageUrl=imgUploadres.imageUrl || ""
      }

      const newUserData = {
        name: fullName,
        email,
        password,
        profileImageUrl,
      }

      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUserData)

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data)
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className='rounded p-[1px] bg-gradient-to-tr from-indigo-600  to-purple-500'>
      <div className='bg-black rounded-lg w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
        <h3 className='text-lg font-semibold text-white'>Create an Account</h3>
        <p className='text-xs text-white mt-[5px] mb-6'>
          Join us today by entering your Details below
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePic image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text" />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@email.com"
              type="text" />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password" />
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' 
          className='btn-primary'
          disabled={isLoading}>{isLoading ? <SpinnerLoader/> : "SIGN UP"}</button>

          <p className='text-[16px] text-white mt-3'>
            Already an Account?{" "}
            <button
              className='font-xl text-purple-500 underline cursor-pointer'
              onClick={() => { setCurrentPage("login"); }}>Login</button>
          </p>

        </form>
      </div>
    </div>
  )
}

export default SignUp
