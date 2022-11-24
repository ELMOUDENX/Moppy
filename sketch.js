let world,w=600
let offsit,t=0
let gg=document.querySelector("#grid")
let canvas,funExpr="Math.sin(3*x)"

let margin=[20,30]


//   SETUP DRAW  MAIN LOOP :


function setup() {
    smooth(2)
    colorMode(HSL,100)
    canvas=createCanvas( windowWidth-margin[0],windowHeight-margin[1] )
    world=new World()

    //world.addFun(funExpr)

    offsit=canvas.position()



    console.log(canvas.position()); 



    /*world.addPoint(new Dot(0,0,false))
    world.points[0].fix=true
    world.addPoint(new Dot(4,0,false))
    world.addPoint(new Dot(2,4,false))
    world.R.push(new Rig(world.points[0],world.points[1]))
    world.R.push(new Rig(world.points[1],world.points[2]))*/
}
function draw() {
    background(256)

    checkselection()
    world.R.forEach(r => {
            r.update()
            
    });
    world.points.forEach(p => {
        if(world.play){
            t+=0.005
            p.update()}
        
        if(p.selected) p.p=new p5.Vector(p.p.x,p.p.y)
        p.chng()
    });
    world.R.forEach(r => {
        
        r.show()
    });
    world.show()
    //noLoop()
}
// this is the function for make sure if the position in the home p.

//OK hhh in one line
function inPositionHome() {
    return world.i.x==40 && world.Origine==createVector(windowWidth/3,windowHeight/2)
}



function checkselection(){
    world.points.forEach(p => {
        if ( ( mouseX-p.X)**2+ ( mouseY-p.Y)**2<25 ) {
            p.highLight()
            if (mouseIsPressed) {
                p.selected=true
                world.pointIsSelected=true
            }
        }       
    });
}


// MOUSE HANDLER !============================================

/*
function mouseDragged(e) {
    if ( world.pointIsSelected) {
        world.points.forEach(p => {
            if (p.selected ) {
                p.x=world.Xtox(mouseX)
                p.y=world.Ytoy(mouseY)

            }       
        });
    }else{
        world.Origine.add(movedX,movedY)
    }
}

function mouseClicked(e) {
        let P=new Point(mouseX,mouseY,true)
        world.addPoint(P)
}*/



function mousePressed() {
    console.log(world.L);
    console.log(world.R);
	if( mouseButton === CENTER ){

			world.points.forEach(e => {
				if( e.dist(mouseX,mouseY)<12){
					if(e!==world.L[world.L.length-1])
					world.L.push(e)
				}
			});		
		
		if(world.L.length>=2){
			if( world.L[world.L.length-2]!==world.L[world.L.length-1] )
			{
				if(keyIsDown(66) )
				{	let a=world.L[world.L.length-2],b=world.L[world.L.length-1]
					world.points.push(p5.Vector.add(a.p,p5.Vector.mul(p5.Vector.sub(b.p,a.p),2)).point)
					
					world.R.push(new Barr(a,b ,world.points[world.points.length-1]))
				}
				else
				{world.R.push(new Rig(world.L[world.L.length-2],world.L[world.L.length-1] ))}
			}
		}
		return 
	}else{
		world.L=[]
	}
	
	if(keyIsDown(CONTROL)){
		world.addPoint(new Dot(mouseX,mouseY ))
		return
	}

	if(keyIsDown(82)){
		world.points.push(new Rot(mouseX,mouseY ))
		return
	}

	world.points.forEach(e => {
		if( e.dist(mouseX,mouseY)<12){
			e.selected=true
			xOffset = mouseX-400 - e.p.x;
			yOffset = 300-mouseY - e.p.y;
		}	


	});
	if(keyIsDown(65) ){
		world.points.forEach(e => {
			if(e.selected ) e.fix =!e.fix ;})
		return 
	}


}
let xOffset=0,yOffset=0

function mouseDragged(e) {

	world.points.forEach(e => {
		if (e.selected) {

            //e.p=createVector(world.Xtox(movedX),world.Ytoy(movedY))
            //e.p.add(createVector( movedX,movedY))
            
            /*e.p.x = mouseX-400 - xOffset;
            e.p.y = 300-mouseY - yOffset;*/

	}})


    if (mouseIsPressed ) {
        
        world.points.forEach(p => {
            if (p.selected ) {
                p.move(mouseX,mouseY)
            }       
        });
        
    if (mouseButton==RIGHT && mouseIsPressed ) {
        
        world.Origine.add(movedX,movedY)
        world.update()


    }
   // world.Origine.add(movedX,movedY)
}}
  
function mouseReleased() {
	world.points.forEach(e => {
	e.selected = false;})
}

function keyPressed() {
}

  












// BUTTON HANDLER !============================================

function home() {
    world.Origine=createVector(windowWidth/3,windowHeight/2)
    world.i=createVector(30,   0)
    world.j=createVector(0  ,-30)
    
    world.AX=new Axe(world.Origine,1)
    world.AY=new Axe(world.Origine,0)

}
function toggleGrid() {
    world.SHOWGRID=!world.SHOWGRID
}
function toggleMGrid() {
    world.SHOWMINIGRID=!world.SHOWMINIGRID
}
function toggleAxis() {
    world.SHOWAXIS=!world.SHOWAXIS
}
function toggleNums() {
    world.SHOWNUMBERS[0]=!world.SHOWNUMBERS[0]
}
function toggleNumsy() {
    world.SHOWNUMBERS[1]=!world.SHOWNUMBERS[1]
}
function mouseWheel(e) {
    world.zoomWheel(e,offsit)
}

function plusZoom(){
    world.zoom(1.25)
}
function minusZoom(){
    world.zoom(0.8)
}

function play() {
    world.play=!world.play 
}
function gravitate() {
    world.gravity=!world.gravity 
}
function fixpos() {
    world.points.forEach(e => {
        if(e.selected ) e.fix =!e.fix ;})
}



// SAVE SCENE 
function SAVE() {
    var o = {"w": world.L};
    
    localStorage.setItem('myStorageSS', JSON.stringify(o));

}
function LOAD() {
    world.L = JSON.parse(localStorage.getItem('myStorageSS'));
    console.log();
}

function addfun(e) {
    world.addFun(e.value)
}

function toggleShow(e){
    console.log(e);
    e.showen=!e.showen
}
