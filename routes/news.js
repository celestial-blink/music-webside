let  express=require('express')
let router=express.Router();
let {allNews}=require('../crud/crudNews');

router.get("/",(req,res)=>{
    getDataNews(req.query).then(ress=>{
        console.log(ress,"esto voy a enviar");
        res.render("noticias",ress)
    }).catch(errr=>{
        res.send(errr);
    })
})

const getDataNews=async(object)=>{
    let news=await allNews(object);
    return {
        state:true,
        result:{
            news:news.news,
            pages:news.pages
        }
    };
}

module.exports = router
