const mongoose = require("mongoose");
const dotenv=require("dotenv");

// env config and env variables
dotenv.config();
const url = process.env.MONGO_URL;

// setting mongoose default options
mongoose.set('strictQuery', true);

const connectDatabase = async () => {
  try {
    // connection to mongoose
    await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (err) {
    // if error
    console.error("Error while connecting to the database", err);
  }
};

// const removeUniqueIndex = () => {
//     const Product = mongoose.model('Product'); 
  
//     // Remove the unique index on the "slug" field
//     Product.collection.dropIndex('slug_1', function (err, result) {
//       if (err) {
//         console.error('Error removing unique index on slug field:', err);
//       } else {
//         console.log('Unique index on slug field removed');
//       }
//     });
//   };



module.exports = connectDatabase;
