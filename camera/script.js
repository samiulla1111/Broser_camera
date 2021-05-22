let videoRecorder = document.querySelector("#record-video");
let videoElem = document.querySelector("#video-elem");
let capturebtn = document.querySelector(".capture-btn");
let timingELem = document.querySelector("#timing");
let allFilters = document.querySelectorAll(".filter");
let uiFilter = document.querySelector(".ui-filter");
let filterColor = "";
let clearObj;
let constrains = {
    video: true,
    audio: true
}
let mediaRecorder;
let recordState = false;
let buffer = [];

navigator.mediaDevices
    .getUserMedia(constrains).then(function (mediaStream) {
         videoElem.srcObject = mediaStream;
        // audioElem.srcObject = mediaStream

        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.addEventListener("dataavailable", function (e) {
            buffer.push(e.data);
        })
        mediaRecorder.addEventListener("stop", function () {
            let blob = new Blob(buffer, { type: "video/mp4" });
            const url = window.URL.createObjectURL(blob);

            let a = document.createElement("a");

            a.download = "file.mp4";
            a.href = url;
            a.click();
            buffer=[];
        })
    }).catch(function (err) {
        console.log(err);
    });



videoRecorder.addEventListener("click", function () {
    if(!mediaRecorder){
        alert("Fist allow permission");
        return;
    }

    if (recordState == false) {
        mediaRecorder.start();
        videoRecorder.innerHTML = "Recording...";
        videoRecorder.classList.add("record-animation");
        startCounting();
        recordState = true;
    } else {
        mediaRecorder.stop();
        videoRecorder.innerHTML = "Record";
        videoRecorder.classList.remove("record-animation");
        stopCounting();
        recordState = false;
    }
})

capturebtn.addEventListener("click",function(){
    let canvas = document.createElement("canvas");
    canvas.width = videoElem.videoWidth;
    canvas.height = videoElem.videoHeight;
    let tool = canvas.getContext("2d");
    videoRecorder.classList.add("capture-animation");
    // draw a frame on that canvas
    tool.drawImage(videoElem, 0, 0);
    // toDataUrl 
    let link = canvas.toDataURL();
    // download 
    let anchor = document.createElement("a");
    anchor.href = link;
    anchor.download = "file.png";
    anchor.click();
    anchor.remove();
    canvas.remove();

    setTimeout(function(){
        videoRecorder.classList.remove("capture-animation");
    },1000);
})

function startCounting() {
    timingELem.classList.add("timing-active");
    let timeCount = 0;
    clearObj = setInterval(function () {
        let seconds = (timeCount % 60) < 10 ? `0${timeCount % 60}` : `${timeCount % 60}`;
        let minutes = (timeCount / 60) < 10 ? `0${Number.parseInt(timeCount / 60)}` : `${Number.parseInt(timeCount / 60)}`;
        let hours = (timeCount / 3600) < 10 ? `0${Number.parseInt(timeCount / 3600)}` : `${Number.parseInt(timeCount / 3600)}`;
            timingELem.innerText = `${hours}:${minutes}:${seconds}`;
        timeCount++;
    }, 1000);
}
function stopCounting() {
    timingELem.classList.remove("timing-active");
    timingELem.innerText = "00: 00: 00";
    clearInterval(clearObj);
}
// console.log(allFilters.length);
for(let i=0;i<allFilters.length;i++){
    // console.log(allFilters[i]);
    allFilters[i].addEventListener("click",function(){
        console.log("...................")
        let color = allFilters[i].style.backgroundColor;
        console.log(color);   
        if (color) {
            uiFilter.classList.add("ui-filter-active");
            uiFilter.style.backgroundColor = color;
         
            filterColor = color;
        } else {
            uiFilter.classList.remove("ui-filter-active");
            uiFilter.style.backgroundColor = "";
            filterColor = "";

        }
    })
}