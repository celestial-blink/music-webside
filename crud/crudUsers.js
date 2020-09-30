let {myConnection}=require("../conection/conectionMongo");
let Users=require("../models/Users");
let Roles=require("../models/Roles");

myConnection.then((res)=>{
    console.log('conectado a la base de datos')
}).catch((err)=>{
    console.log(err)
})

const insertUsers=async(user)=>{
    let passConfirmation = false;
    passConfirmation=(user.pass==user.repeat)?true:false;
    if (passConfirmation){
        let idRole=await Roles.findOne({name:"Admin"});
        let saveUser=new Users({
            name:user.name,
            pass:user.pass,
            fullName:user.fullname,
            role:idRole._id,
            email:user.email,
            state:true
        });
        return await saveUser.save()
    }else{
        return {message:"las contraseñas no son iguales"}
    }
}

const searchUser=async(user)=>{
    let resUser=await Users.findOne({
        $or:[
            {name:new RegExp(`^${user.name}`)},
            {name:new RegExp(`${user.name}$`)}
        ]
    });

    return resUser;
}

const searchUserFornName=async(user)=>{
    let resUser=await Users.findOne({
        name:user.name
    });
    return resUser;
}

const loginGetUser=async(user)=>{
    let resUser=await Users.findOne(
        {$and:[
            {name:{$eq:user.name}},{pass:{$eq:user.pass}}
        ]}
        );
    return resUser;
}

const allUser=async()=>{
    let resUser=await Users.findOne({});

    return resUser;
}

const updateCode=async(user)=>{
    let idUser= await Users.findOne({name:user.name});
    let updatePass=await Users.updateOne(
        {_id:idUser._id},{
            $set:{
                code:user.code
            }
        }
        );
    return updatePass;
}

const updatePass=async(user)=>{
        let idUser= await Users.findOne({name:user.name});
        let updatePass=await Users.updateOne(
            {_id:idUser._id},{
                $set:{
                    pass:user.pass
                }
            }
            );
        return updatePass;
}

const updateUser=async(user)=>{
    let confirmationPass=user.pass==user.repeat;

    if(confirmationPass){
        let idUser=await Users.findOne({
            name:user.oldname
        });
    
        let updateUser=await Users.updateOne(
            {_id:idUser._id},
                {
                    $set:{
                        name:user.name,
                        pass:user.pass,
                        fullName:user.fullname,
                        email:user.email
                    }
                }
        )
        return updateUser;
    }else{

        return "las contraseñas no son iguales name";
    }


}

let na={
    name:"takeshi",
    pass:"blanquita97",
    repeat:"blanquita97",
    fullname:"modificado",
    email:"celestial-modificado@outlook.com"
}

module.exports = {insertUsers,searchUser,loginGetUser,allUser,updateUser,searchUserFornName,updateCode,updatePass};