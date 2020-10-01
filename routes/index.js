var express = require('express');
var router = express.Router();
let {topAlbums}=require('../crud/crudAlbums');
let {newNewsTop}=require('../crud/crudNews');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Celestial blink',index:true });
});

router.post('/',(req,res)=>{
    loaderData().then(ress=>{
      console.log(ress,"esto voy a enviar");
      res.send(ress);
    }).catch(errr=>{
      res.send({state:false,message:errr.message});
    })
});

const loaderData=async()=>{
  let lisAl=await topAlbums();
  let lisNws=await newNewsTop();
  return {state:true,top:{albums:lisAl,news:lisNws}};
}

module.exports = router;
