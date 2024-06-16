const canvas=document.getElementById('myCanvas');
const context=canvas.getContext("2d");
const clear=document.getElementById("btn1");
const colorpicker=document.getElementById("textcolorpicker");
const bgpicker=document.getElementById("bgcolorpicker")
const fontpicker=document.getElementById("fontpicker")
const dnd=document.getElementById("btn2");
const ret=document.getElementById("btn3")
context.lineWidth=fontpicker.value;
context.strokeStyle="black"
let x=0;
let y=0;
let is_Drawing=false;
colorpicker.addEventListener("change",(e)=>{
    console.log(e.target.value)
    context.strokeStyle=e.target.value
})
bgpicker.addEventListener("change",(e)=>{
    canvas.style.backgroundColor=e.target.value
})
fontpicker.addEventListener("change",(e)=>{
    context.lineWidth=e.target.value
})
canvas.addEventListener("mousedown",(e)=>{
    x=e.offsetX;
    y=e.offsetY;
    is_Drawing=true;
})

canvas.addEventListener("mousemove",(e)=>{
    if(is_Drawing){
        drawline(context,x,y,e.offsetX,e.offsetY);
        x=e.offsetX;
        y=e.offsetY
    }
})
canvas.addEventListener("mouseup",(e)=>{
    if(is_Drawing){
        is_Drawing=false;
    }
})
canvas.addEventListener("mouseout",(e)=>{
    if(is_Drawing){
        is_Drawing=false;
    }
})
function drawline(context,x1,y1,x2,y2){
   context.beginPath();
   context.moveTo(x1,y1);
   context.lineTo(x2,y2);
   context.stroke();
   context.closePath();
}

clear.addEventListener("click",(e)=>{
    let image=canvas.toDataURL()
    localStorage.setItem("canvas-img",image);
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width,canvas.height,)
})
dnd.addEventListener("click",(e)=>{
    let image=canvas.toDataURL()
    localStorage.setItem("canvas-img",image);
    let link=document.createElement('a');
    link.download="my-image.png";
    link.href=image
    link.click()
})


ret.addEventListener("click",(e)=>{
    const get_item=localStorage.getItem("canvas-img")
    if(get_item){
        let image=new Image();
        image.src=get_item;
        context.drawImage(image,0,0);
    }
})