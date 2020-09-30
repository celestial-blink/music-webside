let {Schema,model}=require('mongoose');

    let vefiEmail= [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Correo inválido"];
    let veriName=[/^$|\s+/,"el usuario no debe contener espacios"]

let usersSchema= new Schema({
    name:{
        type:String,
        required:"ingrese usuario",
        unique:true,
        minlength:5,
        trim:true,
        validate:{
            validator:(n)=>{
                return !/^$|\s+/.test(n)
            },message:"no debe contener espacios en blanco"
        }
    },

    pass:{
        type:String,
        required:true,
        minlength:8
    },

    fullName:{
        type:String,
        default:"fullname"
    },

    role:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Role'
    }],

    email:{
        type:String,
        match:vefiEmail,
        required:true
    },

    state:{
        type:Boolean,
        default:true
    },
    code:{
        type:String,
        default:""
    }

})

usersSchema.virtual("Pconfirmation").get(()=>{
    return this.passC;
}).set((value)=>{
    this.passC=value
});

let userModel=model('User',usersSchema)

module.exports=userModel;