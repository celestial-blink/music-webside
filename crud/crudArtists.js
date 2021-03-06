let {myConnection}=require('../conection/conectionMongo');
let Artists=require('../models/Artists');
let Genres=require('../models/Genres');
let Countries=require('../models/Countries');
let Users=require('../models/Users');

const insertArtist=async(artist,user)=>{
    
    let dateCovert=(artist.date==undefined)?new Date().toISOString():new Date(artist.date).toISOString();    
    let idGenre=await Genres.findOne({name:artist.genre});
    let idCountry=await Countries.findOne({name:artist.country});
    let idUser=await Users.findOne({name:user});
    
    let saveArtist=new Artists({
        title:artist.title,
        genre:idGenre._id,
        description:artist.description,
        country:idCountry._id,
        admin:idUser._id,
        creation:dateCovert,
        cover:artist.cover
    });

    return await saveArtist.save();
}

let updateArtist=async(artist)=>{
    let dateCovert=new Date(artist.date).toISOString();    
    let idGenre=await Genres.findOne({name:artist.genre});
    let idCountry=await Countries.findOne({name:artist.country});
    let idArtist=await Artists.findOne({title:artist.oldtitle});

    let updaArtist=await Artists.updateOne(
        {_id:idArtist._id},
            {
                $set:{
                    title:artist.title,
                    genre:idGenre._id,
                    description:artist.description,
                    country:idCountry._id,
                    creation:dateCovert,
                    cover:(artist.cover=="" || artist.cover==undefined)?idArtist.cover:artist.cover
                }   
            }
        )
    
    return updaArtist;
}

const searchArtist=async(artist)=>{
    let genre=(artist.genre==undefined || artist=="")?undefined:await Genres.findOne({name:artist.genre});

    let forTitle={
        $or:[
            {title:new RegExp(`^${artist.title}`)},
            {title:new RegExp(`${artist.title}$`)}
        ]
    };

    let forGenre={
        genre:(genre==undefined)?"":genre._id
    }


    let seArtist=await Artists.find(
        (genre!=undefined)?forGenre:forTitle
    ).populate('genre').populate('country');
    return seArtist;
}

const allArtist=async(data)=>{
    let total=await Artists.find().count();
    let cards=8;
    let pages=Math.ceil(total/cards);

    let pagesAray=[];
    for (let index = 1; index <= pages; index++) {
        pagesAray.push(index);       
    }

    let page=(data.page==undefined)?1:parseInt(data.page);
    let start=(page-1)*cards;

    let allArt=(data.search==undefined)?await Artists.find({}).populate('genre').populate('country').skip(start).limit(cards):
    await Artists.find({$or:[
        {title:new RegExp(`^${data.search}`)},
        {title:new RegExp(`${data.search}$`)}
    ]}).populate('genre').populate('country').skip(start).limit(cards);

    return {pages:pagesAray,range:`${start+1} - ${total}`, total:`result ${allArt.length}`,artists:allArt}
}

const allArtistName=async()=>{
    let name=await Artists.find().sort({_id:-1});
    return name;
}

const deleteArtist=async(object)=>{
    let delArt=await Artists.deleteOne({_id:object.id});
    return delArt;
}

const allArtistOrderByName=async()=>{
    let all=await Artists.find().sort({title:1});
    return all;
}


let nanana={
    title:"esconora",
    genre:"Heavy metal",
    description:"una breve desription",
    country:"Japón",
    date:"1998-01-27",
    cover:"take.jpg",
    newtitle:"cais agujero"
}
module.exports = {insertArtist,updateArtist,allArtist,searchArtist,allArtistName,deleteArtist,allArtistOrderByName};