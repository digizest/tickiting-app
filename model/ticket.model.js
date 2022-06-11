const mongoose = require("mongoose");
// const mongooseSerial = require('mongoose-serial')
// const uuid = require('uuidv4')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    Query: {
        type: String,
        required: [true, "Please select a Querry"],
        // enum: [],
    },
    description: {
        type: String,
        required: [true, "Please enter a description of the issue"],
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "open", "closed"],
        default: "new",
    }
},
{
    timestamps: true,
}
);

let Ticket = mongoose.model('ticket', ticketSchema);
// ticketSchema.plugin(mongooseSerial, { field: "ticketNumber", prefix: "TicketNo.", initCount: "monthly", seperator: "-", digits: 7 });

module.exports = Ticket
