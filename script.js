// Declare Variables
var featureExtractor, classifier, video, loss, setA, setB;

// Store the number of images added to dataset.
setA = 0
setB = 0

function setup() {
	// Tells p5 to not automatically create a canvas element.
  noCanvas();

	// Create webcam video feed
  video = createCapture(VIDEO);

	// Puts the video stream into the div in our html, with ID 'video'
  video.parent('video');

	// Initializes a feature extractor to be trained from ml5
  featureExtractor = ml5.featureExtractor('MobileNet'); // lightweight CNN
  classifier = featureExtractor.classification(video); // feed video to classifier https://learn.ml5js.org/#/reference/feature-extractor?id=featureextractor

	// Calls next function, idk why i'm writing this it's just to make sure that huizhen and adnan think that i'm seriously coding something when i'm actually playing adcap
  setupButtons();
}

// A function to add event listeners to buttons
function setupButtons() {

  buttonA = select('#redButton'); //p5.js method; storing element in variable
	buttonB = select('#blueButton');

  buttonA.mousePressed(function() { //p5.js method; execute when clicked
		setA++;
    classifier.addImage('red'); //take picture and add to training set
    select('#setA').html(setA); //update HTML count
  });

  buttonB.mousePressed(function() {
		setB++;
    classifier.addImage('blue');
    select('#setB').html(setB);
  }); //same but for blue button

  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) { //train model
      if (lossValue) { //train until 0 loss https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html
        loss = lossValue;
        select('#message').html('Loss: ' + loss); //update loss number in HTML
      } else {
        select('#message').html('Done Training! Final Loss: ' + loss);
				select('#train').style("display", "none");
				select('#predict').style("display", "inline"); //show predict button
      }
    });
  });

  // Predict Button
  buttonPredict = select('#predict');
  buttonPredict.mousePressed(classify);
}

// Classify the current frame.
function classify() {
  classifier.classify(gotResults); //set A or B? Outputs result to gotResults function
}

// Show the results
function gotResults(error, result) {
  if (error) { //error handling
    console.error(error);
  }
  var answer = Math.max(result[0].confidence, result[1].confidence); //does the classifier think the current image is of set A or B?
  if (answer == result[0].confidence) {
	  select("body").style("background", result[0].label); //red
  }
  else { //change background accordingly
	  select("body").style("background", result[1].label); //blue
  }
  classify(); //calls function forever to keep making classifications as page is open
}