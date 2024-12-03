const questions = [
    { 
        text: "Сөз кім? не? сұрағына жауап береді ме?", 
        yes: "Атау септік!", 
        no: 1 
    },
    { 
        text: "Сөз кімді? нені? сұрағына жауап береді ме?", 
        yes: "Ілік септік!", 
        no: 2 
    },
    { 
        text: "Сөз кімге? неге? сұрағына жауап береді ме?", 
        yes: "Барыс септік!", 
        no: 3 
    },
    { 
        text: "Сөз кімде? неде? сұрағына жауап береді ме?", 
        yes: "Жатыс септік!", 
        no: 4 
    },
    { 
        text: "Сөз кімнен? неден? сұрағына жауап береді ме?", 
        yes: "Шығыс септік!", 
        no: 5 
    },
    { 
        text: "Сөз кіммен? немен? сұрағына жауап береді ме?", 
        yes: "Көмектес септік!", 
        no: null 
    }
];

let currentQuestionIndex = 0;

function nextQuestion(answer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (answer && currentQuestion.yes) {
        // Если ответ "ИӘ" и это приводит к падежу
        document.getElementById("app").innerHTML = `
            <h1 class="text-2xl font-bold text-green-600">${currentQuestion.yes}</h1>
            <button onclick="restart()" class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Заново</button>
        `;
    } else if (!answer && currentQuestion.no !== null) {
        // Если ответ "ЖОҚ" и есть следующий вопрос
        currentQuestionIndex = currentQuestion.no;
        document.getElementById("question").textContent = questions[currentQuestionIndex].text;
    } else {
        // Если ответ "ЖОҚ" и вопросов больше нет
        document.getElementById("app").innerHTML = `
            <h1 class="text-2xl font-bold text-red-600">Бұл септік емес!</h1>
            <button onclick="restart()" class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Заново</button>
        `;
    }
}

function restart() {
    currentQuestionIndex = 0;
    location.reload();
}


const caseData = {
    atu: {
        name: "Атау септік",
        description: "Базовая форма слова, используется без суффиксов.",
        kdescription: "Сөздің негізгі түрі, жұрнақсыз қолданылады.",
        suffixes: ["(нет суффиксов)"],
        examples: ["Кітап", "Мектеп", "Қала"]
    },
    ilik: {
        name: "Ілік септік",
        description: "Обозначает принадлежность или отношение.",
        kdescription: "Тәуелділік немесе қатынасты білдіреді.",
        suffixes: ["ның", "нің", "дың", "дің", "тың", "тің"],
        examples: ["Кітаптың", "Мектептің", "Қаланың"]
    },
    barys: {
        name: "Барыс септік",
        description: "Обозначает направление.",
        kdescription: "Бағытты білдіреді.",
        suffixes: ["ға", "ге", "қа", "ке"],
        examples: ["Кітапқа", "Қалаға", "Мектепке"]
    },
    tabys: {
        name: "Табыс септік",
        description: "Обозначает объект действия.",
        kdescription: "Әрекеттің нысанын білдіреді.",
        suffixes: ["ны", "ні", "ды", "ді", "ты", "ті"],
        examples: ["Кітапты", "Мектепті", "Қаланы"]
    },
    jatys: {
        name: "Жатыс септік",
        description: "Обозначает местонахождение.",
        kdescription: "Орналасқан жерді білдіреді.",
        suffixes: ["да", "де", "та", "те"],
        examples: ["Кітапта", "Мектепте", "Қалада"]
    },
    shygys: {
        name: "Шығыс септік",
        description: "Обозначает отправление.",
        kdescription: "Шығуды немесе орыннан кетуді білдіреді.",
        suffixes: ["дан", "ден", "тан", "тен"],
        examples: ["Қаладан", "Мектептен", "Үйден"]
    },
    kom: {
        name: "Көмектес септік",
        description: "Обозначает средство или совместность.",
        kdescription: "Құралды немесе бірлесіп әрекет етуді білдіреді.",
        suffixes: ["мен", "бен", "пен"],
        examples: ["Қаламмен", "Қалақпен", "Досымен"]
    }
};


const params = new URLSearchParams(window.location.search);
const caseKey = params.get("case");

if (caseData[caseKey]) {
    const caseInfo = caseData[caseKey];
    document.getElementById("caseName").textContent = caseInfo.name;
    const body = document.body;
        
            // Применяем сохранённый язык
    if (localStorage.getItem('language') === 'kazakh') {
        document.getElementById("caseDescription").textContent = caseInfo.kdescription;
    } else {
        document.getElementById("caseDescription").textContent = caseInfo.description;
    }

    // Вывод суффиксов с метками
    const suffixList = caseInfo.suffixes
    .map(suffix => `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm shadow">${suffix}</span>`)
    .join("");
    document.getElementById("caseSuffixes").innerHTML = suffixList;

    // Вывод примеров
    const examplesList = caseInfo.examples.map(example => `<li>${example}</li>`).join("");
    document.getElementById("caseExamples").innerHTML = examplesList;
} else {
    document.getElementById("content").innerHTML = "<h1 class='text-red-600'>Ошибка: Падеж не найден!</h1>";
}

document.getElementById('lang-toggle').addEventListener('click', () => {
    const caseInfo = caseData[caseKey];
    const langButton = document.getElementById('lang-toggle');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const moreInfo = document.getElementById('more-info');
    
    if (langButton.innerText === 'Русский') {
        langButton.innerText = 'Қазақша';
        document.getElementById("caseDescription").textContent = caseInfo.kdescription;
        localStorage.setItem('language', 'kazakh');
    } else {
        langButton.innerText = 'Русский';
        document.getElementById("caseDescription").textContent = caseInfo.description;
        localStorage.setItem('language', 'russian');
    } 
    });