"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { HiSearch, HiBell, HiChat } from 'react-icons/hi';
import { useSession, signIn, signOut } from 'next-auth/react';
import app from '../shared/firebase';
import { getFirestore, setDoc, doc } from 'firebase/firestore'; // Added 'setDoc' and 'doc' imports
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const db = getFirestore(app);

  const addUserDate = async () => {
    await setDoc(doc(db, "user", session?.user.email), {
      name: session?.user.name,
      email: session?.user.email,
      image: session?.user.image,
    });
  };

  useEffect(() => {
    if (session?.user) {
      addUserDate();
    }
  }, [session]);

  return (
    <div className='flex gap-3 p-6 items-center'>
      <Image src="/logo.png" alt='logo' width={50} height={50} className='hover:bg-gray-200 p-2 rounded-full cursor:pointer'/>
      <button className='block bg-black p-2 px-4 rounded-full text-white'>home</button>
      <button className='font-semibold p-2 px-4 rounded-ful' onClick={()=> router.push('/pin-builder')}>Create</button>
      <div className='bg-[#e9e9e9] p-3 flex gap-3 items-center rounded-full w-full hidden md:flex'>
        <HiSearch className='text-[30]' />
        <input type="text"  placeholder="Search" className='bg-transparent outline-none'/>
      </div>
      <HiSearch className='text-[30px] text-gray-500 md:hidden'/>
      <HiBell className='text-[30px] text-gray-500'/>
      <HiChat className='text-[30px] text-gray-500'/>
      {session?.user ? <button className='font-semibold p-2 px-4 rounded-ful' onClick={() => signOut()}>Logout</button> :  <button className='font-semibold p-2 px-4 rounded-ful' onClick={() => signIn()}>Login</button>}
      <span> {session?.user ? session?.user?.name : ''}</span>
      <Image
        src={session?.user ? session?.user?.image : "/man.png"}
        alt='logo'
        width={50}
        height={50}
        className='hover:bg-gray-200 p-2 rounded-full cursor:pointer'
        onClick={() => {
          if (session?.user?.image) {
            router.push(session?.user?.email);
          }
        }}
      />
    </div>
  )
}

export default Header