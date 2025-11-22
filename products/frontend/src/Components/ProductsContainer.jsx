import ProductCard from "./ProductCard";

export default function ProductsContainer({
  products, // list of all products
  handleAddQuantity, // handlers for add and subtract quantity
  handleRemoveQuantity, 
  handleAddToCart, // to add item to cart
  productQuantity, // state for each product card
  handleEdit,  // edit product 
  handleDelete,  // delete product
}) { 
  return (
    <div className="ProductsContainer">
    
      {products.map((product) => (
        <ProductCard
          key={product.id} 
          {...product}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={
            (productQuantity.find((p) => p.id === product.id)?.quantity || 0)

          }
          // edit and delete handlers
          handleEdit={() => handleEdit(product)}
          handleDelete={() => handleDelete(product._id)}
        />
      ))}
    </div>
  );
}
