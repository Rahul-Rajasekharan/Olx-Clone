import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../Assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../Store/Context';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { postContext } from '../../Store/PostContext';

function Posts() {
  const { firebase } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const {setPostDetails} = useContext(postContext)

  useEffect(() => {
    const firestore = getFirestore(firebase)
    getDocs(collection(firestore, 'products')).then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allPost)
    })
  })

  const handleNavigation = ()=>{
    navigate('/viewpost')
  }
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div onClick={handleNavigation} className="cards">
        
          {
            products.map((product) => {
              return  <div onClick={()=> setPostDetails(product) } className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdOn}</span>
                </div>
              </div>

                
            })
          }
              </div>
      </div>
        <div className="recommendations">
          <div className="heading">
            <span>Fresh recommendations</span>
          </div>
          <div className="cards">
            <div className="card">
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src="../../../Images/R15V3.jpg" alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; 250000</p>
                <span className="kilometer">Two Wheeler</span>
                <p className="name"> YAMAHA R15V3</p>
              </div>
              <div className="date">
                <span>12/6/2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
}

      export default Posts;