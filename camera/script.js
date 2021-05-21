let videoRecorder = document.querySelector("#record-video");
let videoElem = document.querySelector("#video-elem");
let capturebtn = document.querySelector(".capture-btn");
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
    if (recordState == false) {
        mediaRecorder.start();
        videoRecorder.innerHTML = "Recording...";
        recordState = true;
    } else {
        mediaRecorder.stop();
        videoRecorder.innerHTML = "Record";
        recordState = false;
    }
})

capturebtn.addEventListener("click",function(){
    let canvas = document.createElement("canvas");
    canvas.width = videoElem.videoWidth;
    canvas.height = videoElem.videoHeight;
    let tool = canvas.getContext("2d");
    // draw a frame on that canvas
    tool.drawImage(videoElem, 0, 0);c
    // toDataUrl 
    let link = canvas.toDataURL();
    // download 
    let anchor = document.createElement("a");
    anchor.href = link;
    anchor.download = "file.png";
    anchor.click();
    anchor.remove();
    canvas.remove();
})