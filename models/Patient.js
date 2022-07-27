const mongoose=require('mongoose')

const Patient=mongoose.model('Patient',{
   //id:String,
    name:String,
    healthInsuranceCardId:Number,
    address:String,
    createdAt: Date,
})

module.exports=Patient