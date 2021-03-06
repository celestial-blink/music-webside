var dataDelete={};
const editDelete=()=>{
    let btnsEdit=document.querySelectorAll(".text-info>a:first-child");
    let btnsDelete=document.querySelectorAll(".text-info>a:last-child");
    let title=document.querySelector("#content-load>h1");
    // let parent=document.querySelector(".text-info").parentElement;
    let data={};
    console.log(title.textContent);
    let b=true;
    btnsEdit.forEach(e=>{
            e.onclick=(ev)=>{
                let parent=ev.target.parentElement.parentElement;
                if (title.textContent=="Artistas"){
                    data={
                        ...{genre:(JSON.parse(parent.getAttribute('info')).genre[0].name)},
                        ...{description:(JSON.parse(parent.getAttribute('info')).description)},
                        ...{country:(JSON.parse(parent.getAttribute('info')).country[0].name)},
                        ...{cover:(JSON.parse(parent.getAttribute('info')).cover)},
                        ...{title:(JSON.parse(parent.getAttribute('info')).title)},
                        ...{creation:(JSON.parse(parent.getAttribute('info')).creation.split('T')[0])}
                    }

                let formArtist=document.querySelector('#new-artist');
                formArtist.title.setAttribute('oldtitle',data.title);
                formArtist.title.value=data.title;
                formArtist.genre.value=data.genre;
                formArtist.description.value=data.description;
                formArtist.country.value=data.country;
                formArtist.date.value=data.creation;
                formArtist.setAttribute('act','update');
                formArtist.cover.setAttribute('oldcover',data.cover);

                }else if (title.textContent=="Albumes"){
                    data={
                        ...{artist:(
                            (JSON.parse(parent.getAttribute('info')).artist.length!=0)?
                            JSON.parse(parent.getAttribute('info')).artist[0].title:""
                            )},
                        ...{musics:(JSON.parse(parent.getAttribute('info')).music)},
                        ...{genre:(JSON.parse(parent.getAttribute('info')).genre[0].name)},
                        ...{cover:(JSON.parse(parent.getAttribute('info')).cover)},
                        ...{links:(JSON.parse(parent.getAttribute('info')).links)},
                        ...{title:(JSON.parse(parent.getAttribute('info')).title)}
                    }
                    console.log(data);
                let formAlbums=document.querySelector("#new-album");
                formAlbums.artist.value=data.artist;
                formAlbums.title.setAttribute('oldtitle',data.title);
                formAlbums.title.value=data.title;
                let listMusics=document.querySelector("#view-list-music");
                let lisM=document.querySelectorAll("#view-list-music>li");
                lisM.forEach(e=>{
                    listMusics.removeChild(e);
                })
                data.musics.forEach(e=>{
                    let li=document.createElement('li');
                    let p=document.createElement('p');
                    let a=document.createElement('a');
                    a.href="#delete";
                    a.textContent="eliminar";
                    p.textContent=e;

                    li.appendChild(p);
                    li.appendChild(a);
                    listMusics.appendChild(li);
                });
                containerListMusics();
                formAlbums.genre.value=data.genre;
                let listLinks=document.querySelector("#view-list-urls");
                let lisU=document.querySelectorAll("#view-list-urls>li");
                lisU.forEach(e=>{
                    listLinks.removeChild(e);
                })
                data.links.forEach(e=>{
                    let li=document.createElement('li');
                    let p=document.createElement('p');
                    let a=document.createElement('a');
                    a.href="#delete";
                    a.textContent="eliminar";
                    p.textContent=e;

                    li.appendChild(p);
                    li.appendChild(a);
                    listLinks.appendChild(li);
                });
                containerListMusics();
                formAlbums.setAttribute('act',"update");
                formAlbums.cover.setAttribute('oldcover',data.cover);


                }else if (title.textContent=="Noticias"){
                    data={
                        ...{title:(JSON.parse(parent.getAttribute('info')).title)},
                        ...{cover:(JSON.parse(parent.getAttribute('info')).cover)},
                        ...{link:(JSON.parse(parent.getAttribute('info')).link)},
                        ...{artist:(JSON.parse(parent.getAttribute('info')).artist[0]==undefined)?"":(JSON.parse(parent.getAttribute('info')).artist[0].title)},
                        ...{description:(JSON.parse(parent.getAttribute('info')).description)}
                    }
                let formNews=document.querySelector("#new-news");
                    formNews.title.setAttribute('oldtitle',data.title);
                    formNews.cover.removeAttribute('required');
                    formNews.title.value=data.title;
                    formNews.description.value=data.description;
                    formNews.link.value=data.link;
                    formNews.artist.value=data.artist;
                    formNews.setAttribute('act','update');
                    formNews.cover.setAttribute('oldcover',data.cover);
                }
                
                         console.log(data);
            }
            
        btnsDelete.forEach(e=>{
            e.onclick=(ev)=>{
                data={
                    ...{id:(JSON.parse(ev.target.parentElement.parentElement.getAttribute('info')))._id},
                    ...{faction:"delete"},
                    ...{from:title.textContent},
                    ...{oldcover:(JSON.parse(ev.target.parentElement.parentElement.getAttribute('info'))).cover}
                }
                dataDelete={...data};
            };
        });

    });
}
const sendDataDelete=async(data)=>{
    let formdata=new FormData();
    formdata.append('id',data.id);
    formdata.append('faction', data.faction);
    formdata.append('from', data.from);
    let sendData=await fetch('/admin/crud',{method:'post',body:formdata});
    return await sendData.json();
}
editDelete();