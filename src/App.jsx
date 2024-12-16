import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'; 
import {useState } from 'react';
import { assets,products } from './assets/assets';
import Cart from './components/Cart';
import { toast,ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {


  const [quantity, setQuantity]=useState(1);
  const [image,setImage]=useState(0);
  const [price,setPrice]=useState(69);
  const [cart,setCart]=useState([]);
  const [showCart,setShowCart]=useState(false);
  const [color,setColor]=useState();
  const [productName,setProductName]=useState();
  const [size,setSize]=useState();
  const [unitPrice,setUnitPrice]=useState();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);


  const handleIncrement=()=>setQuantity(quantity + 1);
  const handleDecrement=()=>setQuantity(Math.max(quantity - 1, 1));

  
  const handleCart = (image, name, size, color, quantity, unitPrice) => {
    if (!size || !color) {
      toast.error("Please select size and color", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.size === size && item.color === color
      );
  
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
          totalPrice:
            (updatedCart[existingItemIndex].quantity + quantity) *
            unitPrice,
        };
        return updatedCart;
      } else {
        const newItem = {
          image,
          name,
          size,
          color,
          quantity,
          unitPrice,
          totalPrice: quantity * unitPrice,
        };
        return [...prevCart, newItem];
      }
    });
  };
  


  return (
    
      <div>
      
      {showCart?<Cart cart={cart} setShowCart={setShowCart}/>:<></>}  
      {products.map((product,index)=>(
        <div className='flex h-screen font-roboto'>
        <div className='flex flex-col md:flex-row gap-7 items-center justify-center' key={index}>
              
              <img src={product.color_type[image][0]} className="w-1/3 rounded-[4px]" />

          <div className='flex flex-col gap-3 w-1/3'>
          <h1 className='font-bold text-3xl text-[#364A63]'>{product.name}</h1>
          <div className='flex list-none gap-1'>
            <li><img className='w-[23px]' src={assets.star} alt="" /></li>
            <li><img className='w-[23px]' src={assets.star} alt="" /></li>
            <li><img className='w-[23px]' src={assets.star} alt="" /></li>
            <li><img className='w-[24px]' src={assets.star_half} alt="" /></li>
            <li><img className='w-[23px]' src={assets.star_empty} alt="" /></li>
            <li className='text-[#8091A7]'>(2 Reviews)</li>
          </div>
          <div className='flex gap-2'>
            <p className='text-xl line-through text-[#8091A7]'>${Math.round(price*1.43)}</p>
            <p className='text-[#6576FF] text-2xl'>${price}</p>
          </div>
          
          <p className='text-[#8091A7]'>{product.description}</p>
          
          <div className='flex list-none gap-10'>
            <li>
              <p className='text-[#8091A7]'>Type</p>
              <p className='font-bold text-[#364A63]'>Watch</p>
            </li>
            <li>
            <p className='text-[#8091A7]'>Model</p>
            <p className='font-bold text-[#364A63]'>Forerunner 290XT</p>
            </li>
          </div>
          <div className='flex flex-col list-none gap-2'>
              <p className='font-bold text-[#364A63]'>Band Color</p>
              <p className='text-[#364A63]'>{color}</p>
              <p className='flex gap-6'>
                <li onClick={()=>{setImage(0);setColor('Purple');}} className={`cursor-pointer w-4 h-4 rounded-full bg-[#816BFF] focus:outline-none ${color === 'Purple' ? 'ring-2 ring-[#816BFF] ring-offset-2 ring-offset-white' : ''}`}></li>
                <li onClick={()=>{setImage(1);setColor('Cyan');}} className={`cursor-pointer w-4 h-4 rounded-full bg-[#1FCEC9] focus:outline-none ${color === 'Cyan' ? 'ring-2 ring-[#1FCEC9] ring-offset-2 ring-offset-white' : ''}`}></li>

                <li onClick={()=>{setImage(2);setColor('Blue');}} className={`cursor-pointer w-4 h-4 rounded-full bg-[#4B97D3] focus:outline-none ${color === 'Blue' ? 'ring-2 ring-[#4B97D3] ring-offset-2 ring-offset-white' : ''}`}></li>
                <li onClick={()=>{setImage(3);setColor('Black');}} className={`cursor-pointer w-4 h-4 rounded-full bg-[#3B4747] focus:outline-none ${color === 'Black' ? 'ring-2 ring-[#3B4747] ring-offset-2 ring-offset-white' : ''}`}></li>
              </p>
          </div>
          <h3 className='font-bold'>Wrist Size:</h3>
          <div className='flex flex-row list-none gap-2'>
          {product.price_size.map(([size, price], sizeIndex) => (
                  <li
                    onClick={() => {
                      setPrice(price);
                      setSize(size);
                      setUnitPrice(price);
                      setProductName(product.name);
                      setSizeSelect(true);
                      setSelectedSizeIndex(sizeIndex);
                    }}
                    className={`flex gap-2 border-2 justify-center items-center p-3 w-[110px] rounded-[3px] transition duration-200 ${selectedSizeIndex === sizeIndex ? 'border-[#6576FF]' : 'border-gray-300'} hover:border-[#6576FF]`}key={sizeIndex}>
                    <p className="font-bold text-[#364A63]">{size}</p>
                    <p className="text-[#8091A7]">${price}</p>
                  </li>
          ))}

          </div>

          <div className="flex items-center mt-2">
                <button
                  onClick={handleDecrement}
                  className="w-11 h-11 border-2 rounded-[4px] flex items-center justify-center hover:bg-gray-400">
                  <p className='text-[#8091A7]'>-</p>
                </button>
                <span className="flex align-center justify-center border-y-2 py-2 w-16 text-[#364A63]">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-11 h-11 border-2 rounded-[4px] flex items-center justify-center hover:bg-gray-400">
                  <p className='text-[#8091A7]'>+</p>
                </button>
                <button onClick={()=>{handleCart(image,productName,size,color,quantity,unitPrice)}} className='w-1/5 border-2 p-2 rounded ml-4 bg-[#6576FF] text-white rounded-[3px]'>Add to Cart</button>
                <img src={assets.heart} className='ml-4'  alt="" />    

                
          </div>    


          </div>
                
        </div>
        
        </div>
      
      ))}
            <div className='flex justify-center mb-2'>
            <button onClick={()=>setShowCart(true)} className='bg-[#FFBB5A] text-[#364A63] rounded-[20px] font-bold text-sm w-[120px] h-[42px]'>Checkout <span className="bg-white text-[#364A63] font-bold text-xs px-2 py-1 rounded-[5px]">{cart.length}</span></button>
            </div>
            
            <ToastContainer/>
      </div>
    
  )
}

export default App
