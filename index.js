const http = require("http");
const app = require("./src/app");
const mongo = require("mongoose");
const { mongoURI, port } = require("./src/config/config");

const server = http.createServer(app);

// Connect to MongoDB
mongo
  .connect(mongoURI)
  .then(() => {
    console.log("✅ connected to the mongo-db");
    server.listen(port, () =>
      console.log(`server is running at http://localhost:${port}`)
    );
  })
  .catch((err) => console.log("🚨 server error 👉", err));
