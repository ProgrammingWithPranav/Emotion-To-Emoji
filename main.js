Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 900,
});
Webcam.attach("#camera");

var classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/661fFI5qw/model.json",
  modelLoaded
);

function takeSnapshot() {
  Webcam.snap(function (data_uri) {
    img = "<img id='image' src='" + data_uri + "' />";
    document.getElementById("snapshot").innerHTML = img;
  });
}

function modelLoaded() {
  console.log("Model Loaded!");
}

function speak(pred1, pred2) {
  var synth = window.speechSynthesis;
  text1 = "The first prediction is" + pred1;
  text2 = "And The second prediction is" + pred2;
  var utterThis = new SpeechSynthesisUtterance(text1 + text2);
  synth.speak(utterThis);
}

function check() {
  var myImg = document.getElementById("image");
  classifier.classify(myImg, getData);
}

function getData(error, result) {
  if(error) {
    console.log(error);
  }
  else {
    console.log(result);
  var label = result[0].label;
  var label2 = result[1].label;
  document.getElementById("pred1").innerHTML = label;
  document.getElementById("pred2").innerHTML = label2;

  document.getElementById("emoji1").innerHTML = showEmoji(label);
  document.getElementById("emoji2").innerHTML = showEmoji(label2);

  speak(label, label2);
  }
}

function showEmoji(label) {
  if (label == "Happy") {
    return "&#128512;";
  } else if (label == "Sad") {
    return "&#128532;";
  } else if (label == "Angry") {
    return "&#128546;";
  }
}

