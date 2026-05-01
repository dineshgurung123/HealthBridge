const express = require("express");
const dotenv = require ("dotenv");
const cors = require("cors");
const connectDB  = require('./config/db')

  const authRoutes = require('./routes/authRoutes')

dotenv.config();

const app = express()

//middleware

app.use(express.json());
app.use(cors());

//Datebase connected

connectDB();

app.use('/api/auth/', authRoutes)

//routes
app.get('/', (req, res) => {
  res.send('Hello World')
})

const PORT = process.env.PORT || 5000




app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})