let currentQuestion = 0;
let timer;
let score = 0; // Initialize the score variable
const questions = [
    {
        question: "What is my favorite color?",
        options: ["Red", "Purple", "Green", "Yellow"],
        correctAnswer: 1
    },
    {
        question: "What is my favorite food?",
        options: ["Pizza", "Sushi", "Burger", "Salad"],
        correctAnswer: 2
    },
    {
        question: "What is my favorite animal?",
        options: ["Dog", "Cat", "Horse", "Chinchilla"],
        correctAnswer: 0
    }
];

function startQuiz() {
    document.getElementById('startButton').style.display = 'none'; // Hide the Start Quiz button
    document.getElementById('quiz-container').style.display = 'block'; // Show the quiz container
    displayQuestion(); // Start displaying questions
    startCountdown(10); // Start the countdown
}

function displayQuestion() {
    const currentQuestionObj = questions[currentQuestion];
    document.getElementById('question').innerText = currentQuestionObj.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Clear previous options

    currentQuestionObj.options.forEach((option, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer'; // Ensure all radio inputs for answers have the same name
        input.value = index;
        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${option}`));
        optionsDiv.appendChild(label);
    });
}

function startCountdown(seconds) {
    clearInterval(timer);
    let timeLeft = seconds;
    document.getElementById('countdown-text').innerText = `Time left: ${timeLeft} seconds`;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('countdown-text').innerText = `Time left: ${timeLeft} seconds`;

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
    }, 1000);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        const currentQuestionObj = questions[currentQuestion];

        if (answerIndex === currentQuestionObj.correctAnswer) {
            console.log('Correct answer!');
            score++; // Increase the score if the answer is correct
        } else {
            console.log('Incorrect answer!');
        }

        clearInterval(timer); // Stop the countdown
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
    let incorrectQuestions = [];

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector('input[name="answer"]:checked');

        if (selectedOption) {
            const answerIndex = parseInt(selectedOption.value);
            if (answerIndex !== question.correctAnswer) {
                incorrectQuestions.push({ question: question.question, correctAnswer: question.options[question.correctAnswer], selectedAnswer: question.options[answerIndex] });
            }
        } else {
            incorrectQuestions.push({ question: question.question, correctAnswer: question.options[question.correctAnswer], selectedAnswer: 'Not answered' });
        }
    });

    let resultHTML = `<h1>Quiz Results</h1>`;
    resultHTML += `<p>Your score: ${score}/${questions.length}</p>`;

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = resultHTML;

    if (incorrectQuestions.length > 0) {
        const showCorrectBtn = document.createElement('button');
        showCorrectBtn.textContent = 'Show Correct Answers';
        showCorrectBtn.onclick = showCorrectAnswers;
        quizContainer.appendChild(showCorrectBtn);
    } else {
        quizContainer.innerHTML += `<p>Congratulations! You got all the answers correct!</p>`;
    }
}

function showCorrectAnswers() {
    let correctAnswersHTML = `<h2>Correct Answers:</h2>`;
    questions.forEach((question, index) => {
        correctAnswersHTML += `<p><strong>${index + 1}. ${question.question}</strong></p>`;
        correctAnswersHTML += `<p><strong>Correct Answer:</strong> ${question.options[question.correctAnswer]}</p>`;
    });

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML += correctAnswersHTML;

    // Hide the button after rendering the correct answers
    const showCorrectBtn = document.querySelector('button');
    if (showCorrectBtn) {
        showCorrectBtn.style.display = 'none';
    }
}



function showCorrectAnswers() {
    let correctAnswersHTML = `<h2>Correct Answers:</h2>`;
    questions.forEach((question, index) => {
        correctAnswersHTML += `<p><strong>${index + 1}. ${question.question}</strong></p>`;
        correctAnswersHTML += `<p><strong>Correct Answer:</strong> ${question.options[question.correctAnswer]}</p>`;
    });

    document.getElementById('quiz-container').innerHTML += correctAnswersHTML;
}

// Start the quiz and countdown when the page loads
/*window.onload = function() {
    startQuiz();
};*/
