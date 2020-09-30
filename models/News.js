let {Schema,model}=require('mongoose')

let newsSchema = new Schema({
    title:{
        type:String,
        required:true,
        minlength:2
    },

    description:{
        type:String,
        required:true,
        minlength:2
    },

    cover:{
        type:String,
        default:""
    },

    admin:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }],

    link:{
        type:String,
        required:true,
        default:""
    },

    date:{
        type:Date,
        default:Date.now
    },

    artist:[{
        type:Schema.Types.ObjectId,
        ref:'Artist',
        default:[]
    }]
})

let newsModel=model('News',newsSchema)

module.exports = newsModel