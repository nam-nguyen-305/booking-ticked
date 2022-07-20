const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Employee = new Schema (
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        gender: { type: Number,default: '1'},
        age: { type: Number, required: true },
        phone: { type: Number, required: true, unique: true },
        role: {type: Number, default: '1'},
        status: { type: Number, default: '1'},
        address: { type: String, required: true},
        cardId: { type: Number, required: true},
        slug: { type: String, slug: 'fullname', unique: 'true' },
    },
);
mongoose.plugin(slug);
Employee.plugin(mongooseDelete,{deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model("Employee", Employee);