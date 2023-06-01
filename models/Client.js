// const mongoose = require("mongoose");

// const clientSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phoneNumber: { type: String, required: true, unique: true },
//   email: { type: String },
//   address: { type: String },
//   registrationDate: { type: Date, default: Date.now },
//   children: [{ name: String, age: Number }],
//   location: { type: String },
//   phoneDetails: { type: String },
//   history: [{ type: mongoose.Schema.Types.ObjectId, ref: "EditHistory" }],
//   customFields: { type: mongoose.Schema.Types.Mixed },
//   customColumns: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "CustomColumn" },
//   ],
// });

// module.exports = mongoose.model("Client", clientSchema);

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address1: String,
  city: String,
  province: String,
  phone: String,
  zip: String,
  lastName: String,
  firstName: String,
  country: String,
});

const clientSchema = new mongoose.Schema({
  shopifyCustomerId: { type: Number, unique: true, sparse: true }, // To store Shopify's customer ID
  name: { type: String, required: true },
  firstName: String, // Separate first and last name fields
  lastName: String,
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String },
  verifiedEmail: Boolean,
  addresses: [addressSchema], // To store multiple addresses
  registrationDate: { type: Date, default: Date.now },
  children: [{ name: String, age: Number }],
  location: { type: String },
  phoneDetails: { type: String },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "EditHistory" }],
  customFields: { type: mongoose.Schema.Types.Mixed },
  customColumns: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CustomColumn" },
  ],
  source: { type: String }, // To store the source of the client (e.g., 'shopify')
});

module.exports = mongoose.model("Client", clientSchema);
