function _(id)
{
    return document.getElementById(id)
}

var canvas =_("canvas");
var photo = _("photo");
var takebtn =_("takebtn");

var height;
var width=320;
video.oncanplay = function(){
   height = video.videoHeight / (video.videoWidth / width);

                    if (isNaN(height)) {
                        height = width / (4 / 3);
                    }

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

}
window.onload = function startup() {
    canvas.style.display="none";
    //input video only 
    navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                })  
                .then(function(stream) {    //start view video from user camera 
                    video.srcObject = stream;
                    video.play();
                    
                }) 
                .catch(function(err) { //if something went wrong
                    console.log("An error occurred: " + err);
                });
            }

    

takebtn.onclick = function () {
            //hide video and view photo
            video.style.display="none";
            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0,canvas.width,canvas.height);
            canvas.style.display="block";
            
            //stop the input stream 
            const stream = video.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => {
            track.stop();
            });
            video.srcObject=null;
        }

