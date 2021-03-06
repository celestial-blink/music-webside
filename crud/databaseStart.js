let {myConnection} = require('../conection/conectionMongo');
let Genres = require('../models/Genres');
let Roles = require('../models/Roles');
let Countries = require('../models/Countries');
let Users = require('../models/Users');
let {listAlbums}=require("./crudAlbums");
let {allArtistName}=require("./crudArtists");
let {listNews}=require("./crudNews");
let fs=require('fs');


let listGenres=[
    {name:'Classical'},
    {name:'Country'},
    {name:'Folk metal'},
    {name:'Punk'},
    {name:'Heavy metal'},
    {name:'Indie'},
    {name:'Rock'},
    {name:'Polka'},
    {name:'Metal'},
    {name:'Metal extreme'},
    {name:'Power metal'},
    {name:'Melodic metal'},
    {name:'Game'},
    {name:'Rock and roll'},
    {name:'Pop'},
    {name:'Symphonic metal'},
    {name:'Alternative metal'},
    {name:'Black metal'},
    {name:'Kawaii metal'},
    {name:'Doujin'},
    {name:'Gothic metal'},
    {name:'Post metal'},
    {name:'Neoclassical'},
    {name:'Neo metal'},
    {name:'Doom metal'},
    {name:'Deathmetal'},
    {name:'Deathcore'},
    {name:'Glam metal'},
    {name:'Progressive metal'},
    {name:'Speed metal'}
];

let listRoles=[
    {name:'Admin'},
    {name:'Super Admin'}
];

