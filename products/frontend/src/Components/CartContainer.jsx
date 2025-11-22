import CartCard from "./CartCard";
export default function CartContainer({
  cartList,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
  handleClearCart,
}) {
  return (
    <div className="CartContainer">
       {/* shows how many items are incart */}
      <h2>Cart items: {cartList.length}</h2>
      {cartList.length > 0 ? (
        <>
         {/* shows all items */}
          {console.log(cartList)}
          {cartList.map((product) => (
            <CartCard
              key={product.id}
              {...product}
              handleRemoveFromCart={handleRemoveFromCart}
              handleAddQuantity={handleAddQuantity}
              handleRemoveQuantity={handleRemoveQuantity}
            />
          ))}
           {/* checkout button */}
          <div className="CartListBtns">
             {/* remove all   */}
            <button onClick={() => handleClearCart()} className="RemoveButton">
              Empty Cart
            </button>
            <button id="BuyButton">
              Checkout:{" $"}
              {cartList
                .reduce(
                  (total, item) =>
                    total +
                    parseFloat(item.price.replace("$", "")) * item.quantity,
                  0
                )
                .toFixed(2)}
            </button>
          </div>
        </>
      ) : (
        <h3>No items in cart</h3>
      )}
    </div>
  );
}
