// const express = require("express");
// const morgan = require("morgan");
// const mongoose = require ("mongoose");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// const uploadRoutes = require("./routes/upload");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// app.use("/api/upload", uploadRoutes);

// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// // Connect to MongoDB
// mongoose
// .connect(process.env.MONGO_URI)
// .then(() => {
// console.log("Connected to MongoDB");
// })
// .catch((err) => {
// console.error("MongoDB connection error:", err.message)
// });

// // Test route



// app.get("/", (req, res) => {
//     res.send("Server is running!")
// });






// //app.get("/", (req,res) => {
// //res.srnd("server is runing")

// //});

// app.listen(PORT, () =>{ 
//     console.log(`servse runing on http://localhost:${PORT}`);
// })




const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const uploadRoutes = require("./routes/upload");

const app = express();
const PORT = process.env.PORT || 5000;

// 🟢 Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 🟢 Routes
app.use("/api/upload", uploadRoutes);

// 🟢 Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 🟢 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// 🟢 Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// 🟢 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
