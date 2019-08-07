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
      console.log('$$$$$ filter step: ' + elem.name);
      return elem.asked === false;
    });
    console.log('********** Questions after filtering ' + questions[0].name + ' Length ' + questions.length);
    // set the current question
    question = questions[random(questions.length) - 1];
    console.log('random question: ' + question.name);
    
    return ask(question);
  };
  
  
  const ask = (question) => {
    console.log('Ask() was invoked');
    console.log('######## ' + question.name);
    question.asked = true;
    update($form, quiz.question + question.name + '?');
    
    var options = [], button;
    
    var option1 = chooseOption();
    console.log('----------&&---------- option 1  ' + option1.realName);
    options.push(option1.realName);
    
    var option2 = chooseOption();
    console.log('----------&&---------- option 2  ' + option2.realName);
    options.push(option2.realName);
    
    var option3 = chooseOption();
    console.log('----------&&---------- option 3  ' + option3.realName);
    options.push(option3.realName);
    
    var option4 = chooseOption();
    console.log('----------&&---------- option 4  ' + option4.realName);
    options.push(option4.realName);
    
    var option5 = chooseOption();
    console.log('----------&&---------- option 5  ' + option5.realName);
    options.push(option5.realName);
    
    var option6 = chooseOption();
    console.log('----------&&---------- option 6  ' + option6.realName);
    options.push(option6.realName);
    
    
    options.slice(random(0,7), 0, question.answer);
    
    options.forEach((name) => {
      button = d.createElement('button');
      button.value = name;
      button.textContent = name;
      button.classList.add('answerButtons');
      $form.appendChild(button);
    });
    
    function chooseOption() {
      console.log('chooseQuestion() invoked');
      // set the current question
      let option = quiz.questions[random(quiz.questions.length) - 1];
      
      
       if(option === question || options.indexOf(option.realName) !== -1) {
         console.log('*****$$$$$ question' + question.realName);
         console.log('*****$$$$$ option' + option.name);
         console.log('*****$$$$$ options.index ' + options.indexOf(options.answer));
       return chooseOption();
      }
      return option;
    }
  };
  
  const gameOver = () => {
    console.log('gameOver() invoked');
    dQuery('.answerButtons').remove();
    hideElement($form);
    showElement($startBtn);
    update($question, `Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`, 'gameOver');
    return;
  };
  
  const check = (answer) => {
    // Check if the answer is correct
    console.log('Check() function invoked');
    
      if(answer.toLowerCase() === question.realName.toLowerCase()) {
        update($feedback, 'correct', 'right');
        
        //Increase score by 1
        score++;
        update($score, score);
        
        for(var i=1; i<$form.childNodes.length; i++) {
          console.log('HEEEEEREEEE: ' + $form.childNodes[i]);
          
          console.log('has child nodes: ' + $form.hasChildNodes());
          // REMOVE FOR CHILD FOR CHILD
          if($form.hasChildNodes()) {
            console.log(' the first child removing ' + $form.childNodes[i].remove());
          }
        }
        
        return chooseQuestion();
      } else {
        update($score, score);
        update($feedback, 'wrong', 'wrong');
        
        for(var i=1; i<$form.childNodes.length; i++) {
          console.log('HEEEEEREEEE: ' + $form.childNodes[i]);
          
          console.log('has child nodes: ' + $form.hasChildNodes());
          // REMOVE FOR CHILD FOR CHILD
          if($form.hasChildNodes()) {
            console.log(' the first child removing ' + $form.childNodes[i].remove());
          }
        }
        
        return chooseQuestion();
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