'use strict'

const adminController = require('../controllers/AdminController');
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticate')

api.post('/registerAdmin', adminController.registerAdmin);
api.post('/loginAdmin', adminController.loginAdmin);
api.post('/registerClient', adminController.registerClient)
api.get('/getClients/:type/:filter', adminController.getClients)
api.get('/getClientById/:id', adminController.getClientById)
api.put('/updateClient/:id', adminController.updateClient)
api.delete('/deleteClient/:id', adminController.deleteClient)

module.exports =  api;