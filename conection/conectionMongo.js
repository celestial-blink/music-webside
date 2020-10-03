let mongoose=require('mongoose')

let urli="mongodb://127.0.0.1:27017/celestial";

let urlAtlas=`mongodb+srv://take:<${process.env.CB_DB_PASS}>@cluster0.gt8zx.mongodb.net/<celestial>?retryWrites=true&w=majority`;

let myConnection=mongoose.connect(urlAtlas,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const closeMyconnection=async()=>{
    let con=await myConnection;
    return await con.connection.close();
}

module.exports = {myConnection,closeMyconnection};