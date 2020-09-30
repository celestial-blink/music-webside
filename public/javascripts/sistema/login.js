let steps=1;
const mData=(frm)=>{
    frm.onsubmit=(e)=>{
        openLoader();
        e.preventDefault();
        let formData=new FormData(frm);
        let data=new URLSearchParams(formData);
        data.append('tyform',frm.getAttribute('form-name'));
        data.append('steps',steps);
        getCode(data).then(res=>{
            console.log(res);
            if (res.state) {
                if (res.message=="ok"){
                    window.location.href="/admin/sistema";
                }
                console.log("es verdadero");
                closeLoader();
                if (data.get('tyform')=="form-login"){
                    console.log("si hay");
                }else if(data.get('tyform')=="form-registration") {
                    formRegister("blink");
                }else if(data.get('tyform')=="form-forget"){
                    steps+=1;
                    formForgetOk({step:steps,message:res.message});
                    console.log(steps);
                    steps=1;
                }
            } else {
                console.log("es falso");
                actionsForm(data.get('tyform'),res.message);
                closeLoader();
            }
        }).catch(err=>{
            console.log(JSON.stringify(err));
            closeLoader();

        })
    }
}

const initForm=()=>{
    let forms=document.querySelectorAll(".container>form");
    forms.forEach(f=>{
        mData(f);
    })
};
initForm();

const getCode = async(data)=>{
        let server=await fetch("",{
            method:'post',
            body: data
        });
        let response=await server.json();
        return response;   
}

const actionsForm=(name,messa)=>{
    if(name=="form-login"){
        formLogin(messa);
    }else if(name=="form-registration"){
        if (messa.includes("name")) {
            formRegister("name");
        }else if (messa.includes("no son iguales")){
            formRegister("pass");
        }else if (messa.includes("fullName")){
            formRegister("fullname")
        }else if (messa.includes("email")){
            formRegister("email");
        }else{
            formRegister("blink");
        }
    }else if(name=="form-forget"){
        if (messa.includes("Message failed:")){
            formForget("failed")
        }
        else if(messa.includes("name")){
            formForget("name")
        }else if (messa.includes("code")){
            formForget("code")
        }else if(messa.includes("pass")){
            formForget('pass')
        }
    }else{
        console.log("no se encontro formulario");
    }
}


const formLogin=(messa)=>{
    let message=document.querySelector("#m-login");
    let focs=document.querySelector("#form-login>input[name='name']");
    focs.focus();
    message.textContent=messa;
    message.style.color="#FF5353";
    message.style.display="inline-block";
    message.style.opacity="1";
    setTimeout(()=>{
            message.style.opacity=".5";
    },5000);
}
const formRegister=(fo)=>{
    let message=document.querySelector("#m-registration");
    let focs=document.querySelectorAll("#registrar>input");
    message.style.color="#ff5353";
    message.style.opacity="1";
    switch (fo) {
        case "name":
            message.style.display="inline-block";
            message.textContent="usuario ya exite evite los espacios en blanco";
            focs[0].focus();
            setTimeout(()=>{
                message.style.opacity=".5";
            },5000);
            break;
        
        case "pass":
            message.style.display="inline-block";
            message.textContent="las contraseñas no son iguales";
            focs[1].focus();
            focs[2].value="";
            setTimeout(()=>{
                message.style.opacity=".5";
            },5000);
            break;

        case "fullname":
            message.style.display="inline-block";
            message.textContent="nombre completo no valido";
            focs[3].focus();
            setTimeout(()=>{
                message.style.opacity=".5";
            },5000);
            break;

        case "email":
            message.style.display="inline-block";
            message.textContent="correo inválido";
            focs[3].focus();
            setTimeout(()=>{
                message.style.opacity=".5";
            },5000);
            break;

        default:
            message.textContent="registrado, inicie session";
            message.style.color="#34ff34";
            message.style.display="inline-block";
            for (let index = 0; index <= 4 ; index++) {
                focs[index].value="";
            }
            setTimeout(()=>{
                window.location.href=window.location.href.split("#")[0]+"#";
                message.style.display="none";
            },2000)
            break;
    }
}

const formForgetOk=(value)=>{
    let focs=document.querySelectorAll("#f-forget-pass input");
    let fpMessage= document.querySelector("#fp-message");
    console.log(value);
    switch (value.step){
        case 2:
            fpMessage.textContent=value.message;
            fpMessage.style.cssText="display:inline-block;color:rgb(34, 67, 255);opacity:1";
            focs[1].style.display="inline-block";
        break;
        case 3:
            fpMessage.textContent="nueva contraseña";
            fpMessage.style.cssText="display:inline-block;color:rgb(34, 67, 255);opacity:1";
            focs[2].style.display="inline-block";
            focs[3].style.display="inline-block";
            focs[1].style.display="none";
            focs[4].value="guardar";
        break;
        default:
            fpMessage.textContent=value.message+", vuelva a iniciar sesion";
            fpMessage.style.cssText="display:inline-block;opacity:1; color:rgb(34, 67, 255);";
            setTimeout(()=>{
                fpMessage.style.display="none";
                focs[1].style.display="none";
                focs[2].style.display="none";
                focs[3].style.display="none";
                window.location.href=window.location.href.split("#")[0]+"#";
            },5000);
        break;
    }
}

const formForget=(value)=>{
    let fpMessage= document.querySelector("#fp-message");
    let focs=document.querySelectorAll("#f-forget-pass input");
    switch(value){
        case "failed":{
            fpMessage.textContent="inténtelo otro momento";
            fpMessage.style.cssText="display:inline-block;opacity:1;color:#ff5353;";
            focs[0].focus();
            setTimeout(()=>{
                fpMessage.style.opacity=".5";
                window.location.href=window.location.href.split("#")[0]+"#";
            },5000);            
        }
        break;

        case "name":
            fpMessage.textContent="usuario no encontrado";
            fpMessage.style.cssText="display:inline-block;opacity:1;color:#ff5353;";
            focs[0].focus();
            setTimeout(()=>{
                fpMessage.style.opacity=".5";
            },5000);
        break;

        case "code":
            fpMessage.textContent="codigo inválido";
            fpMessage.style.cssText="display:inline-block;opacity:1;color:#ff5353;";
            focs[1].focus();
            setTimeout(()=>{
                fpMessage.style.opacity=".5";
            },5000);
        break;

        case "pass":
            fpMessage.textContent="las contraseñas no coinciden";
            fpMessage.style.cssText="display:inline-block;opacity:1;color:#ff5353;";
            focs[2].focus();
            focs[3].value="";
            setTimeout(()=>{
                fpMessage.style.opacity=".5";
            },5000);
        break;

        default:
            break;
    }
}

const inputPass=()=>{
    let eyes=document.querySelectorAll("div.fl-wrapper>.container>form>span.p>a");
    let inputs=document.querySelectorAll("div.fl-wrapper>.container>form>span.p>input[type='password']");
    let index=0;
    let visible=false;
    inputs.forEach(inp=>{
        eyes[index].onclick=(ev)=>{
            ev.preventDefault();
            inp.setAttribute('type',(visible==false)?'text':'password');
            visible=(visible==false)?true:false;
        }    
    index+=1;
    });
    index=0;
}
inputPass();