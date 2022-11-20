const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const mongooseDelete = require('mongoose-delete');

const Register = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    role: { type: Number, default: '2' },
  },
  {
    timestamps: true,
  }
);

Register.post('save', function (doc, next) {
  console.log('new user was created', doc);
  next();
});
//Mã hóa mật khẩu
Register.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = await bcrypt.hash(this.password, 10);
  }
  next();
});
Register.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      } else {
        throw Error('Mật khẩu không chính xác');
      }
    } else {
      throw Error('Email không chính xác!');
    }
  } catch (e) {
    throw Error(e.message);
  }
};

Register.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Register', Register);
