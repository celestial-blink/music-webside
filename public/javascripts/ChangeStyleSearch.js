const ChangeStyleSearch=()=>{
    let head=document.head
    let styleSearch=document.createElement("link")
    styleSearch.rel="stylesheet"
    styleSearch.href=(window.location.pathname=="/")?"/stylesheets/lupa.css":"/stylesheets/lupa2.css"
    head.appendChild(styleSearch)
}
ChangeStyleSearch();