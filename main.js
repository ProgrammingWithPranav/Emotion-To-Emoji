Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 900,
});
Webcam.attach("#camera");

ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/661fFI5qw/model.json",
  modelLoaded
);

function takeSnapshot() {
  Webcam.snap(function (data_uri) {
    img = "<img id='image' src='" + data_uri + "' />";
    document.getElementById("snapshot").innerHTML = img;
  });
  speak();
}

function modelLoaded() {
  console.log("Model Loaded!");
}

function speak() {
  var synth = window.speechSynthesis;
  text1 = "The first prediction is";
  text2 = "The second prediction is";
  var utterThis = new SpeechSynthesisUtterance(text1 + text2);
  synth.speak(utterThis);
}
