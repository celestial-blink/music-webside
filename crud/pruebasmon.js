let {searchUserFornName}=require('./crudUsers');

searchUserFornName({name:"celestial"}).then(res=>{
    console.log(JSON.stringify(res.email));
}).catch(err=>{

})