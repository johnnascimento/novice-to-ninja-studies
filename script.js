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
  let i = 0;
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
    questions: [
      { name: "Superman",realName: "Clark Kent" },
      { name: "Wonderwoman",realName: "Dianna Prince" },
      { name: "Batman",realName: "Bruce Wayne" }
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
    i = 0;
    update($score, score);
    chooseQuestion();
  };
  
  
  const chooseQuestion = () => {
    console.log('chooseQuestion() invoked');
    question = `What\'s ${quiz.questions[i].name}\'s real name?`;
    return ask(question, i);
  };
  
  
  const ask = (question) => {
    console.log('Ask() function invoked');
    update($question, question);
    $form[0].value = "";
    $form.focus();
    return;
  };
  
  const gameOver = () => {
    console.log('gameOver() invoked');
    hideElement($form);
    showElement($startBtn);
    update($question, `Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`, 'gameOver');
    return;
  };
  
  const check = (answer, i) => {
    // Check if the answer is correct
    console.log('Check() function invoked');
    
    if(i === quiz.questions.length || i > quiz.questions.length) {
      
      if(answer.toLowerCase() === quiz.questions[i-1].realName.toLowerCase()) {
        //Increase score by 1
        score++;
        update($score, score);
        return gameOver(i);
      } else {
        update($feedback, 'wrong', 'wrong');
        return gameOver(i);
      }
    } else {
      if(answer.toLowerCase() === quiz.questions[i-1].realName.toLowerCase()) {
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
    
  $form.addEventListener('submit', (ev) => {
      if(i<3){
        i++;
      } else {
        i = 0;
      }
      ev.preventDefault();
      check($form[0].value, i);
  }, false);
 };
})();