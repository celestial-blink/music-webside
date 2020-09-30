const showMinModal=()=>{
    let Mmusic=document.querySelector("#show-list-music");
    let Cmusic=document.querySelector("#show-list-musics");

    let Murl=document.querySelector("#show-list-url");
    let Curl=document.querySelector("#show-list-urls");

    let inputEdit=document.querySelector("#minModal-edit");
    let controlEdit=document.querySelector("#controls-edit");

    let MnewArtist=document.querySelector("#btn-new-artist-a");
    let CnewAtrist=document.querySelector("#form-min-artist");

    Mmusic.onclick=(e)=>{
        Cmusic.style.cssText="display:block";
        Curl.style.cssText="display:none";
        controlEdit.style="display:block";
        CnewAtrist.style="display:none";
        inputEdit.value="";
    }
    Murl.onclick=(e)=>{
        Cmusic.style.cssText="display:none";
        Curl.style.cssText="display:block";
        controlEdit.style="display:block";
        CnewAtrist.style="display:none";
        inputEdit.value="";
    }
    MnewArtist.onclick=(e)=>{
        Cmusic.style.cssText="display:none";
        Curl.style.cssText="display:none";
        controlEdit.style="display:none";
        CnewAtrist.style="display:block";
    }
}
showMinModal();

const getDataForn=()=>{
    let pArtist=document.querySelector("select#artista");
    let pGenre=document.querySelector("select#genreone");
    let sGenre=document.querySelector("select#genretwo");
    let sCountry=document.querySelector("select#country");

    fetch("/admin/crud",{method:"GET"}).then(res=>{
        let data=res.json();
        data.then(ress=>{
            for (let key in ress.genres) {
                let option=document.createElement('option');
                if (ress.genres.hasOwnProperty(key)) {
                    let element = ress.genres[key];
                    option.value = element.name;
                    option.textContent = element.name;
                }
                sGenre.appendChild(option);
            };

            for (let key in ress.genres) {
                let option=document.createElement('option');
                if (ress.genres.hasOwnProperty(key)) {
                    let element = ress.genres[key];
                    option.value = element.name;
                    option.textContent = element.name;
                }
                pGenre.appendChild(option);
            };

            for (let key in ress.countries) {
                let option=document.createElement('option');
                if (ress.countries.hasOwnProperty(key)) {
                    let element = ress.countries[key];
                    option.value = element.name;
                    option.textContent = element.name;
                }
                sCountry.appendChild(option);
            };

            for (let key in ress.artist) {
                let option=document.createElement('option');
                if (ress.artist.hasOwnProperty(key)) {
                    let element = ress.artist[key];
                    option.value=element.title;
                    option.textContent=element.title;
                }
                pArtist.appendChild(option);
            };

        }).catch(errr=>{
            console.log(errr);
        })
    }).catch(err=>{
        console.log(err);
    })

}

const addList=()=>{
    let btnsAdd=document.querySelectorAll(".btn-add");
    let listMusic=document.querySelector("#view-list-music");
    let listUrl=document.querySelector("#view-list-urls");
    let inpMusic=document.querySelector("#newMusic");
    let inpLink=document.querySelector("#newLink");
    let mssgM=document.querySelector("h6#message-musics");
    let mssgL=document.querySelector("h6#message-links");


    btnsAdd[0].onclick=(e)=>{
        e.preventDefault();
        helpAddList(listMusic,inpMusic.value);
        containerListMusics();
        mssgM.textContent="agregado a la lista";
        mssgM.style.opacity="1";
        setTimeout(() => {
        mssgM.style.opacity=".3"; 
        }, 3000);
    };
    btnsAdd[1].onclick=(e)=>{
        e.preventDefault();
        helpAddList(listUrl,inpLink.value);
        containerListMusics();
        mssgL.textContent="agregado a la lista";
        mssgL.style.opacity="1";
        setTimeout(()=>{
            mssgL.style.opacity=".3";
        },3000)
    };
}
const helpAddList=(list,value)=>{
    let li=document.createElement('li');
    let p=document.createElement('p');
    let a=document.createElement('a');
    a.href="#delete";
    a.innerHTML="eliminar";
    p.innerHTML=value;
    li.append(p);
    li.append(a);
    list.append(li);
}
addList();

const sendDateAl=async(form)=>{
    let formdata=new FormData(form);
    let list=getDataList(document.querySelectorAll("#show-list-musics>ol>li>p"),document.querySelectorAll("#show-list-urls>ol>li>p"));
    formdata.append('music',list[0]);
    formdata.append('links',list[1]);
    formdata.append('faction',form.getAttribute('act'));
    formdata.append('formid',form.getAttribute('id'));
    formdata.append('oldtitle',form.title.getAttribute('oldtitle'))
    let send=await fetch('/admin/crud',{method:'post',body:formdata});
    return await send.json();
}
const initializeAl=()=>{
    let form=document.querySelector("form#new-album");
    form.onsubmit=(e)=>{
        e.preventDefault();
        openLoader();
        sendDateAl(form).then(res=>{
            closeLoader();
            if (res.state){
                console.log(res.message);
                messageRes({type:"res",message:res.message});
            }else{
                console.log(res.message);
                messageRes({type:"err",message:res.message});
                if(res.message.includes('title')){
                    focusErrors('title');
                }
            }
        }).catch(err=>{
            closeLoader();
            console.error(err);
            messageRes({type:"err",message:err});
        })
    }   
    getDataForn();
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
const focusErrors=(e)=>{
    switch (e) {
        case "title":
            document.querySelector("form#new-album>input[name='title']").focus();
            break;
    
        default:
            break;
    }
}
initializeAl();
