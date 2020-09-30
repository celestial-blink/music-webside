const sendDataFormUser=async(form)=>{
    let formdata=new FormData(form);
    formdata.append('oldname',form.name.getAttribute('oldname'));
    formdata.append('formid',form.getAttribute('id'));
    formdata.append('faction',form.getAttribute('act'));
    let sendData=await fetch('/admin/crud',{method:"POST",body:formdata});
    return await sendData.json();
}
const messageRes=(ob)=>{
    let message=document.querySelector("div.frm-wrapper>span.message-reserr");
    message.innerHTML=ob.message;
    message.style.cssText="opacity:1;left:-50%;";
    message.style.backgroundColor=(ob.type=="err")?"#ff2b2b":"#18d617";
    setTimeout(()=>{
        message.style.opacity="0";
        setTimeout(()=>{
            message.style.left="-200%";
        },1000);
    },2500);
}

const initialize=()=>{
    let form=document.querySelector("#user");
    form.onsubmit=(e)=>{
        e.preventDefault();
        openLoader();
        sendDataFormUser(form).then(res=>{
            closeLoader();
            if(res.state){
                messageRes({type:"res",message:res.message});
                setTimeout(()=>{
                    window.location.href=window.location.href.split("#")[0];
                },1200)
            }else{
                messageRes({type:"err",message:res.message});
            }
        }).catch(err=>{
            closeLoader();
            messageRes({type:"err",message:err});
        })
    }
}

const showPass=()=>{
    let btn=document.querySelectorAll("#user>span.password>a");
    let turn=true;
    btn.forEach(e=>{
        e.onclick=(ev)=>{
            ev.preventDefault();
            if(turn){
                e.previousElementSibling.setAttribute('type','text');
                turn=false;
            }else{
                e.previousElementSibling.setAttribute('type','password');
                turn=true;
            }
        }
    })
}
showPass();
initialize();