const { reject } = require("lodash")

const getRequestData = (req) => {
 // Write logic here to read the request body data
    return new Product((resolve, reject) => {
        try{
            let body = ""
            req.on('data', (chunk)=>{
                body += chunk.toString() });
            req.on('end', ()=>{
                resolve(body) });
        }
        catch(error) {
            reject(error)
        }
    });
}

module.exports = getRequestData