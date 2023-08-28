"use client"
import React, { useEffect,useState } from 'react'
import app from '../shared/firebase';
import UserInfo from './../components/UserInfo'
import { useMyContext } from '../context/context'; // Adjust the path as needed
import { collection, getDocs,getDoc,doc, getFirestore, query, where } from 'firebase/firestore'
import PinList from './../components/Pins/PinList'
function Profile({params}) {
  const db=getFirestore(app);
  const [userInfo,setUserInfo]=useState();
  const [listOfPins,setListOfPins]=useState([]);
  const { data, updateData } = useMyContext();

  useEffect(()=>{
    if(params)
    {
      getUserInfo(params.userId.replace('%40','@'))
    }
  },[params]);
  useEffect(() => {
    if(data !== ''){
      const filteredPins = listOfPins.filter((item) =>
      item.title.includes(data)
    )
    setListOfPins(filteredPins);
    }else{
      getUserPins()
    }

  }, [data]);


  const getUserInfo=async(email)=>{
    const docRef = doc(db, "user",email );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      
      setUserInfo(docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
    }
  }
  useEffect(()=>{
      if(userInfo)
      {
        getUserPins();
      }
  },[userInfo])
  const getUserPins=async()=>{
    setListOfPins([])
      const q=query(collection(db,'pinterest-post')
      ,where("email",'==',userInfo.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     
      setListOfPins(listOfPins=>[...listOfPins,doc.data()]);
      });
  }
  return (
    <div>
     {userInfo?
     <div>
      <UserInfo userInfo={userInfo} />
     
      <PinList listOfPins={listOfPins}  />
      </div> :null}
    </div>
  )
}

export default Profile