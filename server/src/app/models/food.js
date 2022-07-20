const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Food = new Schema (
    {
        name: { type: String, required: true },
        img: { type: String, required: true},
        desc: {type: String, required: true},
        price: {type: String, required: true},
        count: {type: Number, required: true},
        slug: { type: String, slug: 'name', unique: 'true' },
    },
);
mongoose.plugin(slug);
Food.plugin(mongooseDelete,{deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model("Food", Food);