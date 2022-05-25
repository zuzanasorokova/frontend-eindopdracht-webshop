import {createContext, useState} from 'react';



export const ShoppingCartContext = createContext();

function ShoppingCartProvider({children}){
  const [cart, setCart] = useState([]);
  const [itemPrice3, setItemPrice3] = useState(null);
  const [itemPrice5, setItemPrice5] = useState(null);
    const [itemPrice10, setItemPrice10] = useState(null);



  function addToCart(product, statePackage) {
      if(statePackage === `${product.priceThreeSeeds}`){
          setItemPrice3(product.priceThreeSeeds)
      } else if (statePackage === `${product.priceFiveSeeds}`){
          setItemPrice5(product.priceFiveSeeds)
      } else if (statePackage === `${product.priceTenSeeds}`){
          setItemPrice10(product.priceTenSeeds)
      }


      const inCartItem = cart.find(item => item.id === product.id && (itemPrice3 === product.priceThreeSeeds || itemPrice5 === product.priceFiveSeeds || itemPrice10 === product.priceTenSeeds))

      if(inCartItem){
          setCart(cart.map(item => item.id  === product.id && (itemPrice3 === product.priceThreeSeeds || itemPrice5 === product.priceFiveSeeds || itemPrice10 === product.priceTenSeeds)
          ? {...inCartItem, qty: inCartItem.qty +1} : item));

      }else{
          setCart([...cart, {...product, qty: 1}])
      }
  }



  const data = {
      itemPrice3: itemPrice3,
      itemPrice5: itemPrice5,
      itemPrice10: itemPrice10,
      cart: cart,
      addItemToCart: addToCart,
      //removeFromCart: removeFromCart,
  }



    return (
        <div>
            <ShoppingCartContext.Provider value={data}>
                {children}
            </ShoppingCartContext.Provider>

        </div>
    );
};

export default ShoppingCartProvider;