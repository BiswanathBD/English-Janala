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

fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((res) => res.json())
  .then((json) => displayLessons(json.data));

const displayLessons = (lessons) => {
  const lessonsContainer = getById("LessonsContainer");
  lessonsContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const levelLessons = document.createElement("button");
    levelLessons.innerHTML = `
          <button
            class="text-blue-400 font-semibold border border-blue-400 px-3 py-2 text-sm rounded-md hover:bg-blue-400 hover:text-white flex items-center gap-1 transition-all"
          >
            <i class="fa-solid fa-book-open -mb-[2px]"></i>Lesson - ${lesson.level_no}
          </button>
    `;
    lessonsContainer.append(levelLessons)
  });
};
