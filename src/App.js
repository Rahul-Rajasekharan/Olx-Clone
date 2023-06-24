import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { AuthContext, FirebaseContext } from './Store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import Post from './Store/PostContext'
function App() {
  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    const auth = getAuth(firebase)
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  })
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/viewpost' element={<ViewPost />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}




export default App;