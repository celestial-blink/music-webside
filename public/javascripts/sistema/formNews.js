const getDataForm=()=>{
    let select=document.querySelector("select#artist");
    fetch('/admin/crud',{method:'get'}).then(res=>{
        let data=res.json();
        data.then(ress=>{
            for(let key in ress.artist){
                let option=document.createElement('option');
                if(ress.artist.hasOwnProperty(key)){
                    let element=ress.artist[key];
                    option.value=element.title;
                    option.textContent=element.title;
                }
                select.appendChild(option);
            }
        }).catch(errr=>{

        })
    }).catch(err=>{

    })
}
const sendDataNws=async(form)=>{
    let formdata=new FormData(form);
    formdata.append('faction',form.getAttribute('act'));
    formdata.append('formid',form.getAttribute('id'));
    formdata.append('oldtitle',form.title.getAttribute('oldtitle'));
    formdata.append('oldcover',form.cover.getAttribute("oldcover"));
    let send=await fetch('/admin/crud',{method:'POST',body:formdata});
    return await send.json();
}
const initializeNews=()=>{
    let form=document.querySelector("#new-news");
    form.onsubmit=(e)=>{
        e.preventDefault();
        openLoader();
        sendDataNws(form).then(res=>{
            closeLoader();
            if (res.state){
                console.log(res.message);
                messageRes({type:"res",message:res.message});
                setTimeout(()=>{
                    window.location.href=window.location.href.split("#")[0];
                },1200);
            }else{
                console.log(res.message);
                messageRes({type:"err",message:res.message});
            }
        }).catch(err=>{
            console.log(err.message);
            messageRes({type:"err",message:err.message});
        })
    }

    getDataForm();
}
const messageRes=(ob)=>{
    let message=document.querySelector("div.frm-wrapper>span.message-reserr");
    console.log(message);
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
initializeNews();