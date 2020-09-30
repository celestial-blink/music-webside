const alertConfirmation=(data)=>{
    let btns=document.querySelectorAll("#btn-acept-cancel>a");
    btns[0].onclick=()=>{
        document.querySelector("#loader-wrapper").style.cssText="display:flex";
        let anima=document.querySelectorAll(".anima");
        let response=document.querySelector("#mi-respuesta");
        anima.forEach(e=>{
            e.style.cssText="animation-play-state: running;";
        });

        response.style.cssText="color:white;";
        response.textContent="espere...";
        miPeticion(data).then(res=>{
            if(res.includes('aquiiii error')){
                response.style.cssText="color:red;";
                response.textContent="error";
            }else{
                response.style.cssText="color:green;";
                response.textContent="terminado";
            }
            console.log(res);
                anima.forEach(e=>{
                    e.style.cssText="animation-play-state: paused;";
                });
            setTimeout(() => {
                document.querySelector("#loader-wrapper").style.cssText="display:none;";
            }, 3000);
        }).catch(err=>{
            console.log(err);
        })
    }
    btns[1].onclick=()=>{
        console.log("boton cancelar");
    }
}

const warningMessage=(data)=>{
    let me=document.querySelector("#AC-message");
    me.textContent=data.message;
    me.style.color=(data.color=="err")?"#FF5353":"var(--color-text)";
}