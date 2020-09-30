let {Schema,model}=require('mongoose')

let genresSchema=new Schema({
    name:{
        type:String,
        required:true
    }
})

let genresModel= model('Genre',genresSchema)

module.exports=genresModel