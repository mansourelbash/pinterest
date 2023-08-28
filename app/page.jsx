"use client"
import Image from 'next/image'

import { useSession, signIn, signOut } from "next-auth/react"
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import app from './shared/firebase';
import { useEffect, useState } from 'react';
import PinList from './components/Pins/PinList';
import { getAuth} from "firebase/auth";
import {useRouter} from 'next/navigation';
import { useMyContext } from './context/context'; // Adjust the path as needed

export default function Home() {
  const { data, updateData } = useMyContext();
  const db=getFirestore(app);
  const [listOfPins,setListOfPins]=useState([]);
  const {data:session}=useSession();
  const auth = getAuth(app);
  const router=useRouter();
  const currentUser = auth.currentUser;
  useEffect(()=>{
    getAllPins();
    getAllUsers();
    if(!session || !currentUser){
      router.push('/')
    }
  },[])
  useEffect(() => {
    if(data !== ''){
      const filteredPins = listOfPins.filter((item) =>
      item.title.includes(data)
    )
    setListOfPins(filteredPins);
    }else{
      getAllPins()
    }

  }, [data]);


  const getAllPins=async()=>{
    setListOfPins([])
      const q=query(collection(db,
        'pinterest-post')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       
       
      setListOfPins((listOfPins)=>
      [...listOfPins,doc.data()]);
      });
  }

  const getAllUsers=async()=>{
    setListOfPins([])
      const q=query(collection(db,
        'users')
      );
      const querySnapshot = await getDocs(q);
  }

  return (
    <>
    <div className='p-3'>
     {session?.user || currentUser ? <PinList listOfPins={listOfPins} />  : null} 
      </div>
    </>
  )
}