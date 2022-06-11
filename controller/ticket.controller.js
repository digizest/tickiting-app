const User = require("../model/user.model");
const Ticket = require("../model/ticket.model");




//@desc     Create new ticket
//@route    POST /ticket/createTicket
//@access   Private

const createTicket = async (req, res) => {
    const { Query, description } = req.body;

    if (!Query || !description) {
        res.status(400);
        throw new Error("Please add a Query and description");
    }

    //get user using the id in the JWT

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.create({
        Query,
        description,
        user: req.user.id,
        status: "new",
    });
    console.log("aagya", ticket);
    res.status(201).json(ticket);
};


//@desc  Get All Tickets
//@route GET  /ticket/getgetAllTickets
const getAllTickets = async (req, res) => {
    //  let page = req.query.pageno - 1 || 0
    //  let limit  = req.query.limit ||  10
    //  let skip = page * limit
    // limit(limit).skip(skip)

    await Ticket.find().then((data) => {
        return res.status(200).json({ total: data.length, result: data, msg: "Aagyaaaaaa" })
    })
        .catch((err) => {

            return res.status(400).json({ err: err, msg: "ni Aayaaaaaa" })

        })
};




//@desc     Get user tickets
//@route    GET  /ticket/getTickets
//@access   Private
const getTickets = async (req, res) => {
    //get user using the id in the JWT

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json({ tickets });
};

//@desc     Get user ticket
//@route    GET /tickets/getTicket/:id
//@access   Private
const getTicket = async (req, res) => {
    //get user using the id in the JWT

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not Authorized");
    }

    res.status(200).json(ticket);
};


//@desc     delete ticket
//@route    DELETE /ticket/deleteTicket/:id
//@access   Private
const deleteTicket = async (req, res) => {
    //get user using the id in the JWT

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not Authorized");
    }

    await ticket.remove();

    res.status(200).json({ success: true });
};

//@desc     update ticket
//@route    PUT  /ticket/updateTicket/:id
//@access   Private
const updateTicket = async (req, res) => {
    //get user using the id in the JWT

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not Authorized");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTicket);
};

module.exports = {
    getTickets,
    getTicket,
    getAllTickets,
    createTicket,
    deleteTicket,
    updateTicket,
};
