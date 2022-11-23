

class World{
    constructor(){

        this.functions=[]
		this.R=[]
		this.play=false
		this.L=[]
		this.gravity=true

        
        this.SHOWGRID=true
        this.SHOWMINIGRID=true

        this.SHOWAXIS=true
        this.SHOWNUMBERS=[true,true]
        this.ZOOMTOMOUSE=true
        this.GRIDLENGTH=70
        this.Origine=createVector(windowWidth/3,windowHeight/2)
        this.i=createVector(this.GRIDLENGTH,0)
        this.j=createVector(0,-this.GRIDLENGTH)
        this.I=createVector(1,0)
        this.J=createVector(0,1)

        this.points=[]
        this.segs=[]


        this.AX=new Axe(this.Origine,1)
        this.AY=new Axe(this.Origine,0)
        this.pointIsSelected=false
        this.selected=[]
        this.ActiveSelection
        
        this.panel = document.getElementById('panel')

    }
// zoom
    zoomWheel(u,off){
        let e=exp(-u.delta/3000)

        if(this.ZOOMTOMOUSE)
        {      
            let OA=createVector(u.x-this.Origine.x-off.x,u.y-this.Origine.y)
            OA.mult(1-e)
            this.Origine.add(OA)
        }

        this.zoom(e)

    }

    zoom(e){
        this.i.mult(e)  
        this.j.mult(e)  
        this.Zoom*=e  
        this.functions.forEach(e => {
            e.update()
        }); 

    }
//SHOW AND APDATE
    update(){
        this.functions.forEach(e => {
            e.update()
        }); 
    }
    showGrid(){

        
        stroke(220,8,23)
        fill(0)
        strokeWeight(0.5)
        let r,rm,offsit,w=this.i.x,h=this.j.y;
        
        

     
        let base ,Nbase,lower,dec
        base=floor(log(w)/log(10))          
        dec=w/10**base                     //between [1,10[
        
        Nbase=dec<5?dec<2?1:2:5;

        lower=Nbase*10**(base-2)


        let gridwidth=w/lower
        offsit=this.Origine.x%(gridwidth)
        for (let k = -1; k < windowWidth/this.GRIDLENGTH; k++) {
            

            r=offsit+k*gridwidth
            if (this.SHOWGRID) {
                strokeWeight(0.6)
                line(r,0,r,windowHeight)
               
            }
            rm=0
            if (this.SHOWMINIGRID&&this.SHOWGRID) {
                strokeWeight(0.2)
                for (let s = 1; s < (Nbase==2?5:4); s++) {
                    rm=r+s*gridwidth/(Nbase==2?5:4)
                    line(rm,0,rm,windowHeight)
                }
            }

            if (this.SHOWNUMBERS[0]) {
                let minmax=this.Origine.y>windowHeight-margin[1]-20?windowHeight-margin[1]-20:this.Origine.y<0?0 :this.Origine.y                
                text(((k-int(this.Origine.x/gridwidth))/lower), /**/ offsit+k*gridwidth  -16 /**/, minmax+16)
            }               
            
        }

        offsit=this.Origine.y%gridwidth

        for (let k = -1; k<windowHeight/this.GRIDLENGTH; k++) {
            
            r=offsit+k*gridwidth

            if (this.SHOWGRID) {
                strokeWeight(0.6)
                line(0,r,windowWidth,r)
            }

            if (this.SHOWMINIGRID&&this.SHOWGRID) {
                strokeWeight(0.2)
                rm=0
                for (let s = 0; s < (Nbase==2?5:4); s++) {
                    
                    rm=r+s*gridwidth/(Nbase==2?5:4)
                    line(0,rm,windowWidth,rm)
                    
                }
            }

            if (this.SHOWNUMBERS[1]) {
                let minmax=this.Origine.x>windowWidth-margin[0]?windowWidth-margin[0]:(this.Origine.x<0?20:this.Origine.x)                 

                text((-(k-int(this.Origine.y/gridwidth))/lower),minmax-16,/**/  offsit+k*gridwidth+16  /**/)
            }
                
        }


        
    }
    showAxis(){

        if (this.SHOWAXIS) {
            stroke(51)
            strokeWeight(1.5)

            this.AX.show()
            this.AY.show()
        }

    }
    show(){
        this.showGrid()
        this.showAxis()
        this.points.forEach(p => {
            p.show()
            
        });

        this.segs.forEach(p=>{
            p.show()
        })
        this.functions.forEach(e => {
            e.show()
        }); 
    }
// COORDINATING
    Xtox(X){
        return (X-this.Origine.x)/this.i.x
    }

