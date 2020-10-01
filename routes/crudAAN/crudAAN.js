let {Router} = require('express')
let multer=require('multer');
let {insertArtist,updateArtist,allArtistName,deleteArtist}=require('../../crud/crudArtists');
let {insertAlbum, updateAlbum,deleteAlbum}=require('../../crud/crudAlbums');
let {insertNews,updateNews,deleteNews}=require('../../crud/crudNews');
let {allGenres,allCountries}=require('../../crud/getGCR');
let {updateUser}=require('../../crud/crudUsers');
let usenan=require('../../Globals/variables');
let fs=require('fs');

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
        if (ress.message.includes("modificó") || ress.message.includes("eliminado")){
            if (obj.oldcover!="" || obj.oldcover!=undefined){
                let path=`./uploads/images/${obj.oldcover}`;
                fs.unlink(path,(err)=>{
                    if(err){
                        console.log(err,"no se pudo eliminar");
                        return;
                    }
                    console.log("eliminado");
                })
            }
        }
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

        case "delete":
            let delte=await deleteDocument(object);
            return delte;
        default:
            return {state:false,message:"no se encontro accion"}
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

const deleteDocument =async(object)=>{
    switch (object.from){
        case "Artistas":
        let delArt=await deleteArtist(object);
        return {state:true,message:"eliminado correctamente"};

        case "Albumes":
        let delAlb=await deleteAlbum(object);
        return {state:true,message:"eliminado correctamente"};

        case "Noticias":
        let delNws=await deleteNews(object);
        return {state:true,message:"eliminado correctamente"};
        default:
            return {state:false,message:"no se encontro documento para eliminar"};
    }
}


module.exports = router;