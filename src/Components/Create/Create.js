import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext,FirebaseContext } from '../../Store/Context';
import {getStorage, ref, uploadBytes, getDownloadURL}  from 'firebase/storage'
import { addDoc, collection,getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const {user} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const date = new Date()
  const navigate = useNavigate()
  const handleSubmit = ()=>{
    const storage = getStorage(firebase)
    const storageRef = ref(storage, `/image/${image.name}`)
    uploadBytes(storageRef, image).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        console.log(url);
        const firestore = getFirestore(firebase)
        const productCollection = collection(firestore,'products')
        addDoc(productCollection,{
          userId : user.uid,
          name,
          category,
          price,
          url,
          createdOn : date.toDateString() 
        })
        navigate('/')
      }).catch((err)=>{
        console.log('Error in downloading the url : ',err);
      })
    }).catch((err)=>{
      alert('Error in uploading file try again')
      console.log('Error in uploading file : ',err);
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" 
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            id="fname" name="Price" />
            <br />
          <br />
          <img alt="Posts" width="150px" height="170px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;