const express = require('express');
const user = require('./Models/user');
const admin = require('./Models/admin');
const certif = require('./Models/certif_etud');

require('./Config/connect');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        salt = bcrypt.genSaltSync(10);
        cryptedpass = await bcrypt.hashSync( data.password , salt);
        usr.password = cryptedpass;

        result = usr.save();
        res.status(200).send(result);
    }catch(err){
        console.status(400).log(err);
    }
})

app.delete('/deleteUser/:id' ,(req,res)=>{

    let id=req.params.id

    user.findByIdAndDelete({_id: id})
        .then(
            (userdelete)=>{
                res.status(200).send(userdelete)
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})


app.post('/addadmin', async (req, res) => {
    try {
        data = req.body;
        adm = new admin(data);

         salt = bcrypt.genSaltSync(10);
         cryptedpass = await bcrypt.hashSync(data.password, salt);
        adm.password = cryptedpass;

        result = await adm.save();
        res.status(200).send(result);
    } catch (err) {
        console.status(400).log(err);

    }
});

app.delete('/deleteAdmin/:id' ,(req,res)=>{

    let id=req.params.id

    admin.findByIdAndDelete({_id: id})
        .then(
            (admindelete)=>{
                res.status(200).send(admindelete)
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
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

app.get('/getallcertifictes',(req,res)=>{
    certif.find()
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

app.get('/getbyid/:id' , (req , res)=>{

    myid = req.params.id

    user.findOne({_id: myid })
    .then(
        (user)=>{
            res.send(user)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
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
        const email = data.email;
        const password = data.password;

        // Recherchez à la fois dans la collection 'user' et 'admin'
        const userResult = await user.findOne({ email: email });
        const adminResult = await admin.findOne({ email: email });

        if (!userResult && !adminResult) {
            console.log('User not found');
            res.status(404).send('Email or password invalid!');
        } else {
            let isValidUser = false;

            if (userResult) {
                isValidUser = bcrypt.compareSync(password, userResult.password);
            }

            let isValidAdmin = false;

            if (adminResult) {
                isValidAdmin = bcrypt.compareSync(password, adminResult.password);
            }

            if (isValidUser || isValidAdmin) {
                let payload;

                if (isValidUser) {
                    payload = {
                        _id: userResult.id,
                        firstname: userResult.firstname,
                        lastname: userResult.lastname,
                        email: userResult.email,
                        role: 'user'
                    };
                } else {
                    payload = {
                        _id: adminResult.id,
                        firstname: adminResult.firstname,
                        lastname: adminResult.lastname,
                        email: adminResult.email,
                        role: 'admin'
                    };
                }

                const token = jwt.sign(payload, '20960018');
                console.log('Token generated:', token);
                res.status(200).send({ mytoken: token });
            } else {
                console.log('Invalid password');
                res.status(404).send('Email or password invalid!');
            }
        }
    } catch (error) {
        console.error('Error in /login:', error);
        res.status(500).send('Internal Server Error');
    }
});





/*app.post('/login', (req,res) => {

    let userFound;

    user.findOne({email: req.body.email})
        .then(userResult => {
            if(!userResult){
                return res.status(401).json({
                    message: 'User not found'
                })
            }
            userFound = userResult
            return bcrypt.compare(req.body.password, userResult.password)
        })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message: 'Password is incorrect'
            })
        }

        const token = jwt.sign({email: userFound.email, userId: userFound._id}, "secret_string", {expiresIn:"1h"})
        return res.status(200).json({
            token: token
        })
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Error with authentication'
        })
    })
})*/







  app.post('/addcertifetud',async(req,res)=>{
    data = req.body;
    cert = new certif(data);
    cert.save()
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

app.delete('/deleteCertifEtud/:id' ,(req,res)=>{

    let id=req.params.id

    certif.findByIdAndDelete({_id: id})
        .then(
            (certifdelete)=>{
                res.status(200).send(certifdelete)
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})



app.listen(3000,()=>{
    console.log('hello kouki');
})