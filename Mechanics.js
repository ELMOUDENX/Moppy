
class Dot extends Point{
	constructor(x=0,y=0,sc=true){
		super(x,y,sc)
		this.fix=false
	}
    
	set(v){

		if(!this.fix) this.p.add(v)	
		
	}
    setp(v){

		if(!this.fix) this.p = v
		
	}
	chng() {

	}
	update(){
		if(!this.fix && !this.selected && world.gravity) this.p.add(new p5.Vector(0,-.04))
	}
	show(){

		if(this.showen){

			this.showName()
            this.showLabel()
			fill(this.col)
			if(this.fix==true) fill(250,20,20)
			if(this.selected==true)
			{
					fill(20,20,19) 
					
			}

			strokeWeight(1)
			ellipse(this.X,this.Y,10)
		}
	}
}
class Rot extends Dot{
	constructor(x=0,y=0,r=36){
		super(x+r,y)
		this.c=new p5.Vector(x,y)
		this.fix=true
		this.selected=false
		this.r=r
		//this.link=new Rigg()
	}
	chng(){
		if (keyIsDown(88)) {
			this.r=this.c.dist(this.p)
		}
	}
	update(){

		this.p=new p5.Vector(this.c.x+this.r*cos(t),this.c.y+this.r*sin(t))
	}
	show(){
		
		//if(this.fix==true) fill(250,20,20)
		if(this.selected==true) fill(200,250,19)
			fill(106,120,20)
		strokeWeight(0)
		ellipse(this.X,this.Y,10)
		ellipse(world.xtoX(this.c),world.ytoY(this.c))
		line(this.X,this.Y,world.xtoX(this.c),world.ytoY(this.c))

	}
}
class Rig{
	static n=0
	constructor(a=new Dot(),b=new Dot()){
		this.A=a
		this.B=b
		this.l=this.A.p.dist(this.B.p)
		this.showen=true
		this.n=Rig.n++
		this.addToPanel()

	}

	update(){
		if (keyIsDown(88)) {
			this.l=this.A.p.dist(this.B.p)
		}
		let d=p5.Vector.sub(this.B.p,this.A.p)
		let v=p5.Vector.mult(d,0.8*(1-this.l/d.mag()))
		this.A.set(v)
		v.mult(-1)
		this.B.set(v)

	}

    addToPanel(){
        appendObjToPanel(this)
    }
	show(){
		if (this.showen) {
			stroke(2)
			strokeWeight(4)
			line(this.A.X,this.A.Y,this.B.X,this.B.Y)
		}

	}
	get name(){
		let l=this.n%26
		let n=int(this.n/26)
		return n==0?String.fromCharCode(l+65):String.fromCharCode(l+65)+n
	}
	get content(){
        return this.n==0 ?"Rig":"Rig"+this.n
    }
}

class Barr extends Rig{
    constructor(a=new Dot(),b=new Dot(),c){
        super()
		this.A=a
		this.B=b
        this.C=c

		this.l = this.A.p.dist(this.B.p)
		this.l2 = this.C.p.dist(this.A.p)
       this.lam=2

	}

	update(){
		if (keyIsDown(88)) {
			this.l=this.A.p.dist(this.B.p)
		}
		let d=p5.Vector.add(this.B.p,-this.A.p)
		let v=p5.Vector.mult(d,0.8*(1-this.l/d.mag()))
		this.A.set(v)
		v.mult(-1)
		this.B.set(v)


        this.C.setp(p5.Vector.add(this.A.p,p5.Vector.mult(p5.Vector.add(this.B.p,-this.A.p),this.lam)))

	}


	show(){
        stroke(150,200,130)
		strokeWeight(4)
		line(this.A.X,this.A.Y,this.C.X,this.C.Y)
        this.C.show()

	}
}