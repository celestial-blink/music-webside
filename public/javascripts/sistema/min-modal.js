const containerListMusics=()=>{
    let listMusics=document.querySelector("#show-list-musics>ol");
    let valueListMusics=document.querySelectorAll("#show-list-musics>ol>li>p");
    let btnListMusics=document.querySelectorAll("#show-list-musics>ol>li>a");
    let inputEditMinModel=document.querySelector("#minModal-edit");
    let btnMinModelOk=document.querySelector("#minModal-ok");


    btnMinModelOk.onclick=(e)=>{
        e.preventDefault()
        let ho=getDataList(document.querySelectorAll("#show-list-musics>ol>li>p"),document.querySelectorAll("#show-list-urls>ol>li>p"));

    }

    valueListMusics.forEach( e =>{
        e.onclick=()=>{
            inputEditMinModel.value=e.textContent.trim();
            btnMinModelOk.onclick=(b)=>{
                b.preventDefault();
                e.textContent=inputEditMinModel.value;
                console.log(getDataList(document.querySelectorAll("#show-list-musics>ol>li>p"),document.querySelectorAll("#show-list-urls>ol>li>p")));
            }
        }
    });

    btnListMusics.forEach( e =>{
        e.onclick=(b)=>{
            b.preventDefault()
            listMusics.removeChild(e.parentElement)
        };
    });

    let listUrls=document.querySelector("#show-list-urls>ol");
    let valueListUrls=document.querySelectorAll("#show-list-urls>ol>li>p");
    let btnListUrls=document.querySelectorAll("#show-list-urls>ol>li>a");

    containerListUrls(listUrls,valueListUrls,btnListUrls,inputEditMinModel,btnMinModelOk);

}

const containerListUrls=(lisM,valM,btnM,ediM,btnE)=>{
    
    btnE.onclick=(e)=>{
        e.preventDefault()
        let ho=getDataList(document.querySelectorAll("#show-list-musics>ol>li>p"),document.querySelectorAll("#show-list-urls>ol>li>p"));
        console.log(ho)
    }

    valM.forEach( e =>{
        e.onclick=()=>{
            ediM.value=e.textContent.trim();
            btnE.onclick=(b)=>{
                b.preventDefault();
                e.textContent=ediM.value;
                console.log(getDataList(document.querySelectorAll("#show-list-musics>ol>li>p"),document.querySelectorAll("#show-list-urls>ol>li>p")));
            }
        }
    });

    btnM.forEach( e =>{
        e.onclick=(b)=>{
            b.preventDefault()
            lisM.removeChild(e.parentElement)
        };
    });

}


const getDataList=(element1,element2)=>{
    let takees=[];
    let one=[];
    let two=[];
    element1.forEach(e=>{
        one.push(e.textContent)
    })
    element2.forEach(e=>{
        two.push(e.textContent)
    })
    takees.push(one)
    takees.push(two)
    return takees;
}

containerListMusics();

const showMessageMAr=(message)=>{
    let h4=document.querySelector("#new-artist>h4");
    console.log(h4);
    h4.style.cssText=(message.type=="err")?"background-color:#ff1515;display:block":"background-color:#04e11e;display:block";
    h4.textContent=message.message;
    getDataForn();
    setTimeout(()=>{
        h4.style.opacity=".4";
        setTimeout(()=>{
            h4.style.display="none";
        },2000)
    },3000)
}

const sendDataAr=async(form)=>{
    let formdata=new FormData(form);
    formdata.append('faction',form.getAttribute('act'));
    formdata.append('formid',form.getAttribute('id'));
    
    let send=await fetch('/admin/crud',{
        body:formdata,
        method:'POST'
    });
    let getJson=await send.json();
    return getJson;
}
const initializeAr=()=>{
    let formArtist=document.querySelector("form#new-artist");
    formArtist.onsubmit=(e)=>{
        openLoader();
        e.preventDefault();
        sendDataAr(formArtist).then(res=>{
            closeLoader();
            if(res.state){
                console.log(res.message);
                showMessageMAr({type:"ok",message:res.message});
            }else{
                console.log(res.message);
                showMessageMAr({type:"err",message:res.message});
            }
        }).catch(err=>{
            console.error(err);
            showMessageMAr({type:"err",message:err.message});
        })
    }
}
initializeAr();

