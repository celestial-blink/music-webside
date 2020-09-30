let {Schema,model}=require('mongoose')

let countriesSchema=new Schema({
    name:{
        type:String,
        required:true
    },

    code:{
        type:String,
        required:true
    }
})

let countriesModel = model('Country',countriesSchema)

module.exports = countriesModel