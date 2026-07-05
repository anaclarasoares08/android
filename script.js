
// 1. Banco de dados com o conhecimento mitológico
const flashcardsData = [
    {
        rune: "ᚦᛟᚱ",
        question: "Quem é o Deus do Trovão e protetor de Midgard?",
        answer: "Thor! Filho de Odin, empunha o martelo Mjölnir e viaja em uma carruagem puxada por bodes."
    },
    {
        rune: "ᛟᛞᛁᚾ",
        question: "Quem é o Pai de Todos e governante supremo de Asgard?",
        answer: "Odin! Trocou um de seus olhos por sabedoria eterna na fonte de Mimir e possui os corvos Huginn e Muninn."
    },
    {
        rune: "ᛚᛟᚲᛁ",
        question: "Quem é o Deus da trapaça e das travessuras, gerador de monstros?",
        answer: "Loki! Um gigante de gelo por nascimento adotado pelos deuses. É pai do lobo Fenrir e da serpente Jörmungandr."
    },
    {
        rune: "ᛦᚷᛞᚱ",
        question: "O que é a Yggdrasil na cosmologia nórdica?",
        answer: "A Árvore do Mundo! O freixo colossal sagrado que conecta e sustenta os Nove Reinos do universo em suas raízes e galhos."
    }
];

let currentIndex = 0;

// 2. Mapeamento dos elementos do HTML
const cardContainer = document.getElementById('cardContainer');
const flashcard = document.getElementById('flashcard');
const thunderFlash = document.getElementById('thunderFlash');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

const frontRune = document.getElementById('frontRune');
const frontTitle = document.getElementById('frontTitle');
const backContent = document.getElementById('backContent');

// 3. Função para atualizar os textos dos cards
function updateCardData() {
    const currentCard = flashcardsData[currentIndex];
    frontRune.textContent = currentCard.rune;
    frontTitle.textContent = currentCard.question;
    backContent.textContent = currentCard.answer;
}

// 4. Função para disparar a animação do Trovão
function triggerThunderStrike() {
    // Adiciona a classe que ativa a animação do CSS
    thunderFlash.classList.add('active-thunder');
    
    // Remove a classe logo após o término (0.4 segundos) para que possa ser usada de novo
    setTimeout(() => {
        thunderFlash.classList.remove('active-thunder');
    }, 400);
}

// 5. Escutador de clique para VIRAR O CARD
cardContainer.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
    
    // Conjura o trovão apenas quando revela a resposta (quando o card vira)
    if (flashcard.classList.contains('flipped')) {
        triggerThunderStrike();
    }
});

// 6. Escutador de clique para o botão PRÓXIMO
btnNext.addEventListener('click', (event) => {
    // Impede que o clique no botão ative o clique do card de virar
    event.stopPropagation(); 
    
    // Desvira o card primeiro
    flashcard.classList.remove('flipped');
    
    // Espera o card começar a desvirar para trocar o texto e soltar o raio
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % flashcardsData.length;
        updateCardData();
        triggerThunderStrike();
    }, 150);
});

// 7. Escutador de clique para o botão ANTERIOR
btnPrev.addEventListener('click', (event) => {
    event.stopPropagation();
    flashcard.classList.remove('flipped');
    
    setTimeout(() => {
        currentIndex = (currentIndex - 1 + flashcardsData.length) % flashcardsData.length;
        updateCardData();
        triggerThunderStrike();
    }, 150);
});

// 8. Inicializa os dados na tela assim que o arquivo carrega
updateCardData();
