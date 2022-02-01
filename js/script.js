
// All answer options 
const option1 = document.querySelector('.option1'),
   option2 = document.querySelector('.option2'),
   option3 = document.querySelector('.option3'),
   option4 = document.querySelector('.option4');



// All our options
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
   numberOfQuestion = document.getElementById('number-of-question'),
   numberOfAllQuestions = document.getElementById('number-of-all-questions');


let indexOfQuestion, // индекс текущего вопроса
   indexOfPage = 0; //индекс текущей страницы


const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // Итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),
   numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
   btnTryAgain = document.getElementById('btn-try-again');

const questions = [
   {
      question: 'В каком органе образуется желчь?',
      options: [
         'Печень',
         'Желчный пузырь',
         'Поджелудочная железа',
         'Желудок',
      ],
      rightAnswer: 1
   },
   {
      question: 'Какой из этих языков является вторым по распространенности в мире?',
      options: [
         'Английский',
         'Испанский',
         'Арабский',
         'Хинди',
      ],
      rightAnswer: 1
   },
   {
      question: 'В каком году прекратила свое существование Османская империя?',
      options: [
         'В 1453 году',
         'В 1792 году',
         'В 1812 году',
         'В 1922 году',
      ],
      rightAnswer: 3
   },
   {
      question: 'Кто из этих писателей не получил Нобелевскую премию?',
      options: [
         'Михаил Шолохов',
         'Иван Бунин',
         'Борис Постернак',
         'Владимир Набоков',
      ],
      rightAnswer: 3
   },
   {
      question: 'Как в греческой мифологии звали музу танца?',
      options: [
         'Мельпомена',
         'Терпсихора',
         'Эвтерпа',
         'Клио',
      ],
      rightAnswer: 1
   }
];

numberOfAllQuestions.innerHTML = questions.length; //выводим количество всех вопросов

const load = () => {
   question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

   option1.innerHTML = questions[indexOfQuestion].options[0];
   option2.innerHTML = questions[indexOfQuestion].options[1];
   option3.innerHTML = questions[indexOfQuestion].options[2];
   option4.innerHTML = questions[indexOfQuestion].options[3];

   numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
   indexOfPage++; // увеличение индекса страницы 
};

let completedAnswers = [];

const randomQuestion = () => {
   let randomNumber = Math.floor(Math.random() * questions.length);
   let hitDuplicate = false;

   if (indexOfPage == questions.length) {
      quizOver();
   } else {
      if (completedAnswers.length > 0) {
         completedAnswers.forEach(item => {
            if (item == randomNumber) {
               hitDuplicate = true;
            }
         });
         if (hitDuplicate) {
            randomQuestion();
         } else {
            indexOfQuestion = randomNumber;
            load();
         }
      };
      if (completedAnswers == 0) {
         indexOfQuestion = randomNumber;
         load();
      }
   };
   completedAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
   if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
      el.target.classList.add('correct');
      updateAnswerTracker('correct');
      score++;
   } else {
      el.target.classList.add('wrong');
      updateAnswerTracker('wrong');
   }
   disabledOptions();
}

const disabledOptions = () => {
   optionElements.forEach(item => {
      item.classList.add('disabled');
      if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
         item.classList.add('correct');
      }
   })
}

const enableOptions = () => {
   optionElements.forEach(item => {
      item.classList.remove('disabled', 'correct', 'wrong');
   })
};

const answerTracker = () => {
   questions.forEach(() => {
      const div = document.createElement('div');
      answersTracker.appendChild(div);
   })
};

const updateAnswerTracker = status => {
   answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
   if (!optionElements[0].classList.contains('disabled')) {
      alert('Вам нужно выбрать один из вариантов ответа');
   } else {
      randomQuestion();
      enableOptions();
   }
};

btnNext.addEventListener('click', validate);

for (option of optionElements) {
   option.addEventListener('click', e => checkAnswer(e))
}

const quizOver = () => {
   document.querySelector('.quiz-over-modal').classList.add('active');
   correctAnswer.innerHTML = score;
   numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
   window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
   randomQuestion();
   answerTracker();
})