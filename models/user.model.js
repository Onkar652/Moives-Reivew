import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 50
  },

  email: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    trim: true,
    minLength: 10,
    maxLength: 255,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
  }, 

  password: {
    type: String,
    required: [true, 'User password is required'],
    minLength: 6,
    maxLength: 255, 
  }
}, { timestamps: true });  

const User = mongoose.model('User', UserSchema);

export default User;
