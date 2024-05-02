import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { db } from "../../firebase"; // Import db from firebase.js

const Req = ({ email }) => {
  const [citizenshipNumber, setCitizenshipNumber] = useState('');
  const [age, setAge] = useState('');
  const [parentsName, setParentsName] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userRef = doc(db, 'users', email);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCitizenshipNumber(userData.citizenshipId || '');
          setAge(userData.age || '');
          setParentsName(userData.parentsName || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (citizenshipNumber.trim() === '' || age.trim() === '' || parentsName.trim() === '') {
      alert('Please fill in all the required fields.');
      return;
    }
    try {
      console.log("Submitting additional information...");
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const updatedData = {
          ...userData,
          citizenshipId: citizenshipNumber || '',
          age: age || '',
          parentsName: parentsName || '',
          gender: userData.gender || '', // Make sure to include existing gender if available
        };
        await updateDoc(doc(db, 'users', userDoc.id), updatedData);
        alert('Additional information submitted successfully!');
        // Navigate or perform additional actions as needed
      } else {
        alert('User data not found.');
      }
    } catch (error) {
      console.error('Error updating additional info:', error);
      alert('Failed to submit additional information.');
    }
  };

  return (
    <div>
      <h2>Additional Information Required</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Citizenship Number"
          value={citizenshipNumber}
          onChange={(e) => setCitizenshipNumber(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Parents' Name"
          value={parentsName}
          onChange={(e) => setParentsName(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Req;
