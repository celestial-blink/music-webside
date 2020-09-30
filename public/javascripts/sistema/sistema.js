const contentModal = () => {
    let rutas=document.querySelectorAll("#menu-buttons>a");
    rutas.forEach((v)=>{
        v.onclick=(e)=>{
            e.preventDefault()
            getContentModal("take").then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.error(error,`-> ${err}`)
            })
        }
    })

}
const getContentModal=async(d)=>{
    let urlencoded = new URLSearchParams();
    urlencoded.append("view", d);
    let envio=await fetch("",
                    {method:"get",body:urlencoded})
    let respuesta=await envio.text()
    return respuesta
}

// contentModal()
window.addEventListener("scroll",(e)=>{
    if(window.scrollY>=100){
      document.querySelector(".sm-wrapper").style.cssText=`position:fixed;left:0`;  
    }else{
        document.querySelector(".sm-wrapper").style.cssText=`position:relative;`;  
    }
})