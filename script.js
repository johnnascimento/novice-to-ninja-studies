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
  
  const quiz = {
    name: "Super hero Quiz",
    description: "Hiw many super heroes can you name?",
    questions: [
      { name: "Superman",realName: "Clark Kent" },
      { name: "Wonderwoman",realName: "Dianna Prince" },
      { name: "Batman",realName: "Bruce Wayne" }
    ]
  };
  
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
   
   
  let max = (quiz.questions.length)-1;
  
  const playQuiz = (quiz) => {
    score = 0;
    update($score, score);
    //update($question, question);
    
    for(var i=0; i<=max; i++) {
      // Main game loop
      let question = `What\'s ${quiz.questions[i].name}\'s real name?`;
      let answer = ask(question);
      check(answer, i);
    }
    // End of main loop
    gameOver();
  };
  
  const ask = (question) => {
    update($question, question);
    let counter = 20;
   /* var myInterval = setInterval(() => {
      $counter.innerHTML = counter;
      counter--;
      
      if(counter < 0) {
        gameOver();
        clearInterval(myInterval);
      }
    }, 1000);*/
    return prompt(question);
    
  };
  
  const check = (answer, idx) => {
    // Check if the answer is correct
    if(answer.toLowerCase() === quiz.questions[idx].realName.toLowerCase()) {
      update($feedback, 'correct', 'right');
      //Increase score by 1
      score++;
      update($score, score);
    } else {
      update($feedback, 'wrong', 'wrong');
    }
  };
  
  const gameOver = () => {
    // Inform the player that the game has finished and tell them how many points they've made
    console.log('gameOver() invoked');
    update($question, `Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`, 'gameOver');
  };
  
  $startBtn.addEventListener('click', playQuiz(quiz));
};