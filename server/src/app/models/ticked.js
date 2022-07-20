const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Ticked = new Schema({
  movieName: { type: String, required: true },
  category: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  startAt: { type: String, required: true },
  room: { type: String, required: true },
  listSeat: { type: String, required: true },
  totalSeat: { type: Number, required: true },
  food: { type: String },
  totalPriceFood: { type: String },
  totalPrice: { type: String, required: true },
  user: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  status: { type: Number, default: '1' },
});
mongoose.plugin(slug);
Ticked.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});
module.exports = mongoose.model('Ticked', Ticked);