    xtoX(x){
        return (x*this.i.x+this.Origine.x)
    }

    Ytoy(Y){
        return (Y-this.Origine.y)/this.j.y
    }

    ytoY(y){
        return (y*this.j.y+this.Origine.y)
    }
    fromScreenToWorld(X,Y){
        // a fun that takes two screen coords X,Y
        // to transfer it to world coords  x,y
        let v=createVector(X,Y).sub(this.Origine)

        return createVector(v.x/this.i.x,v.y/this.j.y)

    }
    fromWorldToScreen(x,y){
        // a fun that takes two  world coords x,y
        // to transfer it to screen coords X,Y 

        let X= x*this.i.x, Y=y*this.j.y

       return createVector(X,Y).add(this.Origine)

         

    }
// ADD ELEMENTS
    addPoint(A){
        //let A=new Point(x,y,true)
        this.points.push(A)
        A.addToPanel()
    }
    addSegm(A,B){
        let S=new Seg(A,B)

        this.segs.push(S)
    }
    addFun(f){
        let fx=new Fun(f)
        this.functions.push(fx)
        fx.addToPanel()
    }




}

class Axe{
    constructor(o,x=1){
        this.O=o
        this.dir=0
        this.isX=x
        this.col
    }

    show(){
        stroke(0)
       if(this.isX){
        line(0,this.O.y,windowWidth,this.O.y)
       } 
       else{
        line(this.O.x,0,this.O.x,windowHeight)
       }
        
    }
}

class Point{
    static n=0
    constructor(p=createVector(0,0),y=10,isScreenCoords=true){
        
        this.n=Point.n++

        if (p instanceof p5.Vector) {
            this.p=p
        } else {
            if (isScreenCoords) {
                this.p=world.fromScreenToWorld(p,y)
            } else {
                this.p=createVector(p,y)
            }
        }

            this.SHOWLABEL=true
            this.selected=false
            this.showen=true
            this.name
            this.col='blue'
    }
    dist(X,Y,byPixel=true){
        return world.fromWorldToScreen(this.p.x,this.p.y).dist(createVector(X,Y))
    }
    get X(){
        //screen coords
        return world.xtoX(this.p.x)
    }   
    get Y(){
        return world.ytoY(this.p.y)
    }
    get x(){
        //screen coords
        return this.p.x
    }   
    get y(){
        return this.p.y
    }
    get content(){
        return this.name+" = ("+decimalize(this.x)+","+decimalize(this.y)+")"  
    }
    highLight(){
                
        stroke(203,200,255)

        strokeWeight(15)

        point(this.X,this.Y)
    }
    get name(){
                stroke(0)
        strokeWeight(0)

        let l=this.n%26
        let n=int(this.n/26)
        return n==0?String.fromCharCode(l+65):String.fromCharCode(l+65)+n
    }
    showName(){
        text(this.name,this.X+7,this.Y-5)
    }
    showLabel(){
        if(this.SHOWLABEL){
            text("("+decimalize(this.x)+","+decimalize(this.y)+")",this.X+7,this.Y+8)
        }
    }
    
    show(){
        this.showName()
        this.showLabel()
        if (this.selected) {
            this.highLight()
        }
        //stroke(this.col)
        //strokeWeight(8)

        point(this.X,this.Y)
    }

    addToPanel(){
        appendObjToPanel(this)
    }
}
class Seg{
    constructor(A,B){
        this.A=A
        this.B=B
    }

    show(){
        line(A.X,A.Y,B.X,B.Y)
    }
}