import QuantityCounter from "./QuantityCounter";

export default function CartCard({
  id,
  image,
  productName,
  price,
  quantity,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
}) {
  return (
    <div className="CartCard">
      {/*cart item info */}
      <div className="CartCardInfo">
        <img src={image} alt="" />
        {/*  name and price of Product*/}
        <p>{productName}</p>
        <p>{price}</p>

        {/* quantity controller */}
        <QuantityCounter
          id={id}
          productQuantity={quantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          mode="cart"
        />
        {/* <h3>x {quantity}</h3> */}
      </div>

      {/* Total price and remove button */}
      <div>
        <h3>
          Total: ${(parseFloat(price.replace("$", "")) * quantity).toFixed(2)}
        </h3>
        {/* Remove this item completely from cart */}
        <button
          onClick={() => handleRemoveFromCart(id)}
          className="RemoveButton"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
