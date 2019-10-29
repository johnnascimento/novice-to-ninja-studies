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

(() => {
  "use strict";
  window.onload = () => {
    
    // Helpers
    const d = document;
    const b = d.body || d.bodyElement;
    const w = window;
    const dQuery = elem => { return d.querySelector(elem) };
    const dGetById = elem => { return d.getElementById(elem) };
    const dGetByClass = elem => { return d.getElementsByClassName(elem) };
    
    ///// score initialization and DOM references
    let score, question;
    let $question = dGetById('question');
    let $score = dGetById('score');
    let $feedback = dGetById('feedback');
    let $counter = dGetById('counter');
    let $inputEntry = dGetById('answerQuestion');
    let $btnChecker = dGetById('btnChecker');
    let $startBtn = dGetById('startBtn');
    let $form = dGetById('answer');
    let $timer = dGetById('timer');
    let $buttons;
    
    // Get quiz via ajax
    const getQuiz = () => {
      cl('getQuiz() function was invoked!');
      let xhr = new XMLHttpRequest();
      cl('Xhr was instantiated ', xhr);
      xhr.onreadystatechange = function() {
        cl('On ready state change now');
        if(xhr.readyState === 4 && xhr.status == 200) {
          cl('Within If\'s premises');
          var quiz = JSON.parse(xhr.responseText);
          cl(xhr.responseText, ' Reaponse text ');
          //let max = (quiz.questions.length)-1;
          return new Game(quiz);
        }
      };
        
        cl('it didn\'t pass by the IF statement');
        xhr.open('GET', 'https://s3.amazonaws.com/sitepoint-book-content/jsninja/quiz.json', true);
        xhr.overrideMimeType('application/json');
        xhr.send();
        update($question, 'Waiting for response');
    };
    
    // View functions
    const update = (elem, content, klass) => {
      console.log('update() invoked');
      var p;
      p = (!elem.firstChild) ? d.createElement('p') : elem.firstChild;
      p.textContent = content;
      elem.appendChild(p);
      if(klass) {
        p.className = klass;
      }
    };
    
    
    const showElement = (elem) => {
      elem.style.display = "block";
    };
    
    const hideElement = (elem) => {
      elem.style.display = "none";
    };
    
    
    // Functions
    // ------------------------------
    const removeButtons = (elem) => {
      console.log('*******************************');
      console.log('Remove buttons function invoked');
      console.log('*******************************');
      for(let i = 0; i < elem.length; i++) {
        elem[i].remove();
      }
    };
    
    hideElement($form);
    
    Game.prototype.bindClickHandler = function() {
        $form.addEventListener('click', function(ev) {
          ev.preventDefault();
          this.check(ev.target.value);
        }.bind(this), false);
    };
    
    function Game(quiz) {
      console.log('PlayQuiz() invoked');
      this.questions = quiz.questions;
      
      cl('Quiz questions within Game() ', this.questions);
      
      this.phrase = quiz.question;
      this.score = 0; // initialize score
      
      resetGame(this.questions);
      
      this.score = 0;
      update($score, this.score);
      
      this.time = 20;
      update($timer,this.time);
      
      this.interval = window.setInterval( this.countDown.bind(this), 1000 );
      
      hideElement($startBtn);
      showElement($form);
      
      this.bindClickHandler();
      
      this.chooseQuestion();
    }
    
    Game.prototype.countDown = function() {
      this.time--;
      console.log(this.time);
      update($timer, this.time);
      // the game is over if the timer has reached 0
      if(this.time <= 0) {
        this.gameOver();
        update($question, `Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`, 'gameOver');
      }
    };
    
    const resetGame = (questions) => {
      console.log('****************************************');
      console.log('resetGame() function invoked');
      console.log('****************************************');
      
      questions.forEach(function(elem, idx) {
        console.log('elem ', elem);
        console.log('idx ', idx);
        console.log('elem asked before ', elem.asked);
        elem.asked = false;
        console.log('elem asked after ', elem.asked);
      });
      
      update($question, ' ');
    };
    
    
    const random = (a, b, callback) => {
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
    
    
    Game.prototype.chooseQuestion = function() {
      console.log('chooseQuestion() invoked');
      this._questions = this.questions.filter((elem) => {
        console.log('$$$$$ filter step: ' + elem.question, elem.answer);
        return elem.asked === false;
      });
      
      console.log('********** Questions after filtering ' + this._questions[0].name + ' Length ' + this._questions.length);
      
      // set the current question
      this.question = this._questions[random(this._questions.length) - 1];
      
      console.log('random question: ' + this.question.answer);
      
      return this.ask(this.question);
    };
    
    
    Game.prototype.ask = function(question) {
      console.log('Ask() was invoked');
      console.log('######## ' + question.question);
      
      cl('Quiz within Ask() ', question);
      
      question.asked = true;
      update($form, question.question + '?');
      let _self = this;
      
      this.options = [];
      this.button;
      let option1, option2, option3, option4, option5, option6, option7;
      
      option1 = chooseOption(question);
      console.log('----------&&---------- option 1  ' + option1.realName);
      this.options.push(option1.realName);
      
      option2 = chooseOption(question);
      console.log('----------&&---------- option 2  ' + option2.realName);
      this.options.push(option2.realName);
      
      option3 = chooseOption(question);
      console.log('----------&&---------- option 3  ' + option3.realName);
      this.options.push(option3.realName);
      
      option4 = chooseOption(question);
      console.log('----------&&---------- option 4  ' + option4.realName);
      this.options.push(option4.realName);
      
      option5 = chooseOption(question);
      console.log('----------&&---------- option 5  ' + option5.realName);
      this.options.push(option5.realName);
      
      option6 = chooseOption(question);
      console.log('----------&&---------- option 6  ' + option6.realName);
      this.options.push(option6.realName);
      
      option7 = chooseOption(question);
      console.log('----------&&---------- option 6  ' + option7.realName);
      this.options.push(option7.realName);
      
      
      this.options.slice(random(0,8), 0, question.answer);
      
      this.options.forEach((name) => {
        this.button = d.createElement('button');
        this.button.value = name;
        this.button.textContent = name;
        this.button.classList.add('answerButtons');
        $form.appendChild(this.button);
      });
      
      function chooseOption(questions) {
        console.log('chooseQuestion() invoked');
        // set the current question
        cl('Quiz ', question);
        
        let option = questions[random(questions.length) - 1];
        
        
        if(_self.options.indexOf(option.question) !== -1) {
          console.log('*****$$$$$ question' + question.question);
          console.log('*****$$$$$ option' + option.answer);
          console.log('*****$$$$$ options.index ' + _self.options.indexOf(_self.options.answer));
          return chooseOption();
        }
        return option;
      }
    };
    
    
    Game.prototype.gameOver = function() {
      console.log('gameOver() invoked');
      $buttons = document.querySelectorAll('.answerButtons');
      
      removeButtons($buttons);
      hideElement($form);
      showElement($startBtn);
      window.clearInterval(this.interval);
      update($question, `Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`, 'gameOver');
      return;
    };
    
    Game.prototype.check = function(answer) {
      // Check if the answer is correct
      console.log('Check() function invoked');
      
      $buttons = document.querySelectorAll('.answerButtons');
      
      let howManyQuestionYet = 0;
      
      if(answer.toLowerCase() === this.question.realName.toLowerCase()) {
        update($feedback, 'correct', 'right');
        
        //Increase score by 1
        this.score++;
        update($score, this.score);
        
        removeButtons($buttons);
        howManyQuestionYet = this.checkForAskedQuestion(howManyQuestionYet);
        console.log('howManyQuestionYet ', howManyQuestionYet);
        
        if(howManyQuestionYet <= 0) {
          update($feedback, ' ');
          return this.gameOver();
        } else {
          return this.chooseQuestion();
        }
      } else {
        update($score, this.score);
        update($feedback, 'wrong', 'wrong');
        
        removeButtons($buttons);
        howManyQuestionYet = this.checkForAskedQuestion(howManyQuestionYet);
        console.log('howManyQuestionYet in check() function ', howManyQuestionYet);
        
        if(howManyQuestionYet <= 0) {
          update($feedback, ' ');
          return this.gameOver();
        } else {
          return this.chooseQuestion();
        }
        
        return this.chooseQuestion();
      }
    };
    
    
    Game.prototype.checkForAskedQuestion = function(howManyQuestionYet) {
      console.log('****************************************');
      console.log('checkForAskedQuestion() function invoked');
      console.log('****************************************');
      
      console.log('howManyQuestionYet within checkForAskedQuestion()', howManyQuestionYet);
      
      this.questions.forEach(function(elem, idx) {
        console.log('elem ', elem);
        console.log('idx ', idx);
        console.log('elem.asked before IF statement', elem.asked);
        
        if(elem.asked === false) {
          console.log('elem.asked supposedly false', elem.asked);
          howManyQuestionYet++;
        } else {
          console.log('elem.asked supposedly true', elem.asked);
          howManyQuestionYet = howManyQuestionYet;
        }
        
        console.log('howManyQuestionYet before returning it', howManyQuestionYet);
        return howManyQuestionYet;
      });
      
      return howManyQuestionYet;
    };
    
    
    // Event listeners
    // ------------------------
    $startBtn.addEventListener('click', getQuiz, false);
  };
})();