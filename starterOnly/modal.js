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
  // on réinitialise les messages d'erreurs
  reinitialiserMessagesErreur()
}

// valider prénom
function validerPrenom (champ) {
  // on retire les espaces inutiles
  const prenom = champ.value.trim()

  // pas vide et pas moins de 2 caractères
  if (prenom === '' || prenom.length < 2) {
    afficherMessageErreur(champ, "Veuillez entrer 2 caractères ou plus.")
    return false
  }
  return true
}

// valider nom de famille
function validerNom (champ) {
  // on retire les espaces inutiles
  const nom = champ.value.trim()
  
  // pas vide et pas moins de 2 caractères
  if (nom === '' || nom.length < 2) {
    afficherMessageErreur(champ, "Veuillez entrer 2 caractères ou plus.")
    return false;
  }
  return true
}

// valider l'email
function validerEmail(email) {
  // regex pour valider l'email
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
  // test de l'email avec le regex
  if (!regex.test(email.value)) {
    afficherMessageErreur(email, "L'adresse e-mail n'est pas valide.")
    return false
  }
  return true
}

// valider la date de naissance
function validerDateDeNaissance(date) {
  // on le créer en format Date
  const dateSaisie = new Date(date.value);

  // on vérifie le format (NaN) ou si elle est supérieur à maintenant
  if (isNaN(dateSaisie.getTime())) {
    afficherMessageErreur(date, "La date ne peut pas être vide.")
    return false
  } else if (dateSaisie > new Date()) {
    afficherMessageErreur(date, "La date n'est pas valide.")
    return false
  }
  return true
}

// valider le nombre de tournois
function validerNombreTournois(champ) {
  // si le champ est pas rempli
  if (champ.value === '') {
    afficherMessageErreur(champ, "Le champ ne peut pas être vide.")
    return false
  }
  return true
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
    return false
  }
  return true
}

// valider si le check est coché
function validerConditionsGenerales(check) {
  // si pas coché
  if (!check.checked) {
    afficherMessageErreur(check, "Vous devez accepter les conditions d'utilisation.")
    return false
  }
  return true
}

// pour réinitialiser les messages d'erreurs du form
function reinitialiserMessagesErreur() {
  // on récupère toutes les div.formData
  let elementsFormData = document.querySelectorAll('.formData');
  // pour chaque, on retire les attributs
  elementsFormData.forEach(element => {
      element.removeAttribute('data-error');
      element.removeAttribute('data-error-visible');
  });
}

// pour afficher le message d'erreur correctement dans le formData
function afficherMessageErreur(element, message) {
  // on récupére le div.formData parent
  let parentElement = element.closest('.formData');
  // s'il existe, on le modifie pour afficher l'erreur
  if (parentElement) {
      parentElement.setAttribute('data-error', message);
      parentElement.setAttribute('data-error-visible', 'true');
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

// fonction principale du form
function validate(event) {
  let isValid = true
  // on empêche le fonctionnement par défaut du form (actualisation)
  event.preventDefault()
  // on réinitalise les messages d'erreurs
  reinitialiserMessagesErreur()

  // on test tout les inputs
  if (!validerPrenom(prenom)) {
    isValid = false
  }
  if (!validerNom(nom)) {
    isValid = false
  }
  if (!validerEmail(email)) {
    isValid = false
  }
  if (!validerDateDeNaissance(dateDeNaissance)) {
    isValid = false
  }
  if (!validerNombreTournois(nombreTournois)) {
    isValid = false
  }
  if (!validerLocalisations(localisations)) {
    isValid = false
  }
  if (!validerConditionsGenerales(conditionsGenerales)) {
    isValid = false
  }

  // si le form est validé
  if (isValid) {
    // console.log result
    console.log(prenom.Value)
    
    document.getElementById('inscriptionValide').style.display = 'block';
    document.getElementsByName('reserve')[0].style.display = 'none';
  }
}