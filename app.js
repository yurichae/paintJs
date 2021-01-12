const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = ""
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE; //canvas에 사이즈를 주어야 path가 보임
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY; //path를 만들면 마우스 x,y좌표로 선을 만든다
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function onMouseDown(event) {
    painting = true;
}
function onMouseUp(event) {
    stopPainting();
}
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; //color의 값은 target으로부터 받아짐
    ctx.fillStyle = color;
}
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleCanvasClick(){
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
function handleCM(event){
    event.preventDefault()
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "YURI_Drawing";
    link.click();

}
function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerText = "Fill" //filling이 flase일때 텍스트를 ""로 바꿔라
    } else {
        filling = true;
        mode.innerText = "Paint"  //filling이 true일때 텍스트를 ""로 바꿔라
        ctx.fillStyle = ctx.strokeStyle
    }
}
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
};
if(mode){
    mode.addEventListener("click", handleModeClick)
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}