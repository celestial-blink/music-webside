const ListGenres=()=>{
    fetch("",{method:"post"}).then(res=>{
        res.json().then(ress=>{
            createListGenres({genres:ress.genres});
        }).catch(errr=>{
            console.log(errr);
        })
    }).catch(err=>{

    })
};

const createListGenres=(object)=>{
    let container=document.querySelector("#cont-genres");
    let div=document.createElement('div');
    div.classList.add("group-genres");
    let lia=[];
    for(let key in object.genres){
        let a=document.createElement('a');
        a.textContent=object.genres[key].name;
        a.href="#hli";
        let li=document.createElement('li');
        li.appendChild(a);
        lia.push(li);
    }
    let ul=document.createElement('ul');
    lia.forEach(e=>{
        ul.appendChild(e);
    })
    div.appendChild(ul);
    container.appendChild(div);
}
ListGenres();