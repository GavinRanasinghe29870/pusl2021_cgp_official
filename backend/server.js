const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json())

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});
const connection = mongoose.connection
connection.once("open", ()=> {
    console.log("Mongodb Connection success!");
})

const authRoutes = require("./routes/sportPeople/authRoutes")
const productRoutes = require("./routes/sportPeople/productRoutes"); 

const jwt = require('jsonwebtoken')

const token = jwt.sign({ userId: "12345" }, process.env.JWT_SECRET, { expiresIn: "1h" })

console.log("Generated Token:",token)


//Link Signin Authentication Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



