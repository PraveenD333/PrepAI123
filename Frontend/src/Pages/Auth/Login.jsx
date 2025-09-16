import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import { validateEmail } from '../../utils/healper';
import axios from 'axios'
import { UserContext } from '../../Context/UserContext';
import SpinnerLoader from '../../Components/Loader/SpinnerLoader';

const Login = ({ setCurrentPage }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);


  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate()

  // Handle login form Submit

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please Enter a Valid email address...")
      setIsLoading(false);
      return
    }

    if (!password) {
      setError("Please enter the Password...")
      setIsLoading(false);
      return;
    }

    const newUserData = {
      email: email,
      password: password
    }

    // Login API Call
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, newUserData)
      
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

  return <div className='rounded p-[1px] bg-gradient-to-tr from-indigo-600  to-purple-500'>
  <div className='bg-black rounded-lg w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
    {/* Your content */}
    <h3 className='text-lg font-semibold text-white'>Welcome Back</h3>
    <p className='text-xs text-white mt-[2px] mb-5'>
      Please enter your details to log in
    </p>

    <form onSubmit={handleLogin}>
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

      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

      <button type='submit' 
      className='btn-primary'
      disabled={isLoading}> {isLoading ? <SpinnerLoader /> : "LOGIN"}</button>

      <p className='text-[16px] text-white mt-3'>
        Don't have an Account?{" "}
        <button
          className='font-lg text-purple-500 underline cursor-pointer'
          onClick={() => { setCurrentPage("signup"); }}>Signup</button>
      </p>
    </form>
  </div>
  </div>
}

export default Login