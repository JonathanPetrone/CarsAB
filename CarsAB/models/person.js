const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Person Schema
const CustomersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
	city: String,
	street: String,
	license_plate: String
}, { collection: 'customers' });

// Create model
const Customer = mongoose.model('customers', CustomersSchema);

module.exports = Customer;