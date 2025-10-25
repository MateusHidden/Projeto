const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const quiz = document.getElementById("quiz");
const intro = document.getElementById("intro");
const questionContainer = document.getElementById("question-container");
const result = document.getElementById("result");
const courseText = document.getElementById("course");
const restartBtn = document.getElementById("restart");

const questions = [
  {question: "1) Quando você pensa no futuro, qual dessas situações mais te anima?", options: ["A) Ajudar as pessoas a sorrirem com mais confiança e cuidar da saúde bucal delas.", "B) Defender causas justas e lutar pelos direitos das pessoas.", "C) Ensinar e inspirar outras pessoas a aprender coisas novas.", "D) Criar soluções tecnológicas e desenvolver programas inovadores.", "E) Ouvir, compreender e ajudar as pessoas a lidarem com suas emoções e desafios."]},
  {question: "2) Qual dessas matérias você mais gosta (ou se identifica)?", options: ["A) Biologia e Ciências — adoro entender o corpo humano.", "B) História e Sociologia — gosto de discutir leis e sociedade.", "C) Português e Literatura — me interesso por comunicação e ensino.", "D) Matemática e Lógica — curto desafios que envolvem raciocínio e códigos.", "E) Filosofia e Psicologia — adoro entender o comportamento humano."]},
  {question: "3) Qual das atividades abaixo você mais gostaria de fazer no seu dia a dia de trabalho?", options: ["A) Resolver problemas matemáticos, criar programas ou desenvolver sistemas.", "B) Cuidar da saúde e do bem-estar das pessoas", "C) Ensinar e orientar outras pessoas em seu aprendizado", "D) Fazer cumprir as leis e garantir a justiça", "E) Escutar e compreender pessoas em seus sofrimentos e emoções."]},
  {question: "4) Quais características são importantes para que você escolha uma profissão?", options: ["A) ética e compromisso com a justiça.", "B) lecionar e transmitir meus conhecimentos.", "C) cuidados voltados á saúde mental ou psicológica da população.", "D) autonomia para desenvolver programas e novas tecnologias.", "E) cuidados com a saúde bucal e auto estima da população."]},
  {question: "5) Dentre as carreiras abaixo, qual você se interessou em pesquisar ou teve algum contato?", options: ["A) Delegado, Juiz, Advogado ou Promotor.", "B) Professor, Pedagogo ou Coordenador Educacional.", "C) Psicólogo/psiquiatra, Terapeuta ou Assistente Social.", "D) Prefiro áreas voltadas à inovação e tecnologia", "E) Dentista, auxiliar de saúde bucal."]},
  {question: "6) Qual tipo de atividade te deixaria mais satisfeito(a) no dia a dia?", options: ["A) Atender pessoas e ver resultados concretos do meu trabalho na saúde delas.", "B) Defender um caso importante ou participar de um debate.", "C) Ajudar alguém a compreender algo novo e ver seu progresso.", "D) Desenvolver um aplicativo que facilita a vida das pessoas.", "E) Ajudar alguém a superar dificuldades emocionais e alcançar equilíbrio mental."]},
  {question: "7) Durante um trabalho em grupo, qual papel você costuma assumir?", options: ["A) Cuido dos detalhes e gosto de deixar tudo “perfeito” no final.", "B) Faço questão de organizar as regras e garantir que todos sejam ouvidos.", "C) Tenho paciência e explico as partes difíceis para quem está com dúvida.", "D) Sou quem resolve os problemas técnicos e ajuda com o computador.", "E) Escuto os colegas e tento entender o ponto de vista de cada um."]},
  {question: "8) Você se sente motivado(a) em ajudar outras pessoas a aprender e se desenvolver, mesmo que isso exija paciência e repetição?", options: ["A) Sim, gosto de orientar e encontrar formas diferentes de ensinar.", "B) Gosto de compreender como a pessoa pensa e o que a impede de aprender.", "C) Prefiro focar em detalhes técnicos e práticos para encontrar soluções.", "D) Aprecio quando posso explicar com precisão e cuidado, valorizando o resultado final.", "E) Gosto de mostrar às pessoas o que é certo e defender meu ponto de vista."]},
  {question: "9) Como você costuma reagir diante de conflitos entre colegas ou no dia a dia?", options: ["A) Tento compreender o que cada um está sentindo e ajudar a encontrar um meio-termo", "B) Busco mediar a conversa e encontrar uma solução justa para todos.", "C) Tento ensinar que o diálogo e o respeito são fundamentais para a convivência.", "D) Prefiro me afastar e me concentrar em resolver as coisas de forma prática e objetiva.", "E) Tento manter a calma e pensar em como preservar uma boa imagem ou relação."]},
  {question: "10) Quando você vê alguém passando por um momento difícil, o que costuma sentir vontade de fazer?", options: ["A) Ajudar cuidando de sua saúde e bem-estar físico", "B) Entender se a situação é justa e o que pode ser feito legalmente.", "C) Orientar e ensinar algo que possa ajudá-lo a lidar melhor com a situação.", "D) Ouvir com atenção e oferecer apoio emocional para compreender o que ele sente.", "E) Pensar em uma solução prática ou tecnológica que possa resolver o problema."]},
];

const gabarito = {
  "Odontologia": ["A","A","B","E","E","A","A","D","E","A"],
  "Pedagogia": ["C","C","C","B","B","C","C","A","C","C"],
  "Psicologia": ["E","E","E","C","C","E","E","B","A","D"],
  "Ciencias da Computacao": ["D","D","A","D","D","D","D","C","D","E"],
  "Direito": ["B","B","D","A","A","B","B","E","B","B"]
};

let currentQuestion = 0;
let userAnswers = [];

function showQuestion() {
  const q = questions[currentQuestion];
  questionContainer.innerHTML = `
    <div class='question'>${q.question}</div>
    <div class='options'>
      ${q.options.map((opt, index) => `<button class='option'>${opt}</button>`).join("")}
    </div>
  `;
  document.querySelectorAll(".option").forEach((btn, index) => {
    btn.addEventListener("click", () => selectOption(btn.textContent[0]));
  });
  questionContainer.classList.add("show");
}

function selectOption(optionLetter) {
  userAnswers.push(optionLetter);
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  nextBtn.classList.add("hidden");
  if(currentQuestion < questions.length){
    showQuestion();
  } else {
    showResult();
  }
});

function showResult(){
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  let scores = {};
  for(let course in gabarito){
    let score = 0;
    for(let i=0; i<10; i++){
      if(userAnswers[i] === gabarito[course][i]) score++;
    }
    scores[course] = score;
  }
  let bestCourse = Object.keys(scores).reduce((a,b)=>scores[a]>=scores[b]?a:b);
  courseText.textContent = `Seu curso ideal é: ${bestCourse}`;
}

startBtn.addEventListener("click", ()=>{
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

restartBtn.addEventListener("click", ()=> location.reload());
