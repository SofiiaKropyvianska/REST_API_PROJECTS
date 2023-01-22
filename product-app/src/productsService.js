// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products").products;
const getRequestData = require("./utils");


const getProducts = () => {
  // get all products
 return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  // get a product by ID
  let product = productsList.find(p => p.id === productId);
  if (!product) {
    done("Requested product doesn't exist..!", null);
  }

  return done(null, JSON.stringify(product));
}

const saveProduct = (newProduct, done) => {
  let productExist = productsList.find(p => p.id ===  parseInt(newProduct.id));
  if (!productExist) {
    productsList.push(newProduct);
    return done(null, JSON.stringify(productsList));
  }
  return done("Product already exists..!", null);
}

const updateProduct = (productId, updateData, done) => {
  let product = productsList.find(p => p.id ===  parseInt(productId));
  
  if (!product) {
    done("Requested product doesn't exist..!", null);
  }
  else {
    product.name = updateData.name;
    product.description = updateData.description;
    product.price = updateData.price;
    // update the product list
    product.quantity = updateData.quantity;
    
    let updatedProductList = getProducts();
    done(null, updatedProductList);
  }
}

const deleteProduct = (productId, done) => {
  // delete a product    
  let product = productsList.find(p => p.id ===  parseInt(productId));
  
  if (!product) {
    done("Requested product doesn't exist..!", null);
  }
  else {
    const index = productsList.indexOf(product);
    productsList.splice(index, 1);
    done(null, JSON.stringify(productsList));
  }
}

module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}
