import mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema({

   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
   }
});

export default mongoose.models.userDetails || mongoose.model("userDetails", userDetailsSchema, "userDetails");