let listCountries=[
    {name:"Afganistán", code: "AF"},
    {name:"Islas de aland", code: "AX"},
    {name:"Albania", code: "AL"},
    {name:"Argelia", code: "DZ"},
    {name:"Afganistán", code: "AF"},
    {name:"Samoa americana", code: "AS"},
    {name:"Andorra", code: "AD"},
    {name:"Angola", code: "AO"},
    {name:"Anguila", code: "AI"},
    {name:"Anguila", code: "AI"},
    {name:"Antártida", code: "AQ"},
    {name:"Antigua y barbuda", code: "AG"},
    {name:"Argentina", code: "AR"},
    {name:"Armenia", code: "AM"},
    {name:"Aruba", code: "AW"},
    {name:"Australia", code: "AU"},
    {name:"Austria", code: "AT"},
    {name:"Azerbaiyán", code: "AZ"},
    {name:"Bahamas", code: "BS"},
    {name:"Baréin", code: "BH"},
    {name:"Bangladesh", code: "BD"},
    {name:"Barbados", code: "BB"},
    {name:"Bielorrusia", code: "BY"},
    {name:"Béltiga", code: "BE"},
    {name:"Belice", code: "BZ"},
    {name:"Benín", code: "BJ"},
    {name:"Bermuda", code: "BM"},
    {name:"Bután", code: "BT"},
    {name:"Bolivia", code: "BO"},
    {name:"Bonaire, San Eustaquio y Saba", code: "  BQ"},
    {name:"Bosnia y Herzegovina", code: "BA"},
    {name:"Botsuana", code: "BW"},
    {name:"Isla Bouvet", code: "BV"},
    {name:"Brasil", code: "BR"},
    {name:"Territorio Británico del Océano índico", code: "IO"},
    {name:"Islas Vírgenes Británicas", code: "VG"},
    {name:"Brunei", code: "BN"},
    {name:"Bulgaria", code: "BG"},
    {name:"Burkina Faso", code: "BF"},
    {name:"Burundi", code: "BI"},
    {name:"Camboya", code: "KH"},
    {name:"Camerún", code: "CM"},
    {name:"Canadá", code: "CA"},
    {name:"Cabo Verde", code: "CV"},
    {name:"Islas Caimán", code: "KY"},
    {name:"República de África Central", code: "CF"},
    {name:"Chad", code: "TD"},
    {name:"Chile", code: "CL"},
    {name:"China", code: "CN"},
    {name:"Isla de Pascua", code: "CX"},
    {name:"Islas Cocos", code: "CC"},
    {name:"Colombia", code: "CO"},
    {name:"Comoras", code: "KM"},
    {name:"Islas Cook", code: "CK"},
    {name:"Costa Rica", code: "CR"},
    {name:"Croacia", code: "HR"},
    {name:"Cuba", code: "CU"},
    {name:"Curazao", code: "CW"},
    {name:"Chipre", code: "CY"},
    {name:"República Checa", code: "CZ"},
    {name:"República Democrática del Congo", code: "CD"},
    {name:"Dinamarca", code: "DK"},
    {name:"Yibuti", code: "DJ"},
    {name:"Dominica", code: "DM"},
    {name:"República Dominicana", code: "DO"},
    {name:"Timor Oriental", code: "TL"},
    {name:"Ecuador", code: "EC"},
    {name:"Egipto", code: "EG"},
    {name:"El Salvador", code: "SV"},
    {name:"Guinea Ecuatorial", code: "GQ"},
    {name:"Eritrea", code: "ER"},
    {name:"Estonia", code: "EE"},
    {name:"Etiopía", code: "ET"},
    {name:"Islas Malvinas", code: "FK"},
    {name:"Islas Faroe", code: "FO"},
    {name:"Fuji", code: "FJ"},
    {name:"Finlandia", code: "Fl"},
    {name:"Francia", code: "FR"},
    {name:"Guayana Francesa", code: "GF"},
    {name:"Polinesia Francesa", code: "PF"},
    {name:"Territorios de sur Franceses", code: "TF"},
    {name:"Gabón", code: "GA"},
    {name:"Gambia", code: "GM"},
    {name:"Georgia", code: "GE"},
    {name:"Alemania", code: "DE"},
    {name:"Ghana", code: "GH"},
    {name:"Gibraltar", code: "GI"},
    {name:"Grecia", code: "GR"},
    {name:"Groenlandia", code: "GL"},
    {name:"Granada", code: "GD"},
    {name:"Guadalupe", code: "GP"},
    {name:"Guam", code: "GU"},
    {name:"Guatemala", code: "GT"},
    {name:"Guernsey", code: "GG"},
    {name:"Guinea", code: "GN"},
    {name:"Guinea Bissau", code: "GW"},
    {name:"Guyana", code: "GY"},
    {name:"Haití", code: "HT"},
    {name:"Islas Heard y McDonald", code: "HM"},
    {name:"Honduras", code: "HN"},
    {name:"Hong Kong", code: "HK"},
    {name:"Hungría", code: "HU"},
    {name:"Islandia", code: "IS"},
    {name:"India", code: "IN"},
    {name:"Indonesia", code: "ID"},
    {name:"Irán", code: "IR"},
    {name:"Irak", code: "IQ"},
    {name:"Irlanda", code: "IE"},
    {name:"Isla de Man", code: "IM"},
    {name:"Israel", code: "IL"},
    {name:"Italia", code: "IT"},
    {name:"Costa de Marfil", code: "AI"},
    {name:"Jamaica", code: "JM"},
    {name:"Japón", code: "JP"},
    {name:"Jersey", code: "JE"},
    {name:"Jordania", code: "JO"},
    {name:"Kazajistán", code: "KZ"},
    {name:"Kenia", code: "KE"},
    {name:"Kiribati", code: "KI"},
    {name:"Kosovo", code: "XK"},
    {name:"Kuwait", code: "KW"},
    {name:"Kirguistán", code: "KG"},
    {name:"Laos", code: "LA"},
    {name:"Letonia", code: "LV"},
    {name:"Líbano", code: "LB"},
    {name:"Lesoto", code: "LS"},
    {name:"Liberia", code: "LR"},
    {name:"Libia", code: "LY"},
    {name:"Liechtenstein", code: "LI"},
    {name:"Lituania", code: "LT"},
    {name:"Luxemburgo", code: "LU"},
    {name:"Macao", code: "MO"},
    {name:"Macedonia", code: "MK"},
    {name:"Madagascar", code: "MG"},
    {name:"Malaui", code: "MW"},
    {name:"Malasia", code: "MY"},
    {name:"Maldivas", code: "MV"},
    {name:"Malí", code: "ML"},
    {name:"Malta", code: "MT"},
    {name:"Islas Marshall", code: "MH"},
    {name:"Martinica", code: "MQ"},
    {name:"Mauricio", code: "MU"},
    {name:"Mauritania", code: "MR"},
    {name:"Mayotte", code: "YT"},
    {name:"México", code: "MX"},
    {name:"Micronesia", code: "FM"},
    {name:"Moldavia", code: "MD"},
    {name:"Mónaco", code: "MC"},
    {name:"Mongolia", code: "MN"},
    {name:"Montenegro", code: "ME"},
    {name:"Montserrat", code: "MS"},
    {name:"Morruecos", code: "MA"},
    {name:"Mozambique", code: "MZ"},
    {name:"Myanmar", code: "MM"},
    {name:"Namibia", code: "NA"},
    {name:"Nauru", code: "NR"},
    {name:"Nepal", code: "NP"},
    {name:"Países Bajos", code: "NL"},
    {name:"Antillas Holandesas", code: "AN"},
    {name:"Nueva Caledonia", code: "NC"},
    {name:"Nueva Zelandia", code: "NZ"},
    {name:"Nicaragua", code: "NI"},
    {name:"Níger", code: "NE"},
    {name:"Nigeria", code: "NG"},
    {name:"Niule", code: "NU"},
    {name:"Isla Norfolk", code: "NF"},
    {name:"Corea del Norte", code: "KP"},
    {name:"Islas Marianas del Norte", code: "MP"},
    {name:"Noruega", code: "NO"},
    {name:"Omán", code: "OM"},
    {name:"Pakistán", code: "Palaos"},
    {name:"Palaos", code: "PW"},
    {name:"Territorios Palestinos", code: "PS"},
    {name:"Panamá", code: "PA"},
    {name:"Papúa Nueva Guinea", code: "PG"},
    {name:"Paraguay", code: "PY"},
    {name:"Perú", code: "PE"},
    {name:"Filipinas", code: "PH"},
    {name:"Islas Pitcairn", code: "PN"},
    {name:"Polonia", code: "PL"},
    {name:"Portugal", code: "PT"},
    {name:"Puerto Rico", code: "PR"},
    {name:"Catar", code: "QA"},
    {name:"República del Congo", code: "CG"},
    {name:"Reunión", code: "RE"},
    {name:"Rumania", code: "RO"},
    {name:"Rusia", code: "RU"},
    {name:"Ruanda", code: "RW"},
    {name:"San Bartolomé", code: "BL"},
    {name:"Santa Elena", code: "SH"},
    {name:"San Cristóbal y nieves", code: "KN"},
    {name:"Santa Lucía", code: "LC"},
    {name:"San Martín", code: "MF"},
    {name:"San pedro y Miguelón", code: "PM"},
    {name:"San Vicente y las Granadinas", code: "VC"},
    {name:"Samoa Occidental", code: "WS"},
    {name:"San Marino", code: "SM"},
    {name:"Santo Tomé y Príncipe", code: "ST"},
    {name:"Arabia Saudita", code: "SA"},
    {name:"Senegal", code: "SN"},
    {name:"Serbia", code: "RS"},
    {name:"Serbia y Montenegro", code: "CS"},
    {name:"Seychelles", code: "SC"},
    {name:"Sierra Leona", code: "SL"},
    {name:"Singapur", code: "SG"},
    {name:"Eslovaquia", code: "SK"},
    {name:"Eslovenia", code: "SI"},
    {name:"Islas Salomón", code: "SB"},
    {name:"Somalia", code: "SO"},
    {name:"Sudáfrica", code: "ZA"},
    {name:"Corea del Sur", code: "KR"},
    {name:"Sudán del Sur", code: "SS"},
    {name:"España", code: "ES"},
    {name:"Sri Lanka", code: "LK"},
    {name:"Suazilandia", code: "SZ"},
    {name:"Suecia", code: "SE"},
    {name:"Suiza", code: "CH"},
    {name:"Siria", code: "SY"},
    {name:"Taiwán", code: "TW"},
    {name:"Tayikistán", code: "TJ"},
    {name:"Turquía", code: "TR"},
    {name:"Reino Unido", code: "GB"},
    {name:"Estados Unidos", code: "US"},
    {name:"Uruguay", code: "UY"},
    {name:"Vaticano", code: "VA"},
    {name:"Venezuela", code: "VE"},
    {name:"Vietnam", code: "VN"},
    {name:"Wallis y Futuna", code: "WF"},
    {name:"Sahara Occidental", code: "EH"},
    {name:"Yemen", code: "YE"},
    {name:"Zambia", code: "ZM"},
    {name:"Zimbabue", code: "ZW"}
];

