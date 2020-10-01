let {myConnection}=require('../conection/conectionMongo');
let Users=require('../models/Users');
let Artists=require('../models/Artists');
let News=require('../models/News');

const insertNews=async(news,user)=>{
    let idUser=await Users.findOne({name:user});
    let idArtist=await Artists.findOne({title:news.artist})
    let saveNews=new News({
        title:news.title,
        description:news.description,
        cover:news.cover,
        admin:idUser._id,
        link:news.link,
        artist:(idArtist==undefined || idArtist==null)?[]:idArtist._id
    });
    return await saveNews.save();
}

const updateNews=async(news)=>{
    let idArtist=await Artists.findOne({title:news.artist});
    let idNews=await News.findOne({title:news.oldtitle});

    let updaNews=await News.updateOne(
        {_id:idNews._id},
        {
            $set:{
                title:news.title,
                description:news.description,
                cover:(news.cover==undefined || news.cover=="")?idNews.cover:news.cover,
                link:news.link,
                artist:(idArtist==undefined)?[]:idArtist._id
            }
        }
    );
    return updaNews;
}

const searchNews=async(news)=>{
    let searNews=await News.findOne({
        $or:[{
            title:new RegExp(`^${news.title}`),
            title:new RegExp(`${news.title}$`)
        }]
    });
    return searNews;
}

const allNews=async(data)=>{
    let total=await News.find().count();
    let cards=8;
    let pages=Math.ceil(total/cards);

    let pagesAray=[];
    
    let page=(data.page==undefined)?1:parseInt(data.page);
    let start=(page-1)*cards;
    
    for (let index = (start+1); index <= pages; index++) {
        pagesAray.push(index);       
    }

    let allNws=(data.search==undefined)?
    await News.find({}).populate('artist').skip(start).limit(cards):
    await News.find({
        $or:[
            {title:new RegExp(`^${data.search}`)},
            {title:new RegExp(`${data.search}$`)}
        ]
    }).populate('artist').skip(start).limit(cards);

    return {pages:pagesAray,range:`${start+1} - ${total}`, total:`result ${allNws.length}`,news:allNws}
}

const deleteNews =async(object)=>{
    let delNews=await News.deleteOne({_id:object.id});
    return delNews;
}
const listNews=async()=>{
    let all=await News.find().sort({_id:-1});
    return all;
}

const newNewsTop=async()=>{
    let top=await News.find().sort({_id:-1}).limit(5);
    return top;
}

let nananana={
    title:"mi agueros",
    newtitle:"mi aguero",
    description:"mi description de l",
    cover:"sin imagen.jpg",
    link:"milink.com",
    artist:"cais agujero"
}

module.exports = {insertNews,updateNews,searchNews,allNews,deleteNews,listNews,newNewsTop};