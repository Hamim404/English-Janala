function loadLesson() {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => displayLessonLevel(data.data))
}
loadLesson()

function displayWord(id) {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      wordDetails(data.data)
      const lessonBtn = document.getElementById(`lesson-btn-${id}`)
      const lessonAllBtn = document.querySelectorAll(".lesson-btn");
      lessonAllBtn.forEach(btn => {
        btn.classList.remove("active")
      })
      lessonBtn.classList.add("active")
    })
  
  
}

function wordDetails(words) {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = '';
  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div
        class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla"
      >
        <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
        `;
  }
  
  
  for (const word of words) {
    const card = document.createElement("div");
    card.innerHTML = `
     <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning / Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">" ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}"</div> 
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    
    wordContainer.append(card);
  }
}

function loadWordDetails(id) {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    displayWordDetails(data.data)
  })
}

function wordSynonym(synonymWords) {
  const words = synonymWords.map(word =>`<span class="btn">${word}</span>`);
  return words.join(" ");
}

function displayWordDetails(word) {
  const detailsContainer= document.getElementById("details-container");
  detailsContainer.innerHTML=`<div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${wordSynonym(word.synonyms)}</div>
          </div>
    `;
  document.getElementById("word_modal").showModal();
}

function displayLessonLevel(levels) {
  const levelContainer = document.getElementById("level-container");
  for (const level of levels) {
    const btnDiv = document.createElement("div")
    btnDiv.innerHTML = `
                 <button id="lesson-btn-${level.level_no}" onclick="displayWord(${level.level_no})"  class="btn btn-outline btn-primary lesson-btn">
                 <i class="fa-solid fa-book-open"></i> Lesson - ${level.level_no}
                  </button>
    `
    levelContainer.appendChild(btnDiv)
  }
}