import React from "react";
 
export default function ProductForm({
  isEditing,
  formData,
  handleOnChange,
  handleOnSubmit,
  register,
  handleSubmit,
  errors,
}) {
  return (
    <div className="product-form">
       {/* form */}
      <form onSubmit={handleSubmit(handleOnSubmit)}>

          {/* product name */}
       <div>
          <input
            type="text"
            name="productName"
            {  // if isEditing is true, then dont register the input fields
              ...(isEditing
              ? {}
              : register("productName", {
                  required: "Product name is required",
                  pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message: "Product name should be letters/numbers only",
                  },
                }))}
            value={formData.productName}
            onChange={handleOnChange}
            placeholder="Product Name"
          />
          {errors.productName && (
            <span style={{ color: "red" }}>{errors.productName.message}</span>
          )}
        </div>
 
         {/* brand */}
        <div>
          <input
            type="text"
            name="brand"
            {...(isEditing
              ? {}
              : register("brand", {
                  required: "Brand is required",
                }))}
            value={formData.brand}
            onChange={handleOnChange}
            placeholder="Brand"
          />
          {errors.brand && (
            <span style={{ color: "red" }}>{errors.brand.message}</span>
          )}
        </div>
 
    {/* price */}
        
        <div>
          <input
            type="text"
            name="price"
            {...(isEditing
              ? {}
              : register("price", {
                  required: "Price is required",
                  pattern: {
                    
                    value: /^\$?\d+(\.\d{1,2})?$/,
                    message: "Price should be like 3.65 or $3.65",
                  },
                }))}
            value={formData.price}
            onChange={handleOnChange}
            placeholder="Price"
          />
          {errors.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </div>
 
        {/* image */}
        <div>
          <input
            type="text"
            name="image"
            {...(isEditing
              ? {}
              : register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                    message: "Invalid URL",
                  },
                }))}
            value={formData.image}
            onChange={handleOnChange}
            placeholder="Image URL"
          />
          {errors.image && (
            <span style={{ color: "red" }}>{errors.image.message}</span>
          )}
        </div>


         {/* submit */}
          <button type="submit">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
 