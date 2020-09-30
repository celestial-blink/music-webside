let {Schema,model}=require('mongoose')

let rolesSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
        minlength:2
    }
})

let rolesModel=model('Role',rolesSchema)

module.exports=rolesModel;