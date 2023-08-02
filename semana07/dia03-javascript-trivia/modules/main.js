import { bdQuestions } from '../data.js';

const cardBox = document.querySelector('#card__box');
const question = document.querySelector('#card__question');
const option1 = document.querySelector('#card__option1');
const option2 = document.querySelector('#card__option2');
const option3 = document.querySelector('#card__option3');
const next = document.querySelector('#card__next');
const buttons = document.querySelectorAll('.button__options');
const options = document.querySelector('#card__options');

const cardAnswer = document.querySelector('#card__answer');
const replay = document.querySelector('#card__replay');
const cardTitle = document.querySelector('#card__answer__title');
const cardScore = document.querySelector('#card__answer__score');
const cardPoints = document.querySelector('#card__answer__points');
const newImage = document.querySelector("#card__newImage");

let i = 0;
loadQuestion();

let optionClick = '';
let optionClass = '';
let correctas = 0;
let incorrectas = 0;
let puntos = 0;

buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        optionClick = event.target.innerText;
        optionClass = event.target.id;
        // console.log(optionClick)
        // console.log(optionClass)
        // console.log(bdQuestions[i].answer)
        // console.log(event)

        loadQuestion();

        if (optionClick === bdQuestions[i].answer) {
            if (optionClass === 'card__option1') {
                option1.className = 'button__options text-white border border-green-600 bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2 w-full';
                puntos += 7;
            } else if (optionClass === 'card__option2') {
                option2.className = 'button__options text-white border border-green-600 bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2 w-full';
                puntos += 7;
            } else if (optionClass === 'card__option3') {
                option3.className = 'button__options text-white border border-green-600 bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2 w-full';
                puntos += 6;
            }

            next.disabled = false;
            next.style.opacity = 1;
            option1.disabled = true;
            option2.disabled = true;
            option3.disabled = true;
            correctas += 1;
            addHTML()

        } else if (optionClick !== bdQuestions[i].answer) {
            if (optionClass === 'card__option1') {
                option1.className = 'button__options text-white border border-red-600 bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2 w-full';
            } else if (optionClass === 'card__option2') {
                option2.className = 'button__options text-white border border-red-600 bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2 w-full';
            } else if (optionClass === 'card__option3') {
                option3.className = 'button__options text-white border border-red-600 bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2 w-full';
            }

            next.disabled = false
            next.style.opacity = 1;
            option1.disabled = true;
            option2.disabled = true;
            option3.disabled = true;
            incorrectas += 1;
            addHTML()

        }
    })
})

next.addEventListener('click', function () {
    i += 1;

    if (i < bdQuestions.length) {
        loadQuestion()
    }

    console.log(i)

    if (i === 2) {
        next.innerHTML = "Mostrar Resultados";
        next.className = 'text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2';
    } else {
        next.innerHTML = "Siguiente pregunta";
        next.className = 'text-gray-900 bg-white hover:bg-gray-100 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2';
    }

    if (i >= 3) {
        cardBox.classList.add('hidden');
        cardAnswer.classList.remove('hidden');
        i = 2;

        if (correctas >= 2) {
            cardAnswer.classList.add('bg-green-600');
            cardTitle.innerHTML = '¡GANASTE!';
            addImage('./images/victoria.svg');
        } else {
            cardAnswer.classList.add('bg-red-600');
            cardTitle.innerHTML = '¡PERDISTE!';
            addImage('./images/derrota.jpg');
        }

        cardScore.innerHTML = `Respondiste ${correctas} de 3`;
        cardPoints.innerHTML = `Y este es tu puntaje: ${puntos}`
    }
})

replay.addEventListener('click', function () {
    i = 0;
    correctas = 0;
    incorrectas = 0;
    puntos = 0;

    cardBox.classList.remove('hidden');
    cardAnswer.classList.add('hidden');

    const removeElement = document.querySelector('#card__newElemnt');
    options.removeChild(removeElement);

    cardAnswer.classList.remove('bg-green-600') || cardAnswer.classList.remove('bg-red-600');

    const img = document.querySelector('#card__image__answer');
    newImage.removeChild(img);

    loadQuestion()
})

function loadQuestion() {
    option1.className = 'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2 w-full';
    option2.className = 'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2 w-full';
    option3.className = 'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-left mr-2 mb-2 w-full';

    question.innerHTML = bdQuestions[i].question;
    option1.innerHTML = bdQuestions[i].option[0];
    option2.innerHTML = bdQuestions[i].option[1];
    option3.innerHTML = bdQuestions[i].option[2];

    next.disabled = true;
    next.style.opacity = 0.3;
    option1.disabled = false;
    option2.disabled = false;
    option3.disabled = false;
}

function addHTML() {
    const div = document.createElement("div");
    div.className = "flex flex-col w-full";
    div.id = "card__newElemnt";

    options.appendChild(div);

    const newElement = document.querySelector('#card__newElemnt');

    let cad = `<span class="mt-5 mb-2 p-1 text-green-600 font-semibold bg-green-200 w-full rounded-lg text-center">
                    Correctas : ${correctas}
                </span>
                <span class="mb-2 p-1 text-red-600 font-semibold bg-red-200 w-full rounded-lg text-center">
                    Incorrectas : ${incorrectas}
                </span>
                <span class="mb-2 p-1 text-blue-600 font-semibold bg-blue-200 w-full rounded-lg text-center">
                    Puntos : ${puntos}
                </span>`;

    newElement.innerHTML = cad;
}

function addImage(pathIMG) {
    const img = document.createElement("img");
    img.src = pathIMG;
    img.id = "card__image__answer";
    img.className = "h-40 mx-auto";

    newImage.appendChild(img);
}