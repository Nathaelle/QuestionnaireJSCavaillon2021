var selectTheme = document.getElementById("theme");
selectTheme.addEventListener("change", () => {
    //console.log(select.value);

    switch(selectTheme.value) {
        case "light" : document.body.className = "body-light";
        break;
        case "dark" : document.body.className = "body-dark";
        break;
        default : document.body.className = "body-light";
    }
});

var selectTitres = document.getElementById("titres");
selectTitres.addEventListener("change", () => {
    switch(selectTitres.value) {
        case "grey" : changeHeadingsColor("#333");
        break;
        case "green" : changeHeadingsColor("rgb(153, 206, 180)");
        break;
        case "white" : changeHeadingsColor("#FFF");
        break;
        case "blue" : changeHeadingsColor("rgb(0, 159, 199)");
        break;
        default : changeHeadingsColor("#000");
    }
});

function changeHeadingsColor(color) {
    var titres = document.querySelectorAll("h1, h2");
    //console.log(titres);
    var len = titres.length;
    for(var i = 0; i < len; i++) {
        titres[i].style.color = color;
    }
}
