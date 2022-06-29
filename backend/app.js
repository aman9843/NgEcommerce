const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./models')
const userRoutes = require('./routes/userRoutes')
const categoriesRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const {notFound,errorHandler} = require('./middleware/errorHandler');


// port 

const port = process.env.PORT || 5000;
const app = express()




// Use Middlewares

app.use(express.json())
app.use(cors())
app.use('/api/users',userRoutes)
app.use('/api',categoriesRoutes)
app.use('/api',productRoutes)
app.use(notFound);
app.use(errorHandler);
dotenv.config({path:'./config/config.env'})


app.get('/',(req,res) => {
    res.send("Your App is running")
})





// sequelize connect 

db.sequelize.sync({alter:true}).then(() => {
    app.listen(port,() => {
        console.log(`Your app is running at http://localhost:${port}`);
        console.log('Your database Connected');
    })
}).catch((err) => {
    console.log(err)
})




