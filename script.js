window.onload = () => {
  // Helpers
  const d = document;
  const b = d.body || d.bodyElement;
  const w = window;
  const dQuery = elem => { return d.querySelector(elem) };
  const dGetById = elem => { return d.getElementById(elem) };
  const dGetByClass = elem => { return d.getElementsByClassName(elem) };
  
  ///// score initialization and DOM references
  let score;
  let $question = dGetById('question');
  console.log('$question: ' + $question);
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
    console.log(elem);
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
    hideElement($startBtn);
    console.log('start btn hidden');
    showElement($form);
    console.log('show form activated');
    
    score = 0;
    let question;
    let i = 0;
    update($score, score);
    console.log('playquiz update function executed');
    
    $form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      check($form[0].value, i);
    }, false);
    
    chooseQuestion(i);
    console.log('choose question executed');
  };
  
  
  const chooseQuestion = (i) => {
    console.log('It came into the choose question');
    question = `What\'s ${quiz.questions[i].name}\'s real name?`;
    ask(question);
    
    i++;
    console.log(i);
    if(i === quiz.questions.length) {
      console.log('came into IF of choose question');
      gameOver();
    } else {
      chooseQuestion(i);
    }
  };
  
  
  const ask = (question) => {
    update($question, question);
    $form[0].value = "";
    $form.focus();
  };
  
  const check = (answer, idx) => {
    // Check if the answer is correct
    if(answer.toLowerCase() === quiz.questions[i].realName.toLowerCase()) {
      update($feedback, 'correct', 'right');
      //Increase score by 1
      score++;
      update($score, score);
    } else {
      update($feedback, 'wrong', 'wrong');
    }
  };
  
  const gameOver = () => {
    hideElement($form);
    showElement($startBtn);
    console.log('gameOver() invoked');
    update($question, `Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`, 'gameOver');
  };
  
  $startBtn.addEventListener('click', () => {
      return playQuiz(quiz);
    });
};