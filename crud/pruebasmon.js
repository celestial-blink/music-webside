let {searchOne}=require('./crudAlbums');
searchOne({album:"Simple Map"}).then(res=>{
    console.log(JSON.stringify(res));
}).catch(err=>{
    console.log(err);
})