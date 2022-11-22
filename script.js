window.addEventListener("contextmenu",function(event) {
    // this eliminate the default C.Menu
    event.preventDefault();
    var contextElement = document.getElementById("context-menu");
    contextElement.style.top = event.offsetY + "px";
    contextElement.style.left = event.offsetX + "px",
    contextElement.classList.add("active")
})

window.addEventListener("click", function() {
    document.getElementById("context-menu").classList.remove("active")
    
})



var sideTableBtn = document.getElementById("table-btn")

