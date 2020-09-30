const getDataForm=()=>{
    let genre=document.querySelector("select#genre");
    let country=document.querySelector("select#country")
    fetch('/admin/crud',{method:'GET'}).then(res=>{
        let data=res.json();
        data.then(ress=>{
            for (let key in ress.genres) {
                let option=document.createElement('option');
                if (ress.genres.hasOwnProperty(key)) {
                    let element = ress.genres[key];
                    option.value=element.name;
                    option.textContent=element.name;
                }
                genre.appendChild(option);
            }
            for (let key in ress.countries) {
                let option=document.createElement('option');
                if (ress.countries.hasOwnProperty(key)) {
                    let element = ress.countries[key];
                    option.value=element.name;
                    option.textContent=element.name;
                }
                country.appendChild(option);
            }
        }).catch(errr=>{
            console.log(errr);
        })
    }).catch(err=>{
        console.error(err);
    })
    
}
const sendData=async(form)=>{
    let formdata=new FormData(form);
    formdata.append('faction',form.getAttribute('act'));
    formdata.append('formid',form.getAttribute('id'));
    formdata.append('oldtitle',form.title.getAttribute('oldtitle'));
    
    let send=await fetch('/admin/crud',{
        body:formdata,
        method:'POST'
    });
    let getJson=await send.json();
    return getJson;
}
const messageRes=(ob)=>{
    let message=document.querySelector("div.frm-wrapper>span.message-reserr");
    console.log(message);
    message.innerHTML=ob.message;
    message.style.cssText="display:inline-block;opacity:1; left:-50%;";
    message.style.backgroundColor=(ob.type=="err")?"#ff2b2b":"#18d617";
    setTimeout(()=>{
        message.style.opacity="0";
        setTimeout(()=>{
            message.style.display="none";
            message.style.left="-200%";
        },2000);
    },2500);
}
const initialize=()=>{
    let formArtist=document.querySelector("form#new-artist");
    formArtist.onsubmit=(e)=>{
        e.preventDefault();
        openLoader();
        sendData(formArtist).then(res=>{
            closeLoader();
            if(res.state){
                messageRes({type:"res",message:res.message});
                setTimeout(()=>{
                    window.location.href=window.location.href.split("#")[0];
                },1200);
            }else{
                console.log(res.message);
                messageRes({type:"err",message:res.message});
            }
        }).catch(err=>{
            console.error(err);
            messageRes({type:"err",message:err});
        })
    }

    getDataForm();
}

initialize();