let {myConnection}=require('../conection/conectionMongo');
let Genres=require('../models/Genres');
let Users=require('../models/Users');
let Artists=require('../models/Artists');
let Albums=require('../models/Albums');


const insertAlbum=async(album,user)=>{
    let idArtist=await Artists.findOne({title:album.artist});
    let idUser=await Users.findOne({name:user});
    let idGenre=await Genres.findOne({name:album.genre})

    let saveAlbum=new Albums({
        artist:idArtist._id,
        title:album.title,
        music:album.music,
        genre:idGenre._id,
        cover:album.cover,
        admin:idUser._id,
        links:album.links
    });
    return await saveAlbum.save();
}

const updateAlbum=async(album)=>{
    let idArtist=await Artists.findOne({title:album.artist});
    let idGenre=await Genres.findOne({name:album.genre});
    let idALbum=await Albums.findOne({title:album.oldtitle});


    let updaAlbum=await Albums.updateOne(
        {_id:idALbum._id},
            {
                $set:{
                    artist:idArtist._id,
                    title:album.title,
                    music:album.music,
                    genre:idGenre._id,
                    links:album.links,
                    cover:(album.cover=="" || album.cover==undefined)?idALbum.cover:album.cover
                }
            }
        )
    return updaAlbum;
}

const searchAlbum=async(album)=>{
    let genre=(album.genre==undefined || album.genre=="")?undefined:await Genres.findOne({name:album.genre});
    let title={
        $or:[
        {title:new RegExp(`^${album.title}`)},
        {title:new RegExp(`${album.title}$`)}
    ]};
    let genres={
        genre:(genre==undefined)?"":genre._id
    }
    let seacAlbum=await Albums.find(
        (genre!=undefined)?genres:title
    ).populate('artist').populate('genre');
    return seacAlbum;
}

const allAlbums=async(data)=>{
    let total=await Albums.find().count();
    let cards=8;
    let pages=Math.ceil(total/cards);

    let pagesAray=[];
    for (let index = 1; index <= pages; index++) {
        pagesAray.push(index);       
    }

    let page=(data.page==undefined)?1:parseInt(data.page);
    let start=(page-1)*cards;
    let allAl=(data.search==undefined)?
    await Albums.find().populate('artist').populate('genre').skip(start).limit(cards)
    :await Albums.find({
        $or:[
            {title:new RegExp(`^${data.search}`)},
            {title:new RegExp(`${data.search}$`)}
        ]
    }).populate('artist').populate('genre').skip(start).limit(cards);
    return {pages:pagesAray,range:`${start+1} - ${total}`, total:`result ${allAl.length}`,albums:allAl}
}

const listAlbums=async()=>{
    let all=await Albums.find().sort({_id:-1});
    return all;
}

const deleteAlbum=async(object)=>{
    let delAl=await Albums.deleteOne({_id:object.id});
    return delAl;
}

const topAlbums=async()=>{
    let top=await Albums.find({}).sort({_id:-1}).limit(5);
    return top;
}

const SearchForArtist=async(object)=>{
    let artist=await Artists.findOne(
        {title:(object.title==undefined || object.title=="")?"":object.title}
    );
    let discography=await Albums.find(
        {artist:artist._id}
    );
    return discography;
}

const searchOne=async(object)=>{
    let one=await Albums.findOne({
        title:(object.album!=undefined || object.album!="")?object.album:""
    });
    return one;
}

let nanana={
    artist:"esconora",
    title:"almunas",
    music:["musica one","music two","music three","music four"],
    genre:"Heavy metal",
    cover:"uno dos tres",
    links:["link one","link two","link twenty","pilot"],
    newtitle:"almuna"
}

module.exports = {insertAlbum,updateAlbum,searchAlbum,allAlbums,deleteAlbum,listAlbums,topAlbums,SearchForArtist,searchOne};