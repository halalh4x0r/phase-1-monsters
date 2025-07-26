document.addEventListener("DOMContentLoaded", () => {
  const monsterContainer = document.getElementById("monster-container");
  const monsterForm = document.getElementById("monster-form");
  const loadMoreBtn = document.getElementById("load-more");

  let currentPage = 1;
  const limit = 50;

  // Load monsters
  function loadMonsters(page) {
    fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
      .then((res) => res.json())
      .then((monsters) => {
        monsters.forEach(monster => renderMonster(monster));
      })
      .catch(err => console.error("Failed to load monsters:", err));
  }

  // Render a monster on the page
  function renderMonster(monster) {
    const div = document.createElement("div");
    div.className = "monster";
    div.innerHTML = `
      <h3>${monster.name}</h3>
      <p><strong>Age:</strong> ${monster.age.toFixed(2)}</p>
      <p><strong>Description:</strong> ${monster.description}</p>
    `;
    monsterContainer.appendChild(div);
  }

  // Handle new monster creation
  monsterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = parseFloat(document.getElementById("age").value);
    const description = document.getElementById("description").value.trim();

    const newMonster = { name, age, description };

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newMonster)
    })
      .then(res => res.json())
      .then(monster => {
        renderMonster(monster);
        monsterForm.reset();
      })
      .catch(err => console.error("Failed to create monster:", err));
  });

  // Load next page of monsters
  loadMoreBtn.addEventListener("click", () => {
    currentPage++;
    loadMonsters(currentPage);
  });

  // Initial load
  loadMonsters(currentPage);
});
