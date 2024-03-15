const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const bcrypt = require('bcryptjs')
const app = express();
require('dotenv').config();

//Setting Up MiddleWares
app.use(express.json());
app.use(cors({
   origin: 'http://localhost:5173',
   credentials:true
}))
//Establishing Connnection To MongoDB
mongoose.connect('mongodb+srv://johnwambugu236:MPbBH2nE4FoebhLY@cluster0.a4bysmk.mongodb.net/',{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
   console.log('Connected Successfully to MongoDB')
   app.listen(3770, () => console.log('Server Runing on port 3770'))
}).catch((e) => console.log(e));

const User = require('./Models/User');
app.post('/register', async (req, res) => {
   const {name,setPassword,email,phone } = req.body;
   try { 
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.json('User already exists')
      } else {
         const hashPassword = bcrypt.hashSync(setPassword, 10);
         const newUser = await User.create({
            name,
            email,
            phone,
             password: hashPassword
         })
         if (newUser) {
           res.json(newUser)
         } else {
            res.status(500).json('Failed to create a user')
         }
      }
   } catch (e) {
      res.json(e)
   }
})
app.post('/login', async (req, res) => {
   const { email, setPassword } = req.body;
   try {
      const findUser = await User.findOne({ email });
      if (!findUser) {
         return res.json('User doesnt Exist');
      } else {
           const checkPassword = bcrypt.compareSync(setPassword, findUser.password);
         if (checkPassword) {
               return res.json(findUser)
         } else {
            return res.json('Password do not Match')
            }
         }
      } catch (e) {
      return res.json(e)
    }
})
//Importing the Cart Model
const Cart = require('./Models/Cart')
app.post('/cart-data', async (req, res) => {
   const { total, products } = req.body;
   try {
      const productData = await Cart.create({
         products,
         total
      })
      if (productData) {
         return res.json(productData)
      } else {
         res.json('Failed to save to MongoDB')
      }
   } catch (error) {
     return res.json(error)
   }
})
