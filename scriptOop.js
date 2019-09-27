const cl = (text, elem) => {
  if(elem === undefined || elem === null) {
      return console.log(`text: ${text}`);
  } else {
    return console.log(`text: ${text}, element: ${elem}`);
  }
};

const version = 'version: ' + 2.0;
cl('*******************************');
cl('OOP App', version);
cl('*******************************');

let dGetById = (elem) => {
  return document.getElementById(elem);
};

let d = document;
let b = d.body;
let $question = dGetById('question');
let $score = dGetById('score');
let $feedback = dGetById('feedback');
let $counter = dGetById('counter');
let $inputEntry = dGetById('answerQuestion');
let $btnChecker = dGetById('btnChecker');
let $start = dGetById('startBtn');
let $form = dGetById('answer');
let $timer = dGetById('timer');

const quiz = {
  name: "Super hero Quiz",
  description: "How many super heroes can you name?",
  question: "What\'s the real name of ",
  questions: [
    { name: "Superman",realName: "Clark Kent", asked: false },
    { name: "Wonderwoman",realName: "Dianna Prince", asked: false },
    { name: "Batman",realName: "Bruce Wayne", asked: false },
    { name: "Joker",realName: "Joker", asked: false },
    { name: "The Flash",realName: "Bary Allen", asked: false },
    { name: "The Green Arrow",realName: "Oliver Queen", asked: false },
    { name: "Aquamam",realName: "Arthur Curry", asked: false }
  ]
};

// Quiz game
function Game(quiz){
  this.questions = quiz.questions;
  this.phrase = quiz.question;
  this.score = 0; // initialize score
  this.update($score,this.score);
  // initialize timer and set up an interval that counts down
  this.time = 20;
  this.update($timer, this.time);
  this.interval = window.setInterval( this.countDown.bind(this), 1000 );
  // hide button and show form
  this.hide($start);
  this.show($form);
  // add event listener to form for when it’s submitted
  $form.addEventListener('click', function(event) {
    event.preventDefault();
    this.check(event.target.value);
  }.bind(this), false);
  this.chooseQuestion();
}

//
// Method definitions
// -------------------------------
Game.prototype.update = function(elem, content, klass) {
  console.log('update() invoked');
  var p;
  p = (!elem.firstChild) ? d.createElement('p') : elem.firstChild;
  p.textContent = content;
  elem.appendChild(p);
  if(klass) {
    p.className = klass;
  }
};

Game.prototype.show = function(elem) {
  elem.style.display = "block";
  return this;
};

Game.prototype.hide = function(elem) {
  elem.style.display = "none";
  return this;
};

Game.prototype.chooseQuestion = function() {
  console.log("chooseQuestion() called");
  var questions = this.questions.filter(function(question){
    return question.asked === false;
  });
  // set the current question
  this.question = questions[this.random(questions.length) - 1];
  this.ask(this.question);
};

Game.prototype.random = function(a, b, callback) {
  if(b === undefined || b === null) {
    //if only one argument was supplied, assume that the lower limit is 1
    b = a, a = 1;
  }
  
  var result = Math.floor((b-a+1) * Math.random()) + a;
  
  if(typeof callback === "function") {
    result = callback(result);
  }
  return result;
};

Game.prototype.ask = function(question) {
  console.log("ask() called");
  var quiz = this;
  randomFunction = quiz.random;
  // set the question.asked property to true so it’s not asked again
  question.asked = true;
  this.update($question,this.phrase + question.question + "?");
    // clear the previous options
    $form.innerHTML = "";
    // create an array to put the different options in and a button
    // variable
    var options = [], button;
    var option1 = chooseOption();
    options.push(option1.answer);
    var option2 = chooseOption();
    options.push(option2.answer);
    // add the actual answer at a random place in the options array
    options.splice(quiz.random(0,2),0,this.question.answer);
    // loop through each option and display it as a button
    options.forEach(function(name) {
      button = document.createElement("button");
      button.value = name;
      button.textContent = name;
      $form.appendChild(button);
    });
    // choose an option from all the possible answers but without
    // choosing the answer or the same option twice
    function chooseOption() {
      var option = quiz.questions[Game.random(quiz.questions.length) - 1];
      // check to see if the option chosen is the current question or
      // already one of the options, if it is then recursively call this
      // function until it isn’t
      if(option === question || options.indexOf(option.answer) !== -1) {
        return chooseOption();
      }
      return option;
    }
};

Game.prototype.check = function(answer) {
     console.log("check() called");
     if(answer === this.question.answer){
       update($feedback,"Correct!","correct");
       // increase score by 1
       this.score++;
       update($score,this.score);
     } else {
       update($feedback,"Wrong!","wrong");
     }
     this.chooseQuestion();
   };
   
Game.prototype.countDown = function() {
     // this is called every second and decreases the time
     // decrease time by 1
     this.time--;
     // update the time displayed
     this.update($timer,this.time);
     // the game is over if the timer has reached 0
     if(this.time <= 0) {
       this.gameOver();
     }
   };
   
Game.prototype.gameOver = function() {
     console.log("gameOver() invoked");
     // inform the player that the game has finished and tell them how
     // many points they have scored
     this.update($question,"Game Over, you scored " + this.score + " points");
     // stop the countdown interval
     window.clearInterval(this.interval);
     hide($form);
     show($start);
   };
   
// Event listeners
$start.addEventListener('click', function() { new Game(quiz) }, false);