/**
 * PARTIE 1
 * Définition des données
 */

var reponse1 = { numero: 1, libelle: "Oeil", valeur: true };
var reponse2 = { numero: 2, libelle: "Nez", valeur: false };
var reponse3 = { numero: 3, libelle: "Oreille", valeur: false };
var reponse4 = { numero: 4, libelle: "Estomac", valeur: false };

var question1 = {
    numero: 1,
    intitule: "Une conjonctivite est une maladie qui affecte quel organe?",
    reponses: [
        reponse1,
        reponse2,
        reponse3,
        reponse4
    ]
}

var question2 = {
    numero: 2,
    intitule: "Où se trouve la ville de Paris?",
    reponses: [
        { numero: 5, libelle: "Etats-Unis", valeur: false },
        { numero: 6, libelle: "Australie", valeur: false },
        { numero: 7, libelle: "France", valeur: true },
        { numero: 8, libelle: "Danemark", valeur: false }
    ]
}

var question3 = {
    numero: 3,
    intitule: "Quel est l'animal qui hiberne?",
    reponses: [
        { numero: 9, libelle: "Oursin", valeur: false },
        { numero: 10, libelle: "Marmotte", valeur: true },
        { numero: 11, libelle: "Chat", valeur: false },
        { numero: 12, libelle: "Pivert", valeur: false }
    ]
}

var question4 = {
    numero: 4,
    intitule: "Quel concept n'appartient pas à Javascript?",
    reponses: [
        { numero: 13, libelle: "Fonction", valeur: false },
        { numero: 14, libelle: "Objet", valeur: false },
        { numero: 15, libelle: "Balise", valeur: true },
        { numero: 16, libelle: "Variable", valeur: true }
    ]
}

var questions = [question1, question2, question3, question4];

// ----------- Traitements --------------
// --- à partir du tableau "questions"

// Affichage en console des intitulés de chaque question, ainsi que des libellés des réponses associées
// var len = questions.length;
// for(var i = 0; i < len; i++) {
//     console.log(questions[i].intitule);

//     var len2 = questions[i].reponses.length;
//     for(var j = 0; j < len2; j++) {
//         console.log(questions[i].reponses[j].libelle);
//     }
// }

// Alternative avec boucle "foreach"
/**
 * Création d'une variable contenant une chaîne vide
 * Dans laquelle sera concaténée le HTML au fur et à mesure des traitements
 */
var htmlString = "";

/**
 * PARTIE 2
 * Construction dynamique du HTML, 
 * afin d'afficher chaque question à partir de notre tableau "questions"
 * ainsi que chacune de ses réponses
 * selon l'architecture HTML définie dans la maquette
 */
for (var question of questions) {
    htmlString += "<div class=\"question\"><h2>" + question.intitule + "</h2>";
    for (var reponse of question.reponses) {
        htmlString += "<div class=\"reponse\">";
        htmlString += "<input type=\"radio\" name=\"quest" + question.numero + "\" id=\"q" + question.numero + "r" + reponse.numero + "\" value=\"rep" + reponse.numero + "\">"
        htmlString += "<label for=\"q" + question.numero + "r" + reponse.numero + "\">" + reponse.libelle + "</label>";
        htmlString += "</div>";
    }
    htmlString += "</div>";
}

// Puis on ajoute le code dans son conteneur (div HTML) :
var conteneur = document.getElementById("questions");
conteneur.innerHTML = htmlString;
// Penser à vérifier la validité du code HTML ainsi généré !

/**
 * PARTIE 3
 * Traitement des réponses à partir des données du formulaire
 * 1. Penser à bloquer son comportement par défaut
 * 2. On récupère tous les boutons radios "checkés"
 * 3. On vérifie qu'il s'agit d'une bonne réponse
 * 4. On modifie le style du label en fonction..
 */
var nbQuestions = questions.length;
var cptScore = 0;

var formulaire = document.getElementById("formulaire");
formulaire.addEventListener("submit", (e) => {
    // Blocage du comportement par défaut de l'Event "submit"
    e.preventDefault();
    
    // Récupération des radios "checkés"
    var radios = document.querySelectorAll("input[type=radio]:checked");
    //console.log(radios);

    // Pour chacun d'entre eux
    for(var choix of radios) {
        // On extrait le numero de la réponse
        var numReponse = choix.value.substr(3);

        // On parcours à nouveau nos question à la recherche des réponses
        for(var question of questions) {
            for(var reponse of question.reponses) {
                // Si la réponse a été sélectionnée :
                if(numReponse == reponse.numero) {
                    console.log(question.numero + " : BONNE REPONSE");
                    
                    // On récupère l'élément label relatif à l'élément radio sélectionné
                    var label = choix.parentElement.childNodes[1];
                    // On lui applique un style en fonction du fait que la reponse soit juste/fausse
                    label.style.color = (reponse.valeur)? "green" : "red";
                    label.style.fontWeight = (reponse.valeur)? "bold" : "normal";
                    if(reponse.valeur) {
                        cptScore++;
                    }
                }
            }
        }
    }

    console.log("Score : " + cptScore + "/" + nbQuestions);
});