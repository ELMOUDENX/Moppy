window.addEventListener("contextmenu",function(event) {
console.log(event);
    let s=event.target
   event.preventDefault();    
    if (s.className=="pItem"||s.className=="content") {
            console.log(s);

    }   
    
 
    var contextElement = document.getElementById("context-menu");
    contextElement.style.top = mouseY + "px";
    contextElement.style.left = mouseX + "px",
    contextElement.classList.add("active");
    console.log(window.innerHeight-contextElement.offsetHeight)
    console.log(mouseY)
    
    if (mouseY > window.innerHeight-contextElement.offsetHeight) {
        contextElement.style.top= mouseY - contextElement.offsetHeight + "px";
        contextElement.style.transformOrigin = "bottom left";
    } else if (mouseY < window.innerHeight-contextElement.offsetHeight) {
        contextElement.style.transformOrigin = "top left";
    }
    if (mouseX > window.innerWidth-contextElement.offsetWidth) {
        contextElement.style.left= mouseX - contextElement.offsetWidth + "px";
        contextElement.style.transformOrigin = "top right"
    }
    
    if (mouseX > window.innerWidth-contextElement.offsetWidth && mouseY > window.innerHeight-contextElement.offsetHeight) {
        contextElement.style.transformOrigin = "bottom right";
    }
    
})

window.addEventListener("click", function() {
    document.getElementById("context-menu").classList.remove("active")
})
window.addEventListener("click", function() {
    
})

HTMLElement.prototype.appendFirst = function(childNode) {
    if (this.firstChild) {
        this.insertBefore(childNode, this.firstChild);
    }
    else {
        this.appendChild(childNode);
    }
};

function appendObjToPanel(obj){

    let pItem,pContnt,chbx
        
    panel = document.getElementById('panellist')
        pItem = document.createElement('div' )
        pItem.className='pItem' 
        pItem.id=obj.name+"itm"

            chbx = document.createElement('input' )
            chbx.type='checkbox'
            chbx.className='pItemChbx' 
            chbx.id=obj.name+"cb"
            chbx.onchange= () => {toggleShow(obj)}
            chbx.checked=true


            pContnt= document.createElement('span' )
            pContnt.className='content' 
            pContnt.textContent = obj.content 
            pContnt.id=obj.name
        pItem.appendChild(chbx);
        pItem.appendChild(pContnt);
        
    panel.appendChild(pItem);

}

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(){
    
}