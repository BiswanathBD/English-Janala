const getById = (id) => document.getElementById(id);
// mobile menu bar
getById("bar").addEventListener("click", (e) => {
  e.preventDefault();
  const menu = getById("options");

  if (menu.classList.contains("opacity-0")) {
    menu.classList.replace("opacity-0", "opacity-100");
    menu.classList.remove("pointer-events-none");
    menu.classList.add("top-18");
  } else {
    menu.classList.replace("opacity-100", "opacity-0");
    menu.classList.add("pointer-events-none");
    menu.classList.remove("top-18");
  }
});

// lessons buttons
fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((res) => res.json())
  .then((json) => displayLessons(json.data));

const displayLessons = (lessons) => {
  const lessonsContainer = getById("LessonsContainer");
  lessonsContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const levelLessons = document.createElement("button");
    levelLessons.innerHTML = `
          <button onclick="loadWords(${lesson.level_no})"
            class="text-blue-400 font-semibold border border-blue-400 px-3 py-2 text-sm rounded-md hover:bg-blue-400 hover:text-white flex items-center gap-1 transition-all"
          >
            <i class="fa-solid fa-book-open -mb-[2px]"></i>Lesson - ${lesson.level_no}
          </button>
    `;
    lessonsContainer.append(levelLessons);
  });
};

// word section
const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayWords(json.data));
  const wordContainer = getById("word-container");
  wordContainer.innerHTML = "";
  const displayWords = (words) => {
    if(words.length == 0){

    }
    words.forEach((word) => {
      const wordCard = document.createElement("div");
      wordCard.classList.add(
        "bg-white",
        "rounded-md",
        "p-10",
        "text-center",
        "flex",
        "flex-col",
        "gap-20",
        "shadow-xl",
        "shadow-sky-50"
      );
      wordCard.innerHTML = `<div class="space-y-5">
          <h3 class="text-3xl font-bold mt-4">${
            word.word ? word.word : "শব্দ পাওয়া যায়নি"
          }</h3>
          <p class="font-semibold">Meaning /Pronunciation</p>
          <h3 class="text-3xl font-bold mt-10 bangla-font text-gray-500">${
            word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
          } / ${
        word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"
      }</h3>
        </div>
        <div class="flex justify-between">
          <button onClick ="wordDetails(${word.id})"
           class="p-4 bg-sky-50 rounded-lg hover:bg-sky-100"><i class="fa-solid fa-circle-info text-2xl"></i></button>
          <button class="p-4 bg-sky-50 rounded-lg hover:bg-sky-100"><i class="fa-solid fa-volume-high text-2xl"></i></button>
        </div>`;
      wordContainer.append(wordCard);
    });
  };
};
