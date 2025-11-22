import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleEdit,
 handleDelete,
  id,
  
}) {
  return (
    <div className="ProductCard">
      {/* shows main info */}
      <h3>{productName}</h3>
      <img src={image} alt="" />
      <h4>{brand}</h4>
      {/* <div className="ProductQuantityDiv">
        <div onClick={() => handleRemoveQuantity(id)} className="QuantityBtn">
          <p>➖</p>
        </div>

        <p>{productQuantity}</p>
        <div onClick={() => handleAddQuantity(id)} className="QuantityBtn">
          <p>➕</p>
        </div>
      </div> */}
      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="product"
      />
      {/* shows price */}
      <h3>{price}</h3>

      {/* buttonof  cart, editing and deleting */} 
      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      {/* Edit  product's info  */} 
      <button onClick={() => handleEdit(id)}>Edit</button>
      {/* Delete   product fromlist  */} 
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}
