//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT  = process.env.PORT || 5000

const productsService = require("./productsService");
const getRequestData = require('./utils');
const products =  require("./products").products;

const server = http.createServer(async (req, res) => {

  if (req.url === "/api/v1/products" && req.method === 'GET') {
    res.writeHead (200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(products));
  }
  else if (req.url === "/api/v1/products" && req.method === 'POST') {
    let req_body = await getRequestData(req);
    products.push(JSON.parse(req_body));
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(JSON.parse(req_body)));
  }
  else if (req.url.match(/\api\/v1\/products\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[4];
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json"});
      res.end('No product with id present');
    }
    // else {
      // let req_body = await getRequestData(req);
      // products.push(JSON.parse(req_body));
      // res.writeHead(200, { "Content-Type": "application/json"});
      // res.end(JSON.stringify(JSON.parse(req_body)));
      // let product = productsList.find(p => p.id ===  parseInt(productId));

    else {
      let updateData = await getRequestData(req);
      if (updateData) {
        product.name = updateData.name;
        product.description = updateData.description;
        product.price = updateData.price;
        // update the product list
        product.quantity = updateData.quantity;
        res.writeHead(200, { "Content-Type": "application/json"});
        res.end(JSON.stringify(JSON.parse(req_body)));
      }
      else {
        res.end("Invalid arguments");
      }
    }
  }
  else if (req.url.match(/\api\/v1\/products\/([0-9]+)/) && req.method === "DELETE") {
      id = req.url.split("/")[4];
      const product = products.find(p => p.id === parseInt(id));

      if (!product) {
        res.writeHead(404, { "Content-Type": "application/json"});
        res.end('No product with id present');
      }
      else {
        const index = products.indexOf(product);
        products.splice(index, 1);
        res.writeHead(200, { "Content-Type": "application/json"});
        res.end(JSON.stringify('Deleted'));
      }

  }


  // Get all products

  // Get a product with specified id

  // Create a new product

  // Update a specific product

  // Delete a specific Product

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);

  server.on('error', (error)=>{
    if(error.code == 'EADRINUSE') {
      console.log('Port already in use')
    }
  })
})