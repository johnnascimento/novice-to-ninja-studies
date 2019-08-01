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
  
  const quiz = {
    name: "Super hero Quiz",
    description: "Hiw many super heroes can you name?",
    question: "What\'s the resl name of ",
    questions: [
      { name: "Superman",realName: "Clark Kent", "asked": false },
      { name: "Wonderwoman",realName: "Dianna Prince", "asked": false },
      { name: "Batman",realName: "Bruce Wayne", "asked": false },
      { name: "Batman",realName: "Bruce Wayne", "asked": false },
      { name: "The Flash",realName: "Bary Allen", "asked": false },
      { name: "The Green Arrow",realName: "Oliver Queen", "asked": false },
      { name: "Aquamam",realName: "Arthur Curry", "asked": false }
    ]
  };
  
  let max = (quiz.questions.length)-1;
  
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
  hideElement($form);
  
  const playQuiz = (quiz) => {
    console.log('PlayQuiz() invoked');
    hideElement($startBtn);
    showElement($form);
    
    score = 0;
    let question;
    update($score, score);
    chooseQuestion();
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
  
  
  const chooseQuestion = () => {
    console.log('chooseQuestion() invoked');
    var questions = quiz.questions.filter((elem) => {
      return elem.asked === false;
    });
    // set the current question
    question = questions[random(questions.length) - 1];
    
    return ask(question);
  };
  
  
  const ask = (question) => {
    console.log('Ask() was invoked');
    
    question.asked = true;
    update($form, quiz.question + question.question + '?');
    
    var options = [], button;
    var option1 = chooseOption();
    options.push(option1.answer);
    var option2 = chooseOption();
    options.push(option2.answer);
    
    options.slice(random(0,2), 0, question.answer);
    
    options.forEach((name) => {
      button = d.createElement('button');
      button.value = name;
      button.textContent = name;
      $form.appendChild(button);
    });
    
    function chooseOption() {
      console.log('chooseQuestion() invoked');
      // set the current question
      let option = quiz.questions[random(quiz.questions.length) - 1];
      
       if(option === question || options.indexOf(option.answer) !== -1) {
         console.log('*****$$$$$ question' + question);
         console.log('*****$$$$$ option' + option);
         console.log('*****$$$$$ options.index ' + options.indexOf(options.answer));
        return ;
      }
      return option;
    }
  };
  
  const gameOver = () => {
    console.log('gameOver() invoked');
    hideElement($form);
    showElement($startBtn);
    update($question, `Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`, 'gameOver');
    return;
  };
  
  const check = (answer) => {
    // Check if the answer is correct
    console.log('Check() function invoked');
    
    if(quiz.questions.length || quiz.questions.length) {
      
      if(answer.toLowerCase() === question.answer.toLowerCase()) {
        //Increase score by 1
        score++;
        update($score, score);
        return gameOver(i);
      } else {
        update($feedback, 'wrong', 'wrong');
        return gameOver(i);
      }
    } else {
      if(answer.toLowerCase() === question.answer.toLowerCase()) {
        update($feedback, 'correct', 'right');
        //Increase score by 1
        score++;
        update($score, score);
        chooseQuestion(i);
      } else {
        update($feedback, 'wrong', 'wrong');
        chooseQuestion(i);
      }
    }
  };
  
  // Event listeners
  // ------------------------
  $startBtn.addEventListener('click', () => {
      return playQuiz(quiz);
    });
    
  $form.addEventListener('click', (ev) => {
      ev.preventDefault();
      check(ev.target.value);
  }, false);
 };
})();