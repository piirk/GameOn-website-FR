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

// variables globales
let isFormValid = true

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
  // on réinitialise les messages d'erreurs
  reinitialiserMessagesErreur()
}

// valider string avec regex
function validerAvecRegex(champ, regex, messageErreur) {
  // on retire les espaces inutiles
  const texte = champ.value.trim()
  
  // on test avec le regex en paramètre
  if (!regex.test(texte)) {
    afficherMessageErreur(champ, messageErreur)
    isFormValid = false
  }
}

// valider la date de naissance
function validerDateDeNaissance(date) {
  // on le créer en format Date
  const dateSaisie = new Date(date.value);

  // on vérifie le format (NaN) ou si elle est supérieur à maintenant
  if (isNaN(dateSaisie.getTime())) {
    afficherMessageErreur(date, "La date ne peut pas être vide.")
    isFormValid = false
  } else if (dateSaisie > new Date()) {
    afficherMessageErreur(date, "La date n'est pas valide.")
    isFormValid = false
  }
}

// valider si radio est coché
function validerLocalisations(localisations) {
  estValide = false

  for (let i = 0; i < localisations.length; i++) {
      // vérification d'un radio coché
      if (localisations[i].checked) {
          estValide = true
          break
      }
  }

  // si aucun radio coché
  if (!estValide) {
    afficherMessageErreur(localisations[0], "Vous devez choisir au moins un tournoi.")
    isFormValid = false
  }
}

// valider si le check des conditions est coché
function validerConditionsGenerales(check) {
  // si pas coché
  if (!check.checked) {
    afficherMessageErreur(check, "Vous devez accepter les conditions d'utilisation.")
    isFormValid = false
  }
}

// pour réinitialiser les messages d'erreurs du form
function reinitialiserMessagesErreur() {
  // on récupère toutes les div.formData
  let elementsFormData = document.querySelectorAll('.formData')
  // pour chaque, on retire les attributs
  elementsFormData.forEach(element => {
      element.removeAttribute('data-error')
      element.removeAttribute('data-error-visible')
  });
}

// pour afficher le message d'erreur correctement dans le formData
function afficherMessageErreur(element, message) {
  // on récupére le div.formData parent
  let parentElement = element.closest('.formData')
  // s'il existe, on le modifie pour afficher l'erreur
  if (parentElement) {
      parentElement.setAttribute('data-error', message)
      parentElement.setAttribute('data-error-visible', 'true')
  }
}

// DOM elements form
const prenom = document.getElementById("first")
const nom = document.getElementById("last")
const email = document.getElementById("email")
const dateDeNaissance = document.getElementById("birthdate")
const nombreTournois = document.getElementById("quantity")
const localisations = document.getElementsByName("location")
const conditionsGenerales = document.getElementById("checkbox1")

// les regex pour la validation
const regexPrenomEtNom = /^[a-zA-Z-]{2,}$/
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const regexNombreTournois = /^([0-9]\d*)$/

// fonction principale du form
function validate(event) {
  // on empêche le fonctionnement par défaut du formulaire (actualisation)
  event.preventDefault()
  // on réinitialise les messages d'erreurs
  reinitialiserMessagesErreur()
  // on réinitialise isFormValid à true
  isFormValid = true

  // on test tout les inputs
  validerAvecRegex(prenom, regexPrenomEtNom, "Veuillez entrer 2 caractères ou plus.")
  validerAvecRegex(nom, regexPrenomEtNom, "Veuillez entrer 2 caractères ou plus.")
  validerAvecRegex(email, regexEmail, "L'adresse e-mail n'est pas valide.")
  validerDateDeNaissance(dateDeNaissance)
  validerAvecRegex(nombreTournois, regexNombreTournois, "Le champ ne peut pas être vide.")
  validerLocalisations(localisations)
  validerConditionsGenerales(conditionsGenerales)

  // si le form est validé
  if (isFormValid) {
    document.getElementById('inscriptionValide').style.display = 'block';
    document.getElementsByName('reserve')[0].style.display = 'none';
  }
}