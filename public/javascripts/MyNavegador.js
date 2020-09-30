const navegador=()=>{
    console.log("estoy desdde navegador")
    let btnMenu = document.querySelector("#btn-menu")
    let btnIcon = document.querySelectorAll("#btn-menu>span")
    let state = true
    if (btnMenu!=null){
        btnMenu.onclick=()=>{
            btnMenu.href="#"
            if(state){
                state=false
                btnMenu.href="#mi_menu"
                changeIcon(btnIcon)
                btnMenu.parentNode.style.position="fixed"
            }else{
                state=true
                btnMenu.href="#"
                changeIcon(btnIcon)
                btnMenu.parentNode.style.position="absolute"
            }
        }
    }
}
const changeIcon=(e)=>{
    e[0].classList.toggle("icon-one")
    e[1].classList.toggle("icon-two")
    e[2].classList.toggle("icon-three")
}
navegador()
