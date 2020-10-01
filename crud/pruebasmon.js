let {searchArtist}=require('./crudArtists');

searchArtist({title:"f"}).then(res=>{
    console.log(JSON.stringify(res));
}).catch(err=>{
    console.log(err);
})