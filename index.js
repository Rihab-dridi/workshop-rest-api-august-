const express=require('express');
const app=express()
const connectDB=require('./config/connectDB')
connectDB()

app.use(express.json())

app.use('/api/contact',require('./routes/contact'))

const port =5000
app.listen(port,(err)=>{
try {
    console.log(`the server is running on${port}... `)
} catch (err) {
    console.log(err);
}
})