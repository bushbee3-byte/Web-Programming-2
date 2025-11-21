export default function QuantityCounter({
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  id,
  mode,
}) {
  return (
    <div className="ProductQuantityDiv">
      {/* button to reduce quantity */}
      <div>
        <button onClick={() => handleRemoveQuantity(id, mode)}>-</button>
      </div>
        {/* display current quantity */}
      <p>{productQuantity}</p>
        {/* button to increase quantity */}
      <div>
        <button onClick={() => handleAddQuantity(id, mode)}>+</button>
      </div>
    </div>
  );
}
