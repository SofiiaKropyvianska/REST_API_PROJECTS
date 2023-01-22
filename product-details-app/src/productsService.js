//import the DAO layer
//import the DAO layer
const productsDAO = require('./productsDao')

const getProducts = function(done){
  //call dao getproducts method and pass the parameter
  productsDAO.getProducts(done);
}

const getProductById = function(id, done){
  //call dao getProductById method and pass the parameter
  productsDAO.getProductById(id, done);
}
const saveProductDetails = function(productDetails, done){
  //call dao saveProductDetails method and pass the parameter
  productsDAO.saveProductDetails(productDetails, done);
}

const deleteProductById = function (productId, done) {
//call dao deleteProductById method and pass the parameter
  productsDAO.deleteProductById(productId, done);
}



module.exports = {
  getProducts, getProductById,saveProductDetails, deleteProductById
}

