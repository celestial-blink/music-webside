let {Schema,model}=require('mongoose')

let albumsSchema=new Schema({
    artist:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Artist'
    }],

    title:{
        type:String,
        minlength:2,
        unique:true
    },

    music:{
        type:Array,
        required:true
    },

    genre:[{
        type:Schema.Types.ObjectId,
        ref:'Genre'
    }],

    date:{
        type:Date,
        default:Date.now
    },

    cover:{
        type:String,
        default:""
    },

    admin:[{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }],

    links:{
        type:Array,
        default:[]
    }
})

let albumsModel=model('Album',albumsSchema)

module.exports=albumsModel