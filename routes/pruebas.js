let express=require("express")
let router=express.Router()
let {sendMail}=require('../crud/service/sendMail');

router.get("/",(req,res,next)=>{

    sendMail({code:99999,email:"kkrakenbreaker@gmail.com"}).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    res.render("prueba",{holis:['takeshi','lenny','adelaida','huallpa','pari']
,per:{exite:true,person:["takeshi","lenny","te voy a esperar","porque te amo"]}
});

    

})

module.exports=router;