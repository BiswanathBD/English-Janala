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
          <button id="lesson-${lesson.level_no}" onclick="loadWords(${lesson.level_no})"
            class="text-blue-400 font-semibold border border-blue-400 px-3 py-2 text-sm rounded-md hover:bg-blue-50 flex items-center gap-1 transition-all"
          >
            <i class="fa-solid fa-book-open -mb-[2px]"></i>Lesson - ${lesson.level_no}
          </button>
    `;
    lessonsContainer.append(levelLessons);
  });
};

// word section
const loadWords = (id) => {
  const selectedLessons = document.querySelectorAll(".selected");
  selectedLessons.forEach((lesson) => {
    lesson.classList.remove("selected");
  });
  const clickedBtn = document.getElementById(`lesson-${id}`);
  clickedBtn.classList.add("selected");

  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayWords(json.data));
  const wordContainer = getById("word-container");
  wordContainer.innerHTML = "";
  const displayWords = (words) => {
    if (words.length == 0) {
      const emptyLesson = document.createElement("div");
      emptyLesson.classList.add(
        "col-span-full",
        "text-center",
        "space-y-4",
        "my-10"
      );
      emptyLesson.innerHTML = `
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-gray-400 bangla-font">এই Lesson-এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h3 class="bangla-font text-4xl font-semibold">পরবর্তি Lesson-এ যান</h3>
      </div>
      `;
      wordContainer.append(emptyLesson);
      return;
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
        "justify-between",
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

// word info
const wordDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showWordModal(data.data))
    .catch((err) => console.error(err));
};

function showWordModal(word) {
  const wordModal = document.createElement("div");
  wordModal.id = "details-card";
  wordModal.classList.add(
    "fixed",
    "inset-0",
    "bg-black/50",
    "backdrop-blur-sm",
    "flex",
    "justify-center",
    "items-center",
    "z-50",
    "opacity-0",
    "pointer-events-none",
    "transition-opacity",
    "duration-300"
  );

  wordModal.innerHTML = `
    <div class="m-10 w-full md:w-fit bg-white shadow-lg rounded-xl p-10 space-y-2 relative">
      <button id="closeModalBtn" class="absolute top-2 right-2 text-gray-500 hover:text-black">✖</button>
      <h3 class="text-4xl font-semibold mb-8">${
        word.word
      } (<i class="fa-solid fa-microphone-lines text-xl"></i>: ${
    word.pronunciation || "-"
  })</h3>
      <p class="font-semibold text-xl">Meaning</p>
      <p class="bangla-font text-xl mb-8">${word.meaning || "N/A"}</p>
      <p class="font-semibold text-xl">Example</p>
      <p class="text-xl mb-8">${word.sentence || "No example"}</p>
      <p class="bangla-font font-semibold text-xl">সমার্থক শব্দ গুলো</p>
      <div class="mb-8">${word.synonyms?.join(", ") || "N/A"}</div>
      <button id="learnBtn" class="bg-blue-400 text-white px-3 py-1 rounded-md mt-5">Complete Learning</button>
    </div>
  `;

  document.body.append(wordModal);

  // Fade-in
  setTimeout(() => {
    wordModal.classList.replace("opacity-0", "opacity-100");
    wordModal.classList.remove("pointer-events-none");
  }, 10);

  // Close modal
  wordModal.querySelector("#learnBtn").addEventListener("click", () => {
    wordModal.classList.replace("opacity-100", "opacity-0");
    wordModal.classList.add("pointer-events-none");
  });
  wordModal.querySelector("#closeModalBtn").addEventListener("click", () => {
    wordModal.classList.replace("opacity-100", "opacity-0");
    wordModal.classList.add("pointer-events-none");
  });
}

// FAQ
const faqSection = getById("faq-section");

faqSection.addEventListener("click", function (e) {
  if (e.target.classList.contains("expand-toggle")) {
    const faqItem = e.target.closest(".FAQ");
    const answer = faqItem.querySelector(".answer");
    const icon = faqItem.querySelector(".expand-toggle");

    answer.classList.toggle("hidden");

    icon.classList.toggle("fa-plus");
    icon.classList.toggle("fa-minus");
  }
});
