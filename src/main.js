let tab = [];
let tabVictory = [];
const N = 3;
let liCaseVide;
let coCaseVide;


$(document).ready(function () {

    startGame();

    $("#restart").click(function () {
        fillTab();
        buildBoard();
    });

    $("#mixIt").click(function () {
        randomIt();
    });

    $("#resolve").click(function () {
        deepCourse();
    });

});

///////////////////////////////////Lance le jeu///////////////////////////
function startGame() {

    fillTab();
    buildBoard();
}


///////////////////////////////////Gernere les valeurs et les push dans tab///////////////////////////
function fillTab() {
    tab = [];
    for (let i = 0; i < N; i++) {
        let line = [];
        for (let j = 0; j < N; j++) {
            let number = (i * N) + j;
            line.push(number);
        }
        tab.push(line);
        tabVictory = tab;
    }
    liCaseVide = N - 1;
    coCaseVide = N - 1;
}

function compareTableaux(a, b) {
    // let coups = coupsPossibles();
    a.forEach((aTest) => {
        b.forEach((bTest) => {
            if (aTest === bTest) {
                // console.log(aTest, "a=b");
            } else {
                // console.log(aTest, "a!=b");
            }
        })
    });
    // console.log(a);
    // console.log(b);
}

function estPossible(coup, coupsPossibles) {
    // 1 for
}

// console.log(compareTableaux([0, 1], [0, 2]));
// console.log(compareTableaux([0, 1], [0, 1]));

///////////////////////////////////Construit le plateau de jeu en fonction de N///////////////////////////
function buildBoard() {


    $(".container").empty();
    for (let i = 0; i < N; i++) {
        $(".container").append("<div class='row'  id='R" + i + "'></div>")
        for (let j = 0; j < N; j++) {
            let val = tab[i][j];
            let klass = "";
            if (val === (N * N) - 1) {
                val = "";
                klass = "white"
            }
            $("#R" + i).append("<div class='case " + klass + " d-flex justify-content-center align-items-center ' id='C" + j + " '><p class='P" + i + "'>" + val + "</p></div>")
        }
    }
}

///////////////////////////////////Verifie l'état de victoire///////////////////////////

function win() {
    if (liCaseVide === N - 1 && coCaseVide === N - 1) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (tab[i][j] !== (i * N) + j) {
                    return false
                }
            }
        }
        console.log("victoire !");
        drowSolution();
        return true
    }
}


///////////////////////////////////Essaye de résoudre le taquin///////////////////////////
// let howDeep = 0;
let coupsGagnant = [];

function deepCourse(max = 6, prof = 0) {

    if (win() === true) {
        return true;
    }
    if (prof !== max) {
        let coupsPossibleTab = coupsPossibles();
        console.log("coupsPossibleTab =", coupsPossibleTab);

        for (let i = 0; i < coupsPossibleTab.length; i++) {
            // console.log("coupsPossibles = ", coupsPossibleTab[i]);
            const caseVide = [liCaseVide, coCaseVide];
            coupsGagnant.push(coupsPossibleTab[i]);
            console.log("coupsGagnant = ",coupsGagnant);
            swap(coupsPossibleTab[i]);
            buildBoard();
            // console.log("prof=", prof)
            // console.log("howDeep = ", howDeep++);
            if (deepCourse(max, prof + 1) === true) {
                return true;
            }
            coupsGagnant.pop();
            swap(caseVide)
            buildBoard();
        }
    }
    return false
}

///////////////////////////////////Dessine la solution trouvée///////////////////////////
function drowSolution() {

    coupsGagnant.forEach((value)=>{
    swap(value[0][1]);
    buildBoard();
        console.log("value = ", value);
    });
}


///////////////////////////////////Echange les cases et donc les valeurs dans tab///////////////////////////
function swap(coup) {

    // console.log("coup =",coup)
    // position de la case destination
    let li = coup[0];
    let co = coup[1];

    let temp = tab[liCaseVide][coCaseVide];

    tab[liCaseVide][coCaseVide] = tab [li][co];
    tab[li][co] = temp;

    liCaseVide = li;
    coCaseVide = co;

}

///////////////////////////////////Melange le tableau de jeu///////////////////////////
function randomIt() {

    for (i = 0; i < 4; i++) {
        let coups = coupsPossibles();
        let randomCoup = getRandomInt(coups.length);
        swap(coups[randomCoup]);
    }
    buildBoard();
}

///////////////////////////////////Vérifie selon la position de case vide les coups possibles///////////////////////////
function coupsPossibles() {
    let coups = [];

    if (liCaseVide !== 0) {
        coups.push([liCaseVide - 1, coCaseVide])
    }

    if (liCaseVide !== N - 1) {
        coups.push([liCaseVide + 1, coCaseVide])
    }

    if (coCaseVide !== 0) {
        coups.push([liCaseVide, coCaseVide - 1])
    }

    if (coCaseVide !== N - 1) {
        coups.push([liCaseVide, coCaseVide + 1])
    }

    return coups;

}

///////////////////////////////////Génére un chiffre aléatoire pour le choix des mouvement///////////////////////////
function getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max)));
}


