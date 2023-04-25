// import { useEffect, useState } from "react";
// import { useContext } from "react";
// import { CartContext } from "../../Context/CartContext";
// import { toast } from "react-hot-toast";
// import { Helmet } from "react-helmet";

// export default function Wishlist() {

//   let {
//     getLoggedUserWishlist,
//     updateProductCount,
//     cartDetails,
//     deleteCartItem,
//     setCartDetails,
//   } = useContext(CartContext);

//   async function getCart() {
//     let response = await getLoggedUserWishlist();
//     setCartDetails(response.data);
//     // console.log(response.data);
//   }

//   async function deleteItem(productId) {
//     let response = await deleteCartItem(productId);
//     setCartDetails(response.data);
//     // console.log(response.data);
//     if (response.data.status == "success") {
//       toast.success(response.data.message);
//     } else {
//       toast.error(response.data.message);
//     }
//   }

//   async function updateCount(productId, count) {
//     let response = await updateProductCount(productId, count);
//     setCartDetails(response.data);
//     if (response.data.status == "success") {
//       toast.success(response.data.message);
//     } else {
//       toast.error(response.data.message);
//     }
//   }

//   // let userToken = localStorage.getItem("userToken");
//   // let headers = { token: userToken };
//   const [data, setData] = useState({description:'',image:'', count: 0, data: [] });

//   // const fetchData = async () => {
//   //   const response = await fetch( `https://route-ecommerce.onrender.com/api/v1/wishlist`,{ headers });
//   //   const result = await response.json();
//   //   setData(result);
//   // };
//   useEffect(() => {
//     // fetchData();
//     getCart()
//   }, []);


//   return (
//     <>

//       <div>
//       {/* <ul>
//         {data.data.map(item => (
//          <>
//            <li key={item._id}>{item.title}</li>
//            <h1>{item.name}</h1>
//            <h1>{item.description}</h1>
//            <h1>{item.count}</h1>
//            <h1>{item.slug}</h1>
//            <img src={item.image} alt="" />
//          </>
//         ))}
//       </ul> */}

//       <div>
//       {cartDetails !== null ? (
//         <div className="bg-main-light p-4 my-4">
//           <h1>{cartDetails.data.products.count} </h1>
//           <h5>Shop Cart </h5>
//           <h6 className="text-main">
//             Total Price : {cartDetails.data.totalCartPrice} EGP
//           </h6>
//           {cartDetails.data.products.map((product, index) => (
            
//             <div
//               key={index}
//               className="row border-bottom py-2 my-2 align-items-center"
//             >
//               {/* <ul>
//         {data.data.map(item => (
//          <>
//            <li key={item._id}>{item.title}</li>
//            <h1>{item.name}</h1>
//            <h1>{item.description}</h1>
//            <h1>{item.count}</h1>
//            <h1>{item.slug}</h1>
//            <img src={item.image} alt="" />
//          </>
//         ))}
//       </ul> */}
//               <div className="col-md-1">
//                 <img
//                   src={product.product.imageCover}
//                   alt="product"
//                   className="w-100"
//                 />
//               </div>
//               <div className="col-md-11 d-flex justify-content-between">
//                 <div>
//                   <h6 className="fw-bolder">{product.product.title}</h6>
//                   <h6 className="text-main">{product.price} EGP</h6>
//                   <button
//                     onClick={() => deleteItem(product.product._id)}
//                     className="btn m-0 p-0"
//                   >
//                     {" "}
//                     <i className="text-danger btn-sm font-sm fa-regular fa-trash-can"></i>{" "}
//                     remove{" "}
//                   </button>
//                 </div>
//                 <div>
//                   <button
//                     onClick={() =>
//                       updateCount(product.product._id, product.count + 1)
//                     }
//                     className="btn  btn-sm border-main"
//                   >
//                     +
//                   </button>
//                   <span className="d-inline-block mx-2">{product.count}</span>
//                   <button
//                     onClick={() =>
//                       updateCount(product.product._id, product.count - 1)
//                     }
//                     className="btn  btn-sm border-main"
//                   >
//                     -
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : null}
//       </div>
//     </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateProductCount,
    cartDetails,
    deleteCartItem,
    setCartDetails,
  } = useContext(CartContext);
  
  // const [cartDetails, setCartDetails] = useState(null);
  // console.log(cartDetails.numOfCartItems);

  async function getCart() {
    let response = await getLoggedUserCart();
    setCartDetails(response.data);
    console.log(response.data);
  }

  async function deleteItem(productId) {
    let response = await deleteCartItem(productId);
    setCartDetails(response.data);
    // console.log(response.data);
    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  async function updateCount(productId, count) {
    let response = await updateProductCount(productId, count);
    setCartDetails(response.data);
    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Shop Cart </title>
      </Helmet>

      {cartDetails !== null ? (
        <div className="bg-main-light p-4 my-4">
          <h5>Shop Cart </h5>
          <h6 className="text-main">
            Total Price : {cartDetails.data.totalCartPrice} EGP
          </h6>
          {cartDetails.data.products.map((product, index) => (
            <div
              key={index}
              className="row border-bottom py-2 my-2 align-items-center"
            >
              <div className="col-md-1">
                <img
                  src={product.product.imageCover}
                  alt="product"
                  className="w-100"
                />
              </div>
              {/* <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <h6 className="fw-bolder">{product.product.title}</h6>
                  <h6 className="text-main">{product.price} EGP</h6>
                  <button
                    onClick={() => deleteItem(product.product._id)}
                    className="btn m-0 p-0"
                  >
                    {" "}
                    <i className="text-danger btn-sm font-sm fa-regular fa-trash-can"></i>{" "}
                    remove{" "}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() =>
                      updateCount(product.product._id, product.count + 1)
                    }
                    className="btn  btn-sm border-main"
                  >
                    +
                  </button>
                  <span className="d-inline-block mx-2">{product.count}</span>
                  <button
                    onClick={() =>
                      updateCount(product.product._id, product.count - 1)
                    }
                    className="btn  btn-sm border-main"
                  >
                    -
                  </button>
                </div>
              </div> */}
            </div>
          ))}
          {/* <Link
            to={"/checkout/"+cartDetails.data._id}
            className="btn btn-success mt-3"
          >
            Checkout
          </Link> */}
        </div>
      ) : null}
    </>
  );
}
