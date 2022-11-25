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
    contextElement.classList.add("active")

})

window.addEventListener("click", function() {
    document.getElementById("context-menu").classList.remove("active")
    
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

