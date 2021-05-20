/**
 * PARTIE 1
 * Définition des données
 */

let reponse1 = { numero: 1, libelle: "Oeil", valeur: true };
let reponse2 = { numero: 2, libelle: "Nez", valeur: false };
let reponse3 = { numero: 3, libelle: "Oreille", valeur: false };
let reponse4 = { numero: 4, libelle: "Estomac", valeur: false };

let question1 = {
    numero: 1,
    intitule: "Une conjonctivite est une maladie qui affecte quel organe?",
    reponses: [
        reponse1,
        reponse2,
        reponse3,
        reponse4
    ]
}

let question2 = {
    numero: 2,
    intitule: "Où se trouve la ville de Paris?",
    reponses: [
        { numero: 5, libelle: "Etats-Unis", valeur: false },
        { numero: 6, libelle: "Australie", valeur: false },
        { numero: 7, libelle: "France", valeur: true },
        { numero: 8, libelle: "Danemark", valeur: false }
    ]
}

let question3 = {
    numero: 3,
    intitule: "Quel est l'animal qui hiberne?",
    reponses: [
        { numero: 9, libelle: "Oursin", valeur: false },
        { numero: 10, libelle: "Marmotte", valeur: true },
        { numero: 11, libelle: "Chat", valeur: false },
        { numero: 12, libelle: "Pivert", valeur: false }
    ]
}

let question4 = {
    numero: 4,
    intitule: "Quel concept n'appartient pas à Javascript?",
    reponses: [
        { numero: 13, libelle: "Fonction", valeur: false },
        { numero: 14, libelle: "Objet", valeur: false },
        { numero: 15, libelle: "Balise", valeur: true },
        { numero: 16, libelle: "Variable", valeur: true }
    ]
}

let questions = [question1, question2, question3, question4];

// ----------- Traitements --------------
// --- à partir du tableau "questions"

// Affichage en console des intitulés de chaque question, ainsi que des libellés des réponses associées
// let len = questions.length;
// for(let i = 0; i < len; i++) {
//     console.log(questions[i].intitule);

//     let len2 = questions[i].reponses.length;
//     for(let j = 0; j < len2; j++) {
//         console.log(questions[i].reponses[j].libelle);
//     }
// }

// Même objectif : Alternative avec boucle "foreach"

/**
 * Création d'une variable contenant une chaîne vide
 * Dans laquelle sera concaténée le HTML au fur et à mesure des traitements
 */
let htmlString = "";

/** *****************************************
 * PARTIE 2 : Construction dynamique du HTML
 ********************************************
 * 1. Objectif : afficher chaque question à partir de notre tableau "questions"
 * 2. ainsi que chacune de ses réponses
 * 3. selon le plan type d'une question (MAQUETTE) (voir HTML)
 */

for (let question of questions) {
    htmlString += "<div class=\"question\"><h2>" + question.intitule + "</h2>";
    for (let reponse of question.reponses) {
        htmlString += "<div class=\"reponse\">";
        htmlString += "<input type=\"radio\" name=\"quest" + question.numero + "\" id=\"q" + question.numero + "r" + reponse.numero + "\" value=\"rep" + reponse.numero + "\">"
        htmlString += "<label for=\"q" + question.numero + "r" + reponse.numero + "\">" + reponse.libelle + "</label>";
        htmlString += "</div>";
    }
    htmlString += "</div>";
}

/** Element "contenant" toutes les questions */
let conteneur = document.getElementById("questions");
// On injecte le HTML dans son conteneur (<div id="questions">) :
conteneur.innerHTML = htmlString;
// Penser à vérifier la validité du code HTML ainsi généré !


/** *****************************************
 *    PARTIE 3 : Traitement des réponses
 ********************************************
 * Traitement des réponses à partir des données du formulaire
 * 1. Penser à bloquer son comportement par défaut
 * 2. On récupère tous les boutons radios "checkés"
 * 3. On vérifie qu'il s'agit d'une bonne réponse
 * 4. On modifie le style du label en fonction..
 */

/** Nombre total de questions */
let nbQuestions = questions.length;
/** Nombre de bonnes réponses */
let cptScore = 0;

let formulaire = document.getElementById("formulaire");
formulaire.addEventListener("submit", (e) => {
    // Blocage du comportement par défaut de l'Event "submit"
    // Pour éviter de recharger la page
    e.preventDefault();
    
    /** Tableau des éléments radios "checkés" */
    let radios = document.querySelectorAll("input[type=radio]:checked");

    // Pour chacun des éléments radios : 
    for(let choix of radios) {
        // 1. On extrait le numero de la réponse
        let numReponse = choix.value.substr(3);

        // 2. On parcours à nouveau nos question à la recherche des réponses sélectionnées
        for(let question of questions) {
            for(let reponse of question.reponses) {
                // 3. Si la réponse a été sélectionnée :
                if(numReponse == reponse.numero) {
                    
                    // 4. On récupère l'élément label relatif à l'élément radio sélectionné
                    let label = choix.parentElement.childNodes[1];
                    // 5. On lui applique un style en fonction du fait que la reponse soit juste/fausse
                    label.style.color = (reponse.valeur)? "green" : "red";
                    label.style.fontWeight = (reponse.valeur)? "bold" : "normal";
                    // 6. Si c'est juste, on incrémente le compteur de bonnes réponses
                    if(reponse.valeur) {
                        cptScore++;
                    }
                }
            }
        }
    }

    // Une fois le questionnaire traité, on affiche le score
    afficherScore();
});

/** *****************************************
 *      PARTIE 4 : Affichage du score
 ****************************************** */
function afficherScore() {
    /** Formattage du score à afficher */
    let score  = cptScore + "/" + nbQuestions;

    /** Récupération de l'élément dans lequel on va l'afficher */
    let span = document.getElementById("points");
    span.innerHTML = score;

    // Affichage de la modale
    let modale = document.getElementById("score");
    modale.style.opacity = "1";
}