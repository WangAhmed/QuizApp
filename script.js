const allQuestions = {
    beginner: [
        { question: "What does HTML stand for?", answers: ["HyperText Markup Language", "High Tech Machine Learning", "Hyper Transfer Markup Logic", "Home Tool Modern Language"], correct: 0 },
        { question: "Which company developed Windows OS?", answers: ["Apple", "Google", "Microsoft", "IBM"], correct: 2 },
        { question: "What does CPU stand for?", answers: ["Central Processing Unit", "Central Program Utility", "Core Processor Usage", "Central Power Unit"], correct: 0 },
        { question: "Which is a popular programming language?", answers: ["Python", "Snail", "Hawk", "Tiger"], correct: 0 },
        { question: "What is the full form of CSS?", answers: ["Cascading Style Sheets", "Computer Style System", "Creative Sheet Structure", "Coded Style Syntax"], correct: 0 },
        { question: "What is the main function of an OS?", answers: ["Manage hardware & software", "Create graphics", "Send emails", "Store data permanently"], correct: 0 },
        { question: "Which is NOT a web browser?", answers: ["Chrome", "Firefox", "Windows", "Safari"], correct: 2 },
        { question: "Which language is used for Android apps?", answers: ["Java", "Python", "Swift", "C++"], correct: 0 },
        { question: "What does HTTP stand for?", answers: ["HyperText Transfer Protocol", "High Transfer Text Processing", "Host Transfer Text Protocol", "Hyper Terminal Transport Protocol"], correct: 0 },
        { question: "Which company developed JavaScript?", answers: ["Microsoft", "Sun Microsystems", "Netscape", "IBM"], correct: 2 }
    ],
    intermediate: [
        { question: "Who created Linux?", answers: ["Linus Torvalds", "Apple", "Microsoft", "Google"], correct: 0 },
        { question: "What is a phishing attack?", answers: ["Cyber attack", "Fishing method", "Spam email", "Malware"], correct: 0 },
        { question: "What does API stand for?", answers: ["Application Programming Interface", "Automated Processing Information", "Applied Program Integration", "Advanced Protocol Integration"], correct: 0 },
        { question: "Which is NOT a database system?", answers: ["MySQL", "PostgreSQL", "SQLite", "React"], correct: 3 },
        { question: "What is the function of RAM?", answers: ["Store data permanently", "Execute programs & store data temporarily", "Process images", "Run antivirus software"], correct: 1 },
        { question: "Which language is used for AI?", answers: ["Python", "Swift", "Kotlin", "C"], correct: 0 },
        { question: "What is Git used for?", answers: ["Version Control", "Graphic Design", "Database Management", "Cybersecurity"], correct: 0 },
        { question: "What does VPN stand for?", answers: ["Virtual Private Network", "Visual Processing Node", "Verified Protocol Name", "Virtual Program Network"], correct: 0 },
        { question: "Which is an open-source OS?", answers: ["Windows", "macOS", "Linux", "iOS"], correct: 2 },
        { question: "Which tech powers smart contracts?", answers: ["Blockchain", "AI", "Cloud Computing", "5G"], correct: 0 }
    ],
    advanced: [
        { question: "What does SQL stand for?", answers: ["Structured Query Language", "Secure Question Logic", "System Query Language", "Software Quality Logic"], correct: 0 },
        { question: "Which framework is for front-end?", answers: ["Django", "React", "Node.js", "Laravel"], correct: 1 },
        { question: "Which is a cyber attack?", answers: ["DDoS", "CSS", "HTML", "PNG"], correct: 0 },
        { question: "What is the top cloud service?", answers: ["AWS", "Google Drive", "OneDrive", "Dropbox"], correct: 0 },
        { question: "Which is NOT a programming paradigm?", answers: ["Object-Oriented", "Functional", "Procedural", "Symmetrical"], correct: 3 },
        { question: "What is Docker used for?", answers: ["Containerization", "Database Management", "Machine Learning", "Video Editing"], correct: 0 },
        { question: "Which language is for ML?", answers: ["Python", "JavaScript", "PHP", "Swift"], correct: 0 },
        { question: "What does IoT stand for?", answers: ["Internet of Things", "Interface of Technology", "Input/Output Transmission", "Integrated Operating Terminal"], correct: 0 },
        { question: "Which is a decentralized tech?", answers: ["Blockchain", "5G", "Wi-Fi", "Ethernet"], correct: 0 },
        { question: "Which encryption secures web?", answers: ["RSA", "JPEG", "HTML", "SSL"], correct: 0 }
    ]
};

