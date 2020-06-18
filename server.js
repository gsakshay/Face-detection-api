const express = require('express');
const bodyParser=require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors=require('cors');//access
const knex=require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');
/*const imageurl=require('./controllers/image');*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db=knex({
 	client: 'pg',
  	connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true,
  }
});                        //DATABASE_URL

/*db.select('*').from('users').then(data=>{
	console.log(data);
});*/

const app=express();



app.use(cors())
app.use(bodyParser.json());


app.get('/',(req,res)=>{
	res.send("it's working");
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

/*app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})*/


app.listen(process.env.PORT || 3000,()=>{
	console.log(`App is running on port ${process.env.PORT}`);
})