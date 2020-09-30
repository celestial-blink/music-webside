let express=require('express');
let router=express();
let {insertUsers,loginGetUser,searchUserFornName,updateCode,updatePass}=require('../crud/crudUsers');
let {sendMail}=require('../crud/service/sendMail');
let nameu=require('../Globals/variables');


router.get("/",(req,res)=>{
    res.render('login')
})
let code="";
router.post('/',(req,res)=>{
    console.log(JSON.stringify(req.body));
    if(Object.entries(req.body).length!=0){
        mFunciones(req.body).then(ress=>{
            if(ress.message=="ok"){
                nameu.setuser(req.body.name);
            }
                res.send(JSON.stringify(
                    (ress.state==true)?{state:true,message:ress.message}:{state:false,message:ress.message}
                ))
        
        }).catch(errr=>{
                console.log(errr);
                res.send(JSON.stringify({
                    state:false,message:`${errr.message}`
                }));
        })
    }else{
        res.send(JSON.stringify({err:"no se recibio nada"}));
    }
});

const sendCode=async(user)=>{
    code="";
    let letters="mlp0ojin9uh8bvgy76tfc5rdxs43sewqaz1";
    for (let index = 0; index < 5; index++) {
        code+=letters.charAt(Math.floor(Math.random()*((letters.length-1)+1))+0);
    };
    let codMod={
        ...user,
        ...{code:code}
    }
    let upCod=await updateCode(codMod);
    return upCod;
}

const mFunciones=async(user)=>{
    switch (user.tyform) {
        case "form-login":
                let search=await loginGetUser({
                    name:user.name,
                    pass:user.pass
                });
                return (search==null)?{state:false,message:"error de usuarios y contraseñas"}:{state:true,message:"ok"};
        
        case "form-registration":
            if(user.pass==user.repeat && user.pass.trim()!=""){
                let insert=await insertUsers({
                    name:user.name,
                    pass:user.pass,
                    repeat:user.repeat,
                    fullname:user.fullname,
                    email:user.email
                });
                return {state:true,message:"registrado! iniciar sesion"}
            }else{
                return {state:false,message:"las contraseñas no son iguales pass"};
            }
        
            case "form-forget":
            let myForget=await stepsForget(user);
            return myForget;
        default:
            break;
    }
}

const stepsForget=async(user)=>{
    switch(user.steps){
        case "1":
            let search=await searchUserFornName(user);
            if (search!=null){
                let codeSend=await sendCode(user);
                let emailJson=(search!=null)?search.email.split("@"):"hubounerror@gmail.com".split("@");
                let dataSend={email:search.email, code:code};
                console.log(dataSend);
                let sndMail=await sendMail(dataSend);
                return {state:true,message:`se envió un código a ${emailJson[0].substr(0,4)}*******@${emailJson[1]}`};
            }else{

                return {state:false,message:"no se encontro usuario name"};
            }


        case "2":
            let searcha=await searchUserFornName(user);
            if(searcha!=null){
                if (searcha.code==user.code){
                    return {state:true,message:"codigo correcto"};
                }else{
                    return {state:false,message:"codigo incorrecto code"};
                }
            }else{
                return {state:false,message:"no se encontró usuario"};
            }
        
        case "3":
            if (user.pass==user.repeat){
                let upPas=await updatePass(user);
                return {state:true,message:"contraseña correcta"};
            }else{
                return {state:false,message:"contraseñas no coinciden pass"};
            }
        default:
            return {state:false,message:"no se encontro pasos"}
    }
}



module.exports = router