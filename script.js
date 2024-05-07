let currentQuestion = 0;
let timer;
let score = 0;
let chosenCategory;

const questions = [
    {
        category: "Computer Science",
        question: "What is a variable in programming?",
        options: ["A value that cannot be changed", "A container for storing data values", "A mathematical operation", "A condition for decision making"],
        correctAnswer: 1
    },
    {
        category: "Entertainment",
        question: "Who is the director of the movie 'Inception'?",
        options: ["Christopher Nolan", "Steven Spielberg", "Martin Scorsese", "Quentin Tarantino"],
        correctAnswer: 0
    },
    {
        category: "Geography",
        question: "What is the capital city of France?",
        options: ["Berlin", "Madrid", "Rome", "Paris"],
        correctAnswer: 3
    },
    {
        category: "History",
        question: "who was president during the US Civil war",
        options: ["Brakk Obama", "Donald Trump", "Joe Biden", "Aberham Lincoln"],
        correctAnswer: 3
    },
    {
        category: "Math",
        question: "What is 1 + 1?",
        options: ["6", "4", "2", "5"],
        correctAnswer: 2
    },
    {
        category: "Science",
        question: "I dont know what is the coolest subject",
        options: ["Math", "Sports", "Science", "History"],
        correctAnswer: 2
    },
    {
        category: "Sports",
        question: "Volleyball players",
        options: ["6", "4", "2", "5"],
        correctAnswer: 3
    },
    // Add more questions for different categories...
];

function displayQuestion() {
    const currentQuestionObj = questions[currentQuestion];
    document.getElementById('question').innerText = currentQuestionObj.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Clear previous options

    currentQuestionObj.options.forEach((option, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = index;
        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${option}`));
        optionsDiv.appendChild(label);
    });
}

function startCountdown(seconds) {
    let timeLeft = seconds;
    timer = setInterval(function() {
        document.getElementById('countdown-text').innerText = `Time Left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            if (currentQuestion >= questions.length) {
                endQuiz();
            } else {
                displayQuestion();
                startCountdown(10);
            }
        }

        timeLeft--;
    }, 1000);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        const currentQuestionObj = questions[currentQuestion];

        if (answerIndex === currentQuestionObj.correctAnswer) {
            console.log('Correct answer!');
            score++;
        } else {
            console.log('Incorrect answer!');
        }

        clearInterval(timer);
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            endQuiz();
        } else {
            displayQuestion();
            startCountdown(10);
        }
    } else {
        alert('Please select an option!');
    }
}

function endQuiz() {
    let resultHTML = `<h1>Quiz Results</h1>`;
    resultHTML += `<p>Your score: ${score}/${questions.length}</p>`;
    resultHTML += `<button onclick="showCorrectAnswers()" class="show-answers-button">Show Correct Answers</button>`;
    resultHTML += `<button onclick="restartQuiz()" class="restart-button">Go Back to Beginning</button>`;
    document.getElementById('quiz-container').innerHTML = resultHTML;
}

function showCorrectAnswers() {
    let correctAnswersHTML = `<h2>Correct Answers:</h2>`;
    questions.forEach((question, index) => {
        correctAnswersHTML += `<p><strong>${index + 1}. ${question.question}</strong></p>`;
        correctAnswersHTML += `<p><strong>Correct Answer:</strong> ${question.options[question.correctAnswer]}</p>`;
    });

    document.getElementById('quiz-container').innerHTML += correctAnswersHTML;
}

function startQuiz() {
    const categorySelect = document.getElementById('category-select');
    chosenCategory = categorySelect.value;

    const filteredQuestions = questions.filter(question => question.category === chosenCategory);
    if (filteredQuestions.length > 0) {
        currentQuestion = 0;
        questions.splice(0, questions.length, ...filteredQuestions);

        document.getElementById('category-selection').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';

        displayQuestion();
        startCountdown(10);
    } else {
        alert('No questions found for the selected category.');
    }
}
function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    chosenCategory = null;
    document.getElementById('category-selection').style.display = 'block';
    document.getElementById('quiz-container').style.display = 'none';
}


window.onload = function() {
    displayQuestion();
};