let currentLevel = "beginner";
let questions = shuffle(allQuestions[currentLevel]);
let currentQuestionIndex = 0;
let score = 0;
let timer = 60;
let timerInterval;

// Variables to store assessment scores and track the assessment progress
let assessmentScores = [0, 0, 0]; // Holds scores for Level 1, Level 2, Level 3
let currentAssessment = 0; // Tracks which assessment the user is on (0 = Level 1, 1 = Level 2, 2 = Level 3)

// DOM Elements
const questionElement = document.getElementById("question");
const answerButtonsContainer = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const progressCircle = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("prev-btn");
const progressElement = document.getElementById("progress-container");
const scoreDisplay = document.getElementById("score-display");
const restartBtn = document.getElementById("restart-btn");
const questionNumberElement = document.getElementById("question-number");

function loadQuestion() {
    clearInterval(timerInterval);
    timer = 60;
    updateTimer();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    answerButtonsContainer.innerHTML = "";

    // Update the question index (e.g., Question 1 of 10)
    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer-btn");
        button.onclick = () => selectAnswer(index);
        answerButtonsContainer.appendChild(button);
    });

    startTimer();
}

function selectAnswer(index) {
    clearInterval(timerInterval);
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((btn, i) => {
        if (i === correctIndex) btn.style.backgroundColor = "green";
        else if (i === index) btn.style.backgroundColor = "red";
        btn.disabled = true;
    });

    if (index === correctIndex) score++;

    setTimeout(() => nextQuestion(), 1000);
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        checkLevelProgress();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function checkLevelProgress() {
    let grade;
    if (score >= 9) grade = "A (Excellent)";
    else if (score >= 7) grade = "B (Good)";
    else if (score >= 5) grade = "C (Average)";
    else if (score >= 3) grade = "D (Poor)";
    else grade = "F (Fail)";

    // Store score for current assessment
    assessmentScores[currentAssessment] = score;

    // Show the progress container after completing the level
    progressElement.classList.remove("hidden");

    // Display Level Completion and Assignment Scores
    progressElement.innerHTML = `
        <h2>Level ${currentLevel.toUpperCase()} Completed!</h2>
        <p>Score: ${score}/10</p>
        <p>Grade: ${grade}</p>
        <p><strong>Assignment 1 Score: ${assessmentScores[0]}</strong></p>
        <p><strong>Assignment 2 Score: ${assessmentScores[1]}</strong></p>
        <p><strong>Assignment 3 Score: ${assessmentScores[2]}</strong></p>
        <p><strong>Grand Total: ${assessmentScores.reduce((a, b) => a + b, 0)}/30</strong></p>
    `;
    
    currentAssessment++;

    if (score >= 7) {
        // If the user passes, move to the next level
        if (currentAssessment < 3) {
            setTimeout(loadNextLevel, 2000);
        } else {
            progressElement.innerHTML += `<p>🎉 You completed all levels! Final Score: ${assessmentScores.reduce((a, b) => a + b, 0)}/30</p>`;
        }
    } else {
        // If the user fails, show the restart button
        nextBtn.style.display = "none";
        backBtn.style.display = "none";
        restartBtn.style.display = "inline-block";
    }
}

// Function to load the next level (assessment)
function loadNextLevel() {
    if (currentAssessment === 1) currentLevel = "intermediate";
    else if (currentAssessment === 2) currentLevel = "advanced";

    // Reset the score and question index for the next level
    score = 0;
    currentQuestionIndex = 0;

    // Shuffle and load new questions based on the current level
    questions = shuffle(allQuestions[currentLevel]);

    // Hide progress info and load the next question
    progressElement.classList.add("hidden");
    loadQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        updateTimer();
        if (timer <= 0) nextQuestion();
    }, 1000);
}

function updateTimer() {
    timerElement.innerText = timer;
    progressCircle.style.strokeDashoffset = (283 * timer) / 60;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Restart the quiz
function restartQuiz() {
    currentLevel = "beginner";
    score = 0;
    currentQuestionIndex = 0;
    restartBtn.style.display = "none";  // Hide restart button
    nextBtn.style.display = "inline-block"; // Show the Next button
    backBtn.style.display = "inline-block"; // Show the Back button
    progressElement.classList.add("hidden");  // Hide progress container
    assessmentScores = [0, 0, 0]; // Reset assessment scores
    currentAssessment = 0; // Reset current assessment
    loadQuestion();
}

// Initialize the quiz
loadQuestion();

// Event listeners for next and back buttons
nextBtn.onclick = nextQuestion;
backBtn.onclick = prevQuestion;
restartBtn.onclick = restartQuiz;
