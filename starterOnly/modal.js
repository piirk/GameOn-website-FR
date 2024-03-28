function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.addEventListener('click', closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = 'none';
}

// DOM elements form
const prenom = document.getElementById("first")
const nom = document.getElementById("last")
const email = document.getElementById("email")
const dateDeNaissance = document.getElementById("birthdate")
const nbTournois = document.getElementById("quantity")
const localisations = document.getElementsByName("location")
const conditionsGenerales = document.getElementById("checkbox1")

// valider nom de famille
function validerNom (champ) {
  // on retire les espaces inutiles
  const nom = champ.value.trim()
  
  // pas vide et pas moins de 2 caractères
  if (nom === '' || nom.length < 2) {
    throw new Error("Le nom doit comporter au moins 2 caractères et ne peut pas être vide.")
  }
}

// valider prénom
function validerPrenom (champ) {
  // on retire les espaces inutiles
  const prenom = champ.value.trim()

  // pas vide et pas moins de 2 caractères
  if (prenom === '' || prenom.length < 2) {
    throw new Error("Le prénom doit comporter au moins 2 caractères et ne peut pas être vide.")
  }
}

// valider l'email
function validerEmail(email) {
  // regex pour valider l'email
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // test de l'email avec le regex
  if (!regex.test(email)) {
    throw new Error("L'adresse e-mail n'est pas valide.")
  }
}

// valider la quantité
function estNombrePositifOuNul(valeur) {
  // on convertit la valeur en number
  var nombre = Number(valeur);
  
  // si pas nombre ou pas positif
  if (isNaN(nombre) || nombre < 0) {
    throw new Error("Le nombre de tournois doit être un nombre.")
  }
}


// valider si radio est coché
function validerBoutonRadio(boutionsRadio) {
  estValide = false

  for (let i = 0; i < boutonsRadio.length; i++) {
      // vérification d'un radio coché
      if (boutonsRadio[i].checked) {
          estValide = true
          break
      }
  }

  // si aucun radio coché
  if (!estValide) {
    throw new Error("Vous devez choisir au moins un tournoi.")
  }
}

// valider si le check est coché
function isChecked(check) {
  // si pas coché
  if (!check.checked) {
    throw new Error("Vous devez accepter les conditions d'utilisation.")
  }
}