const mongoose = require('mongoose');

const connectDB = async () => {
   try {
       const uri = process.env.MONGODB_URI; // Ensure you're using the correct variable name
       if (!uri) {
           throw new Error('MongoDB connection string is undefined');
       }
       await mongoose.connect(uri); // Removed deprecated options
       console.log('MongoDB connected');
   } catch (error) {
       console.error('MongoDB connection error:', error);
       process.exit(1);
   }
};

module.exports = connectDB;
