// Get the config either from environment variables or pick the default
const config = {
  PORT: process.env.PORT || "4000",
  CLIENT_ID: process.env.CLIENT_ID || "f4b90f9d81c3c47c63b0",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "71da383e96600a3fde3acfd4caadc1f00227218e"  
}

module.exports = config;
