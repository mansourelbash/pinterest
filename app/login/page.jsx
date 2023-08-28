'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { doc, getFirestore, setDoc } from 'firebase/firestore'

import app from '../shared/firebase';
import { toast } from 'react-toastify';

const Login = () => {
  const {data:session}=useSession();
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [stateUser, setStateUser] = useState('login');
  const auth = getAuth(app);
  const db = getFirestore(app);
  const empID = Date.now().toString();

  // const currentUser = auth.currentUser;
  // console.log(currentUser)
  const addUserDate = async () => {
    await setDoc(doc(db, "alldata", empID), {
      empID,
      name,
      email,
      password
    }).then(()=>{
      toast.success('done saved to firebase'); // Display a success message
    });
  };
  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password, name)
      .then((userCredential) => {
        addUserDate()
        const user = userCredential.user;
        toast.success('Signed up successfully:', user); // Display a success message
        setStateUser('login'); // Update the user's state (possibly for navigation)
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error('Signup error:', errorMessage); // Display an error message
      });
      
  };  
  
  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    router.push('/')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error('Your email and password not correct')

  });
  };

  
  return (


    <div>
       <section className="bg-gray-50 dark:bg-gray-500">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-80px)] lg:py-0">
              <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img className="w-8 h-8 mr-2" src="/logo.png" alt="logo" />
                  Pinterset    
              </a>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {stateUser == "login" ? "Sign in to your account" : "Sign Up New Account" }  
                      </h1>
                      <form className="space-y-4 md:space-y-6" action="#">
                         {stateUser !== 'login'? 
                         <div>
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                              <input type="name" name="name" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={name} onChange={e => setName(e.target.value)} required="" />
                          </div>
                         : null} 
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} required="" />
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""  value={password}  onChange={e => setPassword(e.target.value)} />
                          </div>
                          {stateUser == 'login' ?
                          <button type="button" className="w-full text-white bg-[#e60023] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSignIn}>Sign in</button>
                          : 
                          <button type="button" className="w-full text-white bg-[#e60023] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSignup}>Sign Up</button>
                          }
                          
                          <button className="gmail-button flex gap-4 bg-gray-100 p-2 px-4 rounded align-center mt-20 w-full text-center justify-center" onClick={()=> signIn()}>
                          <img
                            src="/google.svg"
                            alt="Google Logo"
                            className="google-icon"
                          />
                          Sign in with Google
                        </button>

                        {stateUser == 'login' ? 
                         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                         Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={()=> setStateUser('signup')}>Sign up</a>
                        </p>
                          :
                          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          I have Already Account <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={()=> setStateUser('login')}>Sign in</a>
                         </p>
                           }
                         
                      </form>
                  </div>
              </div>
          </div>
        </section>







    </div>
  );
};

export default Login;
