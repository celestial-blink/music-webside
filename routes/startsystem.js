let {Router}=require('express');
let {createCountries,createGenres,createRoles,createUser,resetAll}=require('../crud/databaseStart');

let router=Router();

router.get("/",(req,res)=>{
    res.render("startsystem")
})


router.post("/", (req,res)=>{
    console.log(req.body);
    let response=[];
        if (req.body.info=="start"){
                    createCountries().then((result) => {
                        response.push("created countries!");
                    }).catch((err) => {
                        response.push(`countries error ${err}`);
                    });
                    createGenres().then((result) => {
                        response.push("created genres!");
                    }).catch((err) => {
                        response.push(`genres error ${err}`);
                    });
                    createRoles().then((result) => {
                        response.push("roles created!");
                        createUser().then((resulta) => {
                            response.push("created user");
                            res.send(JSON.stringify(response));
                        }).catch((err) => {
                            response.push(`user default error ${err}`)
                            res.send(JSON.stringify(response));
                        });
                    }).catch((err) => {
                        response.push(`roles error ${err}`)
                        res.send(JSON.stringify(response.push("error roles")));
                    });
        }else if(req.body.info=="reset"){
            resetAll().then(rest=>{
                res.send(JSON.stringify("eliminado"));
            }).catch(err=>{
                res.send(JSON.stringify(`${err.message} aquiiii error`));
            })
        }
        else{
            res.send(JSON.stringify(response.push("no se recibió informacion correcta")))
        }
        
})

module.exports = router;