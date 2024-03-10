const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
     name:{
        type: String,
        required: true
     },
     email:{
        type: String,
        required: true
     },
     mobile:{
        type: Number,
        required: true
     },
     dob:{
      type: Date,
      required: true
   },
   workExp:{
      type: String,
      required: true
   },
   resumeTitle:{
      type: String,
      required: true
   },
   currentLocation:{
      type: String,
     
   },
   postalAddress:{
      type: String,
      
   },
   currentEmployer:{
      type: String,
      
   },
   currentDesignation:{
      type: String,
      
   }
});

module.exports= mongoose.model('User', userSchema)