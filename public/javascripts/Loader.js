const openLoader=()=>{
    let content=document.querySelector("#loader-wrapper");
    let animation=document.querySelectorAll("#loader-wrapper>div");
    content.style.display="flex";
    animation.forEach(e=>{
        e.style.cssText="animation-play-state:running;";
    })
}
const closeLoader=()=>{
    let content=document.querySelector("#loader-wrapper");
    let respuesta=document.querySelector("#mi-respuesta");
    let animation=document.querySelectorAll("#loader-wrapper>div");
    respuesta.textContent="";
    respuesta.style.color="var(--color-text)";
    animation.forEach(e=>{
        e.style.cssText="animation-play-state:paused;";
    })
    setTimeout(()=>{
        content.style.display="none";
    },1000);
    console.log();
}