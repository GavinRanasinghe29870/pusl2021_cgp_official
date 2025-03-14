const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


//Load environment variables
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}));

const PORT = process.env.PORT || 5000;
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
const auth = require("./routes/admin/auth");

const jwt = require('jsonwebtoken')

const token = jwt.sign({ userId: "12345" }, process.env.JWT_SECRET, { expiresIn: "1h" })

console.log("Generated Token:",token)


//Link Signin Authentication Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', auth);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



