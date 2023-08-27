'use client'
import React, { useEffect, useState } from 'react'
import {doc, getDoc, getFirestore} from "firebase/firestore";
import app from '../shared/firebase'
import Image from 'next/image';

const Profile = ({params}) => {
  const [userData, setUserData]= useState([])
  const userIDEmail = params.userId.replace('%40','@')
  const db = getFirestore(app);
  const getUserInfo = async() =>{
    const docRef = doc(db, "user", userIDEmail)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      setUserData(docSnap.data())
    }
  }
  useEffect(()=>{
    getUserInfo()
    console.log(userData.name)

  },[params])
 
  return (
    <div >
     {
      userData && userData?.name ? (
        <div className='flex flex-col items-center text-center'>
          <Image src={userData?.image} className='rounded-full' width={100} height={100} />
          <h2 className='font-semibold text-[30px]'>{userData?.name}</h2>
          <h2 className='text-gray-400 text-[30px]'>{userData?.email}</h2>
          <button className='bg-gray-200 font-semibold p-2 px-3 rounded-full'>Share</button>

        </div>
      ) : (
        {userIDEmail}
      )
    }
    </div>
  )
}

export default Profile