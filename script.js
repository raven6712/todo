
let taches = JSON.parse(localStorage.getItem("taches")) || [];
function sauvegarder() {
  localStorage.setItem("taches", JSON.stringify(taches));
}
function afficher() {
  const liste = document.getElementById("liste-taches");
  liste.innerHTML = ""; // Vider la liste avant de la recréer

  taches.forEach(function(tache) {

    // Créer l'élément <li>
    const li = document.createElement("li");
    li.className = "tache" + (tache.faite ? " faite" : "");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tache.faite;
    checkbox.addEventListener("change", function() {
      cocher(tache.id);
    });
    const texte = document.createElement("span");
    texte.textContent = tache.texte;

    // Bouton supprimer
    const btnSuppr = document.createElement("button");
    btnSuppr.textContent = "🗑";
    btnSuppr.title = "Supprimer";
    btnSuppr.addEventListener("click", function() {
      supprimer(tache.id);
    });

    
    li.appendChild(checkbox);
    li.appendChild(texte);
    li.appendChild(btnSuppr);
    liste.appendChild(li);
  });

  
  mettreAJourStats();
}

function ajouter() {
  const champ = document.getElementById("champ-tache");
  const texte = champ.value.trim();

  if (texte === "") {
    champ.focus();
    return;
  }

  // Créer la nouvelle tâche
  const nouvelleTache = {
    id: Date.now(), 
    texte: texte,
    faite: false
  };

  taches.unshift(nouvelleTache); 
  champ.value = "";              
  sauvegarder();
  afficher();
  champ.focus();
}


function cocher(id) {
  const tache = taches.find(function(t) { return t.id === id; });
  if (tache) {
    tache.faite = !tache.faite;
    sauvegarder();
    afficher();
  }
}


function supprimer(id) {
  taches = taches.filter(function(t) { return t.id !== id; });
  sauvegarder();
  afficher();
}

function supprimerFaites() {
  const nbFaites = taches.filter(function(t) { return t.faite; }).length;

  if (nbFaites === 0) return; 
  if (confirm("Supprimer toutes les tâches faites ?")) {
    taches = taches.filter(function(t) { return !t.faite; });
    sauvegarder();
    afficher();
  }
}

function mettreAJourStats() {
  const total     = taches.length;
  const faites    = taches.filter(function(t) { return t.faite; }).length;
  const restantes = total - faites;

  document.getElementById("nb-total").textContent     = total;
  document.getElementById("nb-faites").textContent    = faites;
  document.getElementById("nb-restantes").textContent = restantes;
}

// Clic sur "Ajouter"
document.getElementById("btn-ajouter").addEventListener("click", ajouter);

// Touche Entrée dans le champ
document.getElementById("champ-tache").addEventListener("keydown", function(e) {
  if (e.key === "Enter") ajouter();
});

// Clic sur "Supprimer les tâches faites"
document.getElementById("btn-effacer").addEventListener("click", supprimerFaites);

afficher(); 
