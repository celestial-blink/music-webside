let mongoose=require('mongoose')

let urli="mongodb://127.0.0.1:27017/celestial";

let myConnection=mongoose.connect(urli,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const closeMyconnection=async()=>{
    let con=await myConnection;
    return await con.connection.close();
}

module.exports = {myConnection,closeMyconnection};