/* Products page group script: category filtering. */

(function initProductFilter() {
  const pills = [...document.querySelectorAll(".filter-pill")];
  const grid = document.querySelector(".product-grid");
  if (!pills.length || !grid) return;

  function applyFilter(filter) {
    pills.forEach((pill) => pill.classList.remove("active"));
    const activePill =
      document.querySelector(`.filter-pill[data-filter="${filter}"]`) ||
      pills[0];
    activePill.classList.add("active");

    if (filter === "alle") {
      delete grid.dataset.filter;
    } else {
      grid.dataset.filter = filter;
    }
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => applyFilter(pill.dataset.filter));
  });

  const param = new URLSearchParams(window.location.search).get("filter");
  if (param) applyFilter(param);
})();
