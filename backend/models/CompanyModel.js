import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let companySchema = new Schema({
    'companyName': String,
    'address': String,
    'description': String,
    'phoneNumber': Number,
    'advertisementIDs': Array, // IDs of advertisements published by this company 
    'authorizedUserIDs': Array // IDs of users who are authorized to publish advertisements of company  
});


const Company = mongoose.model('Company', companySchema);
export default Company;