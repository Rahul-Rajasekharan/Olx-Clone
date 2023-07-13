import React, { useContext, useState } from 'react';
import {FirebaseContext} from '../../Store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate, Link} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    const auth = getAuth(firebase)
    signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      console.log(userCredential.user);
      navigate('/')
    }).catch((error)=>{
        alert(error.code)
    })

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='Logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
            placeholder='john@gmail.com'
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
            placeholder='......'
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;