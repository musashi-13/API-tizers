import mongoose from 'mongoose';

const eventDetailsSchema = new mongoose.Schema({
   userName: {
      type: String,
      required: true,
      unique: true
   },
   firstName: {
      type: String,
      required: false
   },
   lastName: {
      type: String,
      required: false
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
   },
   phoneNumber: {
      type: String,
   },
   isVerified: {
      type: Boolean,
      default: false,
      required: true
   },
   gender: {
      type: String,
      default: ""
   },
   profilePic: {
      type: String,
      default: ""
   },
});

export default mongoose.models.eventDetails || mongoose.model("eventDetails", eventDetailsSchema, "eventDetails");