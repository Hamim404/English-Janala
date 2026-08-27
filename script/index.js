function loadLesson(){
fetch('https://openapi.programming-hero.com/api/levels/all')
.then(res => res.json())
.then(data => displayLessonLevel(data.data))
}
loadLesson()


function displayLessonLevel(levels){
const levelContainer = document.getElementById("level-container");
    for ( const level of levels){
      const btnDiv = document.createElement("div")
btnDiv.innerHTML = `
                 <button id="lesson-btn" onclick="displayWord()"  class="btn btn-outline btn-primary lesson-btn">
                 <i class="fa-solid fa-book-open"></i> Lesson - ${level.level_no}
                  </button>
    `
levelContainer.appendChild(btnDiv)
    }
}
