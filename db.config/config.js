const mongoose =  require ('mongoose')

 const connectDB = async () => {
    try {
      const conn = await mongoose.connect('mongodb://localhost:27017/TicketWeb');
      console.log(`MongoDB Connected - TicketWeb`);
    } catch (error) {
      console.log(`Error - unable to connect`);
      process.exit(1);
    }
  };

module.exports = connectDB ; 