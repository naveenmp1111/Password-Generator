import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/index';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {toast} from 'react-toastify'

const PasswordListing = () => {
    const [passwords, setPasswords] = useState([]);
    const [user, setUser] = useState(null);
    const [refresh,setRefresh]=useState(false)

    useEffect(() => {
        // Listen to auth state changes to ensure the user is available
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchPasswords(currentUser);
            } else {
                setUser(null);
                console.log('No user is logged in');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [refresh]);

    const fetchPasswords = async (currentUser) => {
        if (currentUser) {
            const userId = currentUser.uid;
            const passwordRef = collection(db, "Passwords");
            const q = query(passwordRef, where("userId", "==", userId));
            console.log('q is ', q);

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const passwords = [];

                // Iterate over each document in the snapshot
                querySnapshot.forEach((doc) => {
                    passwords.push({
                        id: doc.id,
                        ...doc.data(), // Spread the document data into the object
                    });
                });

                console.log("Passwords:", passwords);
                setPasswords(passwords);
            } else {
                console.log("No passwords found for this user.");
            }
        } else {
            alert('No user is logged in');
        }
    };

    const  deleteDocument= async( documentId)=> {
        try {
          const docRef = doc(db, 'Passwords', documentId);
          await deleteDoc(docRef);
          toast('Password deleted successfully')
          setRefresh(prev=>!prev)
          console.log('Document deleted successfully');
        } catch (error) {
          console.error('Error deleting document:', error);   
      
        }
      }

      const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard', text);
                toast('Copied to clipboard', {
                    toastId: 'copyToClipboard',
                });
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    return (
        <div className='w-full h-5/6 flex justify-center items-center '>
        <div className='max-h-[600px] overflow-auto py-30  mt-16 w-[500px] '>
            <div className='p-3 '>
                {passwords.length ? <h2 className='text-2xl text-center font-bold'>Saved Passwords</h2> : <h2 className='text-2xl text-center font-bold'>No Saved Passwords</h2>}
            </div>
            {/* Render the passwords */}
            <ul>
                {passwords.length ? passwords.map((password) => (
                    <>
                    <div key={password.id} className='flex bg-black m-1 p-2 justify-around rounded-lg'>
                        <div className='p-2 bg-slate-400 flex justify-center items-center m-2 w-1/2 rounded-lg text-white font-semibold text-xl'>{password.password}</div>
                        <div className='flex flex-col '>
                            <button className='flex justify-center items-center p-1 m-1 bg-red-500 text-white font-medium w-full rounded-md' onClick={()=>deleteDocument(password.id)}>delete</button>
                            <button className='flex justify-center items-center p-1 m-1 bg-white w-full rounded-md font-medium' onClick={()=>copyToClipboard(password.password)}>copy to clipboard</button>
                        </div>
                    </div>
                    </> 
                )) : ''}
                
            </ul>
        </div>
        </div>
    );
};

export default PasswordListing;
