var deleteDocument=false;
const initializeConfirmation=()=>{
    let btns=document.querySelectorAll("#btn-acept-cancel>a");
    btns[0].onclick=(e)=>{
        e.preventDefault();
        deleteDocument=true;
        console.log(dataDelete);
        window.location.href=window.location.href.split("#")[0]+"#ok";
            openLoader();
            sendDataDelete(dataDelete).then(res=>{
                 closeLoader();
                 if (res.state){
                     console.log(res);
                     setTimeout(()=>{
                         window.location.href=window.location.href.split("#")[0];
                     },1200)
                 }else{
                     console.log(res.message);
                 }
            }).catch(err=>{
                 closeLoader();
                 console.log(err);
            });
    }

    btns[1].onclick=(e)=>{
        e.preventDefault();
        window.location.href=window.location.href.split("#")[0]+"#close";
    }
}
initializeConfirmation();