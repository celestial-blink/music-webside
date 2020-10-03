const getDataTop=()=>{
    let p=document.querySelectorAll(".TopCard>.p_img>p");
    let title=document.querySelectorAll(".TopCard>a>h1.p_title");
    let images=[];
    let pN=document.querySelectorAll(".news>.n-img>p");
    let description=document.querySelectorAll(".news>p");
    let go=document.querySelectorAll(".news>a");
    console.log(go);
    let titleN=document.querySelectorAll(".news>h1");
    fetch('',{method:'post'}).then(res=>{
        let response=res.json();
        response.then(r=>{
            if(r.state){
                let index=0;
                    for (let key in r.top.albums) {
                        if (r.top.albums.hasOwnProperty(key)){
                            let img=new Image();
                            img.src=`/images/${r.top.albums[key].cover}`;
                            images.push(img);
                            title[index].textContent=r.top.albums[key].title;
                            index+=1;
                        }
                    };
                    let indexa=0;
                    images.forEach(ele=>{
                        ele.onload=()=>{
                            p[indexa].parentElement.appendChild(ele);
                            p[indexa].parentElement.removeChild(p[indexa]);
                            indexa+=1;
                        }
                    });


                    images=[];
                    let indexn=0;
                    for (let key in r.top.news){
                        if(r.top.news.hasOwnProperty(key)){
                            let img=new Image();
                            img.src=`/images/${r.top.news[key].cover}`;
                            images.push(img);
                            titleN[indexn].textContent=r.top.news[key].title;
                            description[indexn].textContent=r.top.news[key].description;
                            go[indexn].href=r.top.news[key].link;
                            indexn+=1;
                        }
                    }

                    let indexns=0;
                    images.forEach(ele=>{
                        ele.onload=()=>{
                            pN[indexns].parentElement.appendChild(ele);
                            pN[indexns].parentElement.removeChild(pN[indexns]);
                            indexns+=1;
                        }
                    });

                }

        }).catch(e=>{
            console.log(e);
        })
    }).catch(err=>{
        console.log(err);
    })
}

getDataTop();