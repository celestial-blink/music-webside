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
    let distr=Math.ceil((parseInt(object.count)/4));
    let lia=[];
    let diva=[];
    let gr=0;
    for (let obj in object.artist){
        let a=document.createElement('a');
        let li=document.createElement('li');
        a.textContent=object.artist[obj].title;
        a.href="#link";
        li.appendChild(a);
        if(gr<3){
            lia.push(li);
        }
    }
    
    for (let group=0;group<distr;group++){
        let div=document.createElement('div');
        div.classList.add("group-artist");
        let ul=document.createElement('ul');
        lia.forEach(v=>{
            console.log(v);
            ul.appendChild(v);
        });
        div.appendChild(ul);
        container.appendChild(div);
    }
        
        // for(let group=0; group<distr; group++){
            //     let a=document.createElement('a');
        //     let li=document.createElement('li');
        //     a.textContent="take";
        //     a.href="#link";
        //     li.appendChild(a);
        //     ul.appendChild(li);
        //     div.appendChild(ul);
        //     container.appendChild(div);
        // }
    
    
}
getDataArtists();