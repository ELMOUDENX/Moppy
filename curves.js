class Fun{
    static nameL=["f","g","h","p","q","r","s"]
    static i=0
    constructor(f){
        this.f=f // expression as a string of x, support continuous functions now
        this.segs=[] // array of segs
        this.n=300 // step size
        this.range=[world.Xtox(0),world.Xtox(windowWidth)]//xmin xmax
        this.colHu=random(360)
        this.construct()
        this.name
        
        this.i=Fun.i
        Fun.i++
        
    }

    fun(x){
        return eval(this.f)
    }

    construct(){
        this.h=(this.range[1]-this.range[0])/this.n
        let x,lastX=this.range[0] , y,lastY=this.fun(lastX)
        x=lastX

        for (let i = 1; i <=  this.n; i++) {
            x+=this.h
            y=this.fun(x)
            this.segs.push(new Segf(lastX,lastY,x,y,this.colHu))
            lastX=x
            lastY=y
        }

        
    }

    update(){
        this.range=[world.Xtox(0),world.Xtox(windowWidth)]//xmin xmax
        this.segs=[]
        this.construct()
    }
    show(){

        this.segs.forEach(e=>{
            e.show()
        })
    }


    get content(){
        return this.name+"(x) =  "+this.f  
    }
    get name(){
        stroke(0)
        strokeWeight(0)

        let l=Fun.nameL[Fun.i%7-1]  
        let n=int(this.i/7)
        return n==0?l:l+n
    }
    
    addToPanel(){
        appendObjToPanel(this)
    }
}

class Segf{
    constructor(a,ya,b,yb,c){
        this.a=a
        this.ya=ya
        this.b=b
        this.yb=yb
        this.colHue=c

        

    }
    get X1(){
        return world.xtoX(this.a)
    }
    get X2(){
        return world.xtoX(this.b)
    }
    get Y1(){
        return world.ytoY(this.ya)
    }
    get Y2(){
        return world.ytoY(this.yb)
    }

    show(){
        stroke(this.colHue, 100, 55)//color
       // console.log(this.colHue);
        strokeWeight(5)//width
        line(
            this.X1,
            this.Y1,
            this.X2,
            this.Y2  )
    }
}