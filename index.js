const getById = (id) => document.getElementById(id);
// mobile menu bar
getById("bar").addEventListener("click", (e) => {
  e.preventDefault();
  const menu = getById("options");

  if (menu.classList.contains("opacity-0")) {
    menu.classList.replace("opacity-0", "opacity-100");
    menu.classList.remove("pointer-events-none");
    menu.classList.add("top-18"); // optional slide effect
  } else {
    menu.classList.replace("opacity-100", "opacity-0");
    menu.classList.add("pointer-events-none");
    menu.classList.remove("top-18");
  }
});
const menu = getById("options");
console.log(menu.childNodes);

