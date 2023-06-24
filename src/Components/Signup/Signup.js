import React, { useState, useContext } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore'


export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { firebase } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const auth = getAuth(firebase)
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      updateProfile(result.user, { displayName: username }).catch((error)=>{
        alert(error.message)
      }).then(() => {
        const firestore = getFirestore(firebase)
        const usersCollection = collection(firestore,'users')
       addDoc(usersCollection, {
          id: result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          navigate('/')
        })
      })
    })

  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
            placeholder='John'
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
            placeholder='john@gmail.com'
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
            placeholder='07745679022'
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
            placeholder='............'
          />
          <br/>
          <br/>
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}