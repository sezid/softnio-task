import React from 'react'
import { products } from '../assets/assets';

const Cart = ({ cart, setShowCart, children }) => {

    const getTotalQuantity = (cart) => {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].quantity;
      }
      return total;
    };
    

    const getTotalPrice = (cart) => {
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].quantity * cart[i].unitPrice;
      }
      return total;
    };
    

    return (


      <div className="fixed inset-0 flex items-center font-roboto justify-center bg-black bg-opacity-50 z-50 text-[14px]">
        <div className="bg-white w-[90%] w-1/2 p-6 rounded-[20px] shadow-lg relative">
          
        <button
          onClick={() => setShowCart(false)}
          className="absolute w-[40px] top-4 right-4 p-2 rounded-full hover:bg-gray-300"
        >
          X
        </button>



          {cart.length===0 ? (<h1 className="flex justify-center text-2xl font-bold text-gray-800">Cart is Empty</h1>):(
            <div className='p-5'>
              <h2 className='font-bold text-[22px] text-[#364A63]'>Your Cart</h2>
              <div className='flex list-none gap-4 grid grid-cols-[2fr_0.5fr_0.5fr_0.5fr_0.5fr] mt-5 mb-5 rounded text-left text-[#8091A7]'>
                <li font-bold>Item</li>
                <li className='text-center'>Color</li>
                <li className='text-center'>Size</li>
                <li className='text-center'>Qnt</li>
                <li className='text-right'>Price</li>
              </div>
              <hr />
              {products.map((item,index)=>(
                cart.map((product,index)=>(
                <>
                <div className='flex list-none gap-4 grid grid-cols-[2fr_0.5fr_0.5fr_0.5fr_0.5fr] mt-5 mb-5 text-[#364A63]'>
                  <li className='flex gap-4'><img className='w-[30px] rounded-[3px]' src={item.color_type[product.image][0]} alt="" /> {product.name}</li>
                  <li className='text-center'>{product.color}</li>
                  <li className='text-center font-bold'>{product.size}</li>
                  <li className='text-center font-bold'>{product.quantity}</li>
                  <li className='text-right font-bold'>${product.unitPrice}.00</li>
                  
                </div>
                <hr />
                </>
                ))
                
            ))}
            
              
              <div className='flex list-none grid grid-cols-[4fr_0.5fr_0.5fr] mt-5 text-[#364A63]'>
                  <li className='font-bold text-[20px]'>Total</li>
                  
                  <li className='font-bold text-[20px]'>{getTotalQuantity(cart)}</li>
                  <li className='font-bold text-[20px] text-right'>${getTotalPrice(cart)}.00</li>      
                 
                            
              </div>

              <div className='flex justify-end gap-8 mt-5'>
                <button onClick={()=>setShowCart(false)} className='p-3 text-[13px] w-1/5 border border-[#DBDFEA] rounded-[3px] font-bold text-[#364A63]'>Continue Shopping</button>
                <button className='w-1/6 text-white bg-[#6576FF]'>Checkout</button>
              </div>
            </div>
          )

          }
          
        </div>
      </div>
    );
}

export default Cart
