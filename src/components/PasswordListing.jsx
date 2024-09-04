import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/index';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const PasswordListing = () => {
    const [passwords, setPasswords] = useState([]);
    const [user, setUser] = useState(null);

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
    }, []);

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
          console.log('Document deleted successfully');
        } catch (error) {
          console.error('Error deleting document:', error);   
      
        }
      }

    return (
        <div className='w-full h-5/6 flex justify-center items-center '>
        <div className='max-h-[600px] overflow-auto py-30 bg-red-400 mt-16 w-[500px] '>
            <div className='p-3 '>
                <h2>PasswordListing</h2>
            </div>
            {/* Render the passwords */}
            <ul>
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
                {passwords.map((password) => (
                    <>
                     <li key={password.id}>{password.password} <button onClick={()=>deleteDocument(password.id)}>delete</button></li>                   
                    </>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default PasswordListing;
