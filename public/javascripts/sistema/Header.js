const closeSession=()=>{
    fetch('?close=close',{method:'GET'}).then(res=>{
        location.reload();
    }).catch(err=>{
        console.log(err);

    });
}
const initializeCloseSession=()=>{
    let btn=document.querySelector(".hs-wrapper>.user>a");
    console.log(btn);

    btn.onclick=(e)=>{
        e.preventDefault();
        console.log("hola")
        closeSession();
    }
}
initializeCloseSession();