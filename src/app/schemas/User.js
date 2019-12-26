import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import authConfig from '../config/tokenConfig'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }

}, {
  timestamps: true
});

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods = {
  generateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: '1h'
    })
  },

  compareHash(password) {
    return bcrypt.compare(password, this.password)
  }
}

export default mongoose.model('User', userSchema);
