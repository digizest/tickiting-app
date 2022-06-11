const express = require('express')
const route = express.Router()
const {protect} = require('../Middleware/authMiddleware')
const {getTickets, createTicket,getTicket,getAllTickets,deleteTicket,updateTicket} = require('../controller/ticket.controller')


route.post("/createTicket",protect, createTicket);
route.get("/getTickets",protect, getTickets);
route.get("/getTicket/:id",protect, getTicket);
route.put("/updateTicket/:id",protect, updateTicket);
route.delete("/deleteTicket/:id",protect, deleteTicket);

route.get("/getAllTickets",protect,getAllTickets)
   



module.exports = route;