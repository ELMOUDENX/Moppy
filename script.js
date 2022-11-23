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

        chbx   = document.createElement('input' )
        chbx.type='checkbox'

        chbx.className='pItemChbx' 

        chbx.id=obj.name+"chbx"

        pContnt= document.createElement('div' )
        pItem.className='pItem' 
        pItem.id=obj.name

        pContnt.textContent = obj.content 

        pItem.appendChild(chbx);
        pItem.appendChild(pContnt);

    panel.appendChild(pItem);

}


