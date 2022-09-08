'use strict'

const Admin = require('../models/admin');
const Client = require('../models/client')
const bcrypt = require('bcrypt-nodejs'); //Se va a encriptar la contraseña
const jwt = require('../helpers/jwt');

const registerAdmin = async function(req, res){
    const data = req.body;
    var adminArray = [];

    adminArray = await Admin.find({email : data.email})

    if (adminArray.length == 0) { /* Validando si existe un correo igual al que se va a ingresar */
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function(err, hash){
                if (hash) {
                    data.password = hash
                    const reg = await Admin.create(data);
                    res.status(200).send({
                        data : reg,
                        message : "Admin creado correctamente!"
                    })
                }else{
                    res.status(500).send({message: 'Error Server', data: undefined})
                }
            });
        }else{
            res.status(400).send({message: 'Necesitas agregar una contraseña', data: undefined})
        }
        
    }else{
        res.status(400).send({message: 'Correo electronico ya existente, prueba con otro', data: undefined})
    }
}

const loginAdmin = async function(req, res){
    const data = req.body;
    var adminArray = [];
    
    adminArray = await Admin.find({email: data.email});

    if (adminArray.length == 0) {
        res.status(401).send({message: 'El correo electronico no coincide', dataLogin: undefined})
    }else{
        const user = adminArray[0];
        bcrypt.compare(data.password, user.password, async function(err, check){
            if (check) {
                res.status(200).send({
                    data : user,
                    token : jwt.createToken(user)
                });
            }else{
                res.status(401).send({message: 'La contraseña no coincide'});
            }
        });
    }
}

const registerClient = async function(req, res){
    /* if (req.user) {
        if (req.user.rol == 'Admin') { */
            const data = req.body;

            const reg = await Client.create(data)
            res.status(200).send({
                data : reg,
                message : 'Cliente registrado'
            })
       /*  }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    } */
}

const getClients = async function(req, res){
    /* if (req.user) {
        if (req.user.rol == 'Admin') { */
        
        let type = req.params['type'];
        let filter =  req.params['filter'];

                if (type ==  null || filter == 'null') {
                    const clients = await Client.find();
                    res.status(200).send({data: clients})
                }else {
                    if(type == 'name'){
                        let reg = await Client.find({name: new RegExp(filter, 'i')})
                        res.status(200).send({data: reg})
                    } else if(type == 'email'){
                        let reg = await Client.find({email: new RegExp(filter, 'i')})
                            res.status(200).send({data: reg})
                    }
                }


   /*  }else{
        res.status(500).send({message : 'No access'})
    }
}else{
    res.status(500).send({message : 'No access'})
} */
}

const getClientById = async function(req, res){
    /* if (req.user) {
        if (req.user.rol == 'Admin') { */
            var id = req.params['id']
            try {
                var reg = await Client.findById({_id : id})
                res.status(200).send({data : reg});
            } catch (error) {
                res.status(400).send({data : undefined});
            }

        /* }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    } */
}

const updateClient = async function(req, res){
    /* if (req.user) {
        if (req.user.rol == 'Admin') { */

        var id = req.params['id'];
        var data = req.body;

        const reg = await Client.findByIdAndUpdate({_id : id}, 
            {
                name : data.name,
                lastName : data.lastName,
                gender : data.gender,
                dateOfBirth : data.dateOfBirth,
                phone : data.phone,
                email : data.email,
                address : data.address,
                zip : data.zip
            });

            res.status(200).send({
                data : reg,
                message : 'Cliente actualizado correcatmente!'
            })

        /* }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    } */
}

const deleteClient = async function (req, res) {
    /* if (req.user) {
        if (req.user.rol == 'Admin') { */
            var id = req.params['id'];

            let reg = await Client.findByIdAndRemove({_id : id});
            res.status(200).send({
                data :undefined,
                message : "Cliente eliminado correctamente!"
            })
        /* }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    } */
}

const payments = async function (req, res) {
    /* if (req.user) {
        if (req.user.rol == 'Admin') { */
        var id = req.params['id'];
        var data = req.body;

        const reg = await Client.findByIdAndUpdate({_id : id}, 
            {
                membershipPlan : data.membershipPlan,
                amount : data.amount,
                
            });

            res.status(200).send({
                data : reg,
                message : 'Cliente actualizado correcatmente!'
            })
        /* }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    } */
}

module.exports = {
    registerAdmin,
    loginAdmin,
    registerClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
    payments
}