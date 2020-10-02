const getDataArtists=()=>{
    fetch('',{method:'post'}).then(res=>{
        let response=res.json();
        response.then(ress=>{
            console.log(ress);
            if(ress.state){
                console.log(typeof ress.artist);
                createGroupArtists({count:ress.count,artist:ress.artist});
            }
        }).catch(errr=>{
            console.log(errr);
        })
    }).catch(err=>{
        console.log(err);
    })
}
const createGroupArtists=(object)=>{
    let container=document.querySelector('#cont-artist');
    let div=document.createElement('div');
    div.classList.add("group-artist");
    let lia=[];

    for (let obj in object.artist){
        let a=document.createElement('a');
        let li=document.createElement('li');
        a.textContent=object.artist[obj].title;
        a.href="#link";
        li.appendChild(a);
        lia.push(li);
    }
    
    let ul=document.createElement('ul');
    lia.forEach(e=>{
        ul.appendChild(e);
    });
    
    div.appendChild(ul);
    container.appendChild(div);
    
}
getDataArtists();