let {Router} = require('express')
let multer=require('multer');
let {insertArtist,updateArtist,allArtistName}=require('../../crud/crudArtists');
let {insertAlbum, updateAlbum}=require('../../crud/crudAlbums');
let {insertNews,updateNews}=require('../../crud/crudNews');
let {allGenres,allCountries}=require('../../crud/getGCR');
let {updateUser}=require('../../crud/crudUsers');
let usenan=require('../../Globals/variables');

let storage=multer.diskStorage({
    destination:'uploads/images/',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+"."+file.mimetype.split("/")[1]);
    }
})
let ruta=multer({storage:storage});
let router=Router();


router.get("/",(req,res)=>{
    dataForm().then(ress=>{
        res.send(JSON.stringify(ress));
    }).catch(errr=>{
        res.send(JSON.stringify({state:false,message:errr.message}));
    })
});

const dataForm=async()=>{
    let genres=allGenres();
    let countries=allCountries();
    let artistName=await allArtistName();
    return {state:true,genres:genres,countries:countries,artist:artistName}
}

router.post('/',ruta.any('cover'),(req,res)=>{
    let obj={
        ...req.body,
        ...{cover:(req.files[0]==undefined)?"":req.files[0].filename},
        ...{music:(req.body.music==undefined)?[]:req.body.music.split(",")},
        ...{links:(req.body.links==undefined)?[]:req.body.links.split(",")}
    };
    console.log(obj,"llego");
    selectActions(obj).then(ress=>{
        console.log(ress,"estoy enviando esto");
        res.send(JSON.stringify(ress));
    }).catch(errr=>{
        console.log(errr,"esto es el error encontrado");
        res.send(JSON.stringify({state:false,message:errr.message}));
    })
})

const selectActions=async(object)=>{
    switch (object.faction){
        case "insert":
            let insrt=await insertDocument(object);
            return insrt;
        case "update":
            let updte=await updateDocument(object);
            return updte;
    }
}

const insertDocument=async(object)=>{
    switch(object.formid){
        case "new-artist":
            let inArt=await insertArtist(object,"celestial");
            return {state:true,message:"artista guardado"};
        
        case "new-album":
            let inAlbu=await insertAlbum(object,"celestial");
            return {state:true,message:"album guardado"};

        case "new-news":
            let inNws=await insertNews(object,"celestial");
            return {state:true, message:"noticia guardado"};

        default:
            return {state:false,message:"no se encontró formulario"};
    }
}
const updateDocument=async(object)=>{
    switch(object.formid){
        case "new-artist":
            let upArt=await updateArtist(object);
            return {state:true,message:"se modificó artista"};
        case "new-album":
            let upAlb=await updateAlbum(object);
            return {state:true,message:"se modificó album"};
        
        case "new-news":
            let upNws=await updateNews(object);
            return {state:true,message:"se modificó noticia"}

        case "user":
            let veri=object.pass==object.repeat;

            let upUsr=await updateUser(object);
            if(veri){usenan.setuser(object.name)}
            return (veri)?{state:true,message:"se modificó usuario"}:{state:false,message:"contraseñas no coinciden"};

        default:
        return {state:false,message:"no se encontró formulario"}
    }
}


module.exports = router;