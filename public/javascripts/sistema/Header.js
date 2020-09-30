const closeSession=()=>{
    let parameter=new URLSearchParams();
    parameter.append('close','cerrar');
    fetch('',{method:'GET',body:parameter}).catch(err=>{
        console.log('se produjo un error');
    })
}
closeSession();