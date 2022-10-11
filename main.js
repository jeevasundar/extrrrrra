function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white")
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function preload() {
    classifier = ml5.imageClassifier('DoodleNet')
}

function clearCanvas() {
    background("white");
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }

}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
var confidence=0;
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results)
    document.getElementById('label').innerHTML = 'Label:' + results[0].label;
    document.getElementById('confidence').innerHTML = 'confidence:' + Math.round(results[0].confidence * 100) + '%'
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
    confidence=results[0].confidence;
}

function check(){
    if(confidence>0.5){
    console.log(confidence);
    background('green');
    }else{
    background('red');  
    }
    }



