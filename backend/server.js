const express = require('express');
const user = require('./user');
const admin = require('./admin');
const certificate = require('./certificate');
require('../backend/connect');
const cors = require('cors');
app = express()

app.use(express.json())
app.use(cors());
app.get('/get',()=>{
    console.log('get received');
})

app.post('/adduser',async (req,res)=>{
    try{
        data = req.body ;
        usr = new user(data);
        result = await usr.save();
        res.send(result);
    }catch(err){
        console.log(err);
    }
})

app.post('/addadmin', async (req,res)=>{
    try{
        data = req.body ;
        adm = new admin(data);
        res1 = await adm.save();
        res.send(res1);
    }catch(err){
        res.send(err);
    }
})

app.post('/addcertificate',async(req,res)=>{
    data = req.body;
    adm = new certificate(data);
    adm.save()
        .then(
            (res1)=>{
                res.send(res1)
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})

app.put('/editcertif',async(req,res)=>{
    try{
        data = req.body ;
        id = data['id'];
        request1 = data['state'];
        console.log(data);
        res12 = await certificate.findByIdAndUpdate({_id:id} ,{state:request1})
        res.send(res12);
    }catch(err){
        res.send(err);
    }
})

app.post('/verifyuser',(req,res)=>{
    data = req.body;
    console.log(data);
    email = data['email'];
    password = data['password'];
    user.findOne({email:email , password:password})
        .then(
            (resultat)=>{
                if (resultat)
                {
                    console.log(resultat);
                    res.send(true);
                }else{
                    res.send(false);
                }
            }
        )
        .catch(
            (err)=>{
                console.log(err);
                res.send(err);
            }
        )
})

app.get('/getallcertifictaes',(req,res)=>{
    certificate.find()
        .then(
            (resultat)=>{
                res.send(resultat);
            }
        ).catch(
            (err)=>{
                res.send(err);
            }
        )
})

app.get('/getallusers',(req,res)=>{
    user.find()
        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})

app.get('/getalladmins',(req,res)=>{
    admin.find()
        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})

app.post('/login', async (req, res) => {
    try {
        const data = req.body;
        const email = data['email'];
        const password = data['password'];

        const userResult = await user.findOne({ email: email, password: password });
        if (userResult) {
            res.json("user");
        } else {
            const adminResult = await admin.findOne({ email: email, password: password });
            if (adminResult) {
                res.json("admin");
            } else {
                res.send(false);
            }
        }
    } catch (err) {
        res.send(err);
    }
});



app.listen(3000,()=>{
    console.log('hello motmot');
})