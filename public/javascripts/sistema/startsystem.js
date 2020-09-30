
const btnSystem=()=>{
    let btns=document.querySelectorAll("#btn-system>a");
    console.log(btns);
    btns[0].onclick=()=>{
        alertConfirmation("start");
    };
    btns[1].onclick=()=>{
        alertConfirmation("reset");
    };

}
btnSystem();
const miPeticion=async(data)=>{
    console.log("espere...");
    let datos=new URLSearchParams();
    datos.append("info",data);
    let respuesta=await fetch('',{
        body:datos,
        method:'POST'
    });

    let respuestaJSON=await respuesta.json();

    return respuestaJSON;
}
