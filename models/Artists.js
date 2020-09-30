let {Schema,model}=require('mongoose')

let artistSchema = new Schema({
    
    title:{
        type:String,
        required:true,
        unique:true
    },

    genre:[{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'Genre'
    }],

    description:{
        type:String,
        default:'-'
    },

    country:[{
        type:Schema.Types.ObjectId,
        ref:'Country'
    }],

    admin:[{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'user'
    }],

    creation:{
        type:Date,
        default:Date.now
    },

    date:{
        type:Date,
        require:true,
        default:Date.now
    },

    cover:{
        type:String,
        default:""
    }
})

let artistModel=model('Artist',artistSchema)

module.exports = artistModel