let {allAlbums}=require("./crudAlbums");

allAlbums({}).then(res=>{
    res.albums.forEach(r=>{
        console.log(JSON.stringify(r));
    })
})