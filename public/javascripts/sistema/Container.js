const linkPage=()=>{
    let btns=document.querySelectorAll(".con-wrapper>.bt>a");
    let sav="";
    btns.forEach(e=>{
        e.onclick=()=>{
            sav=(window.location==`${window.location.origin}${window.location.pathname}`)?`?view=artistas${e.getAttribute('href')}`:e.getAttribute('href');
            e.href=window.location.toString().split("&")[0]+sav
        }
    });
}
linkPage();
const openNewAgregate=()=>{
    let btn=document.querySelector(".tp>#btn-new-agregate");
    btn.onclick=()=>{
        let formName=document.querySelector("#content-load>h1");
        switch(formName.textContent){
            case "Artistas":
                let formArtist=document.querySelector("#new-artist");
                formArtist.setAttribute('act',"insert");
                formArtist.reset();
            break;
            case "Albumes":
                let formAlbum=document.querySelector("#new-album");
                formAlbum.setAttribute('act',"insert");
                formAlbum.reset();
                let listMusic=document.querySelectorAll("#view-list-music>li");
                if (listMusic.length!=0){
                    listMusic.forEach(e=>{
                        e.parentElement.removeChild(e);
                    })
                }

            break;

            case "Noticias":
                let formNews=document.querySelector("#new-news");
                formNews.setAttribute('act',"insert");
                let requi=document.createAttribute('required');
                formNews.cover.setAttributeNode(requi);
                formNews.reset();
            default:
                console.log("error al navegar");
                break;
        }
    }
}
openNewAgregate();

const Search=()=>{
    let search=document.querySelector("nav.tp>input[type='search']");
    let sav="";
    search.onsearch=()=>{
        sav=(window.location==`${window.location.origin}${window.location.pathname}`)?
        `?view=artistas&search=${search.value}`:
        `${window.location.toString().split("&")[0]}&search=${search.value}`;
        window.location.href=sav;
    };
}
Search();