import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { postContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/Context';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

function View() {
  const { postDetails } = useContext(postContext)
  const { firebase } = useContext(FirebaseContext)
  const [userDetails, setUserDetails] = useState(null)
  useEffect(() => {
    const {userId} = postDetails 
    const firestore = getFirestore(firebase)
  getDocs(query(collection(firestore, 'users'),
   where('id', '==' ,userId))).then((response)=>{
    response.forEach(doc=>{
      setUserDetails(doc.data())
    })
  })

  })

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img className='image'
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdOn}</span>
        </div>
       { userDetails && 
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
        }
      </div>
    </div>
  );
}
export default View;