let adminDefault={
    name:"celestial",
    pass:"celestial123",
    fullName:"celestial-blink",
    rol:"Admin",
    email:"kkrakenbreaker@gmail.com",
    state:true
};


    const createGenres=async()=>{
        let saveModel= await Genres.insertMany(listGenres);
        return saveModel;
    }

    const createRoles = async ()=>{
        let saveRoles=await Roles.insertMany(listRoles);
        return saveRoles;
     }

     const createCountries = async () => {
        let saveCountries= await Countries.insertMany(listCountries);
        return saveCountries;
    }

    const createUser=async ()=>{
        let defaultRole=await Roles.findOne({name:adminDefault.rol});
        let saveUser=await new Users({
            name:adminDefault.name,
            pass:adminDefault.pass,
            role:defaultRole._id,
            email:adminDefault.email,
            state:adminDefault.state,
            fullName: adminDefault.fullName
        })
        return await saveUser.save();
    
    }
        

const resetAll=async()=>{

    let reset=await myConnection;
    let myCollection=await reset.connection.db.listCollections().toArray();

    myCollection.forEach(el=>{
        reset.connection.db.dropCollection(el.name).then(res=>{
            console.log(`${res} deleted ${el.name} `);
        });
    })
    return [];
}




//    createGenres(listGenres).then(res=>{
//        console.log(res," elementos guardados")
//    }).catch(err=>{
//        console.log(err)
//    })


//   createRoles(listRoles).then(res=>{
//       console.log(res," elementos guardados")
//   }).catch(err=>{
//       console.log(err)
//   })


//  insertCountries().then(res=>{
//      console.log(res, " elementos guardados")
//  }).catch(err=>{
//      console.log(err)
//  })


// createUser(adminDefault).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

    // let cele=await Users.findOne({}).populate('role').exec()
    // return cele;


module.exports = {createCountries,createRoles,createGenres,createUser,resetAll}