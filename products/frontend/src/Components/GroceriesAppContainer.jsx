//import allcomponents
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavBar from "./NavBar";
import ProductsContainer from "./ProductsContainer";
import ProductForms from "./ProductForms";
import CartContainer from "./CartContainer"; 


export default function GroceriesAppContainer() {

  // States
  const [cartList, setCartList] = useState([]);    //items in carts
const [productQuantity, setProductQuantity] = useState([]); //product for each counter
  const [products, setProducts] = useState([]); // productsform db
  // form values
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    price: "",
    image: "",
  });

  
  const [postResponse, setPostResponse] = useState(""); // run message
  const [isEditing, setIsEditing] = useState(false); // editing

  
  // useEffect
  useEffect(() => {
    handleProductsDB();
  });


  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  // Fetc dha from the database
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  
  // Handles fm data
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  // Handles fm submission
 const handleOnSubmit = async () => {
    try {
      if (isEditing) {
        await axios
          .patch(
            `http://localhost:3000/products/${formData._id}`,
            formData
          )
          .then((response) => {
            setPostResponse(response.data.message);
          });

        setIsEditing(false);

      } else {
        // add new products
        await axios
          .post("http://localhost:3000/add-product", formData)
          .then((response) => {
            setPostResponse(response.data.message);
          });
      }
// rsesetform
      setFormData({
        productName: "",
        brand: "",
        price: "",
        image: "",
      });

    } catch (error) {
      console.log(error.message);
    }
  };


 
  // Handling edit product
  const handleEdit = (product) => {
    setIsEditing(true);
    setFormData({
      productName: product.productName,
      brand: product.brand,
      price: product.price,
      image: product.image,
      _id: product._id,
    });
  };

  
  //product delete by id
  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3000/products/${id}`)
        .then((response) => {
          setPostResponse(response.data.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };


  
  // quantity add and subtract handlers
  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };
// add to cart
  const handleAddToCart = (productId) => {
    const product = products.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };
 // remove single item
  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };
// wmpty cart
  const handleClearCart = () => {
    setCartList([]);
  };


  
  // Render
return (
  <div>
    <NavBar quantity={cartList.length} />
  <div className="GroceriesApp-Container">

      {/* LEFT COLUMN */}
      <div className="LeftColumn">
        <ProductForms
          isEditing={isEditing}
          formData={formData}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        /> </div>

      {/* MIDDLE COLUMN */}
      <div className="MiddleColumn">
        <ProductsContainer
          products={products}
          productQuantity={productQuantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>

      {/* RIGHT COLUMN */}
      <div className="RightColumn">
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>

    </div>
  </div>
);
}