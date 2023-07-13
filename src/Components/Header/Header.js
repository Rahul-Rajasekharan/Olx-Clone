import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../Assets/OlxLogo';
import Search from '../../Assets/Search';
import Arrow from '../../Assets/Arrow';
import SellButton from '../../Assets/SellButton';
import SellButtonPlus from '../../Assets/SellButtonPlus';
import { AuthContext } from '../../Store/Context';
import { getAuth, signOut } from 'firebase/auth';
import { firebase } from '../../Firebase/Config';

function Header() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    const auth = getAuth(firebase)
    signOut(auth).then(() => {
      navigate('/')
    })
  }
   const handeSell = () =>{
    if(user){
      navigate('/create')
    }else{
      navigate('/login')
    } 
   }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
         <Link to='/'> <OlxLogo></OlxLogo> </Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction" type="submit">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span className='login'>{user ? `Welcome ${user.displayName}` : <Link className='login' to='/login' style={{ textDecoration: 'none', color: '#11282a' }}>Login</Link>}</span>
          <hr />
        </div>
        {user && <span className='login' onClick={handleLogout}>Logout</span>}
        <div className="sellMenu" onClick={handeSell}>
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Header;