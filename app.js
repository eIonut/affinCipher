const selectAlfabet = document.querySelector("#alfabet");
const form = document.querySelector("#form");
const cheie1 = document.querySelector("#key");
const cheie2 = document.querySelector("#key-2");
const msjNecriptat = document.querySelector("#mesajNecriptat");
const msjCriptat = document.querySelector("#mesajCriptat");
const msjDecriptat = document.querySelector("#mesajDecriptat");
const btnCriptare = document.querySelector("#btn-criptare");
const btnDecriptare = document.querySelector("#btn-decriptare");

let alfabet1 = [];

window.addEventListener("load", function () {
  init();
});
function init() {
  //apelam functia init cand se deschide pagina pentru a face inputurile read only si a reseta content-ul

  msjCriptat.readOnly = true;
  msjDecriptat.readOnly = true;
  msjCriptat.style.background = "gray";
  msjDecriptat.style.background = "gray";
}

const cmmdc = (a, b) => {
  while (a != b) {
    if (a > b) a = a - b;
    if (b > a) b = b - a;
  }
  return a;
}; //daca e 1, continui cu decriptarea, daca e != 1 afisam mesaj parametrul a din cheie nu e inversabil

form.addEventListener("submit", function (e) {
  //In momentul in care formului i se da submit, se executa codul de mai jos

  e.preventDefault(); //pentru a preveni auto-refresh-ul cand se da submit la form
  let cheieA = Number(cheie1.value);
  let cheieB = Number(cheie2.value);

  //Pentru fiecare alfabet in parte ales de utilizator, initializam vectorul de caractere
  if (selectAlfabet.value === "primul-alfabet") {
    alfabet1 = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
  } else if (selectAlfabet.value === "alDoilea-alfabet") {
    alfabet1 = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
  } else if (selectAlfabet.value === "alTreilea-alfabet") {
    alfabet1 = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ",",
      ".",
      ":",
      "?",
      "!",
      "(",
      ")",
      "[",
      "]",
      " ",
    ];
  }

  const val = []; //pozitiile  caracterelor din alf initial ce trb criptate
  const litereCriptate = []; // indexul literelor mesajului criptat
  const mesajNecriptat = msjNecriptat.value; //mesajul ce va trebui sa fie criptat
  let mesajCriptat = "";
  let decriptPosibila;
  let litereMesajDecriptat = [];
  let mesajDecriptat = "";

  let contor = 0;
  let r1 = alfabet1.length;
  let r2 = Number(cheieA);

  let i = 0;

  var asd = [];
  asd[0] = Math.floor(r1 / r2);
  let r = r1 - asd[0] * r2; //primul r

  for (let i = 0; i < mesajNecriptat.length; i++) {
    for (let j = 0; j < alfabet1.length; j++)
      if (mesajNecriptat[i] == alfabet1[j]) {
        val.push(j);
      }
  }
  console.log(val);

  for (let i = 0; i < mesajNecriptat.length; i++) {
    litereCriptate[i] = (cheieA * val[i] + cheieB) % alfabet1.length;
  }

  for (let i = 0; i < litereCriptate.length; i++) {
    //trb sa gasim litera corespunzatoare indexului
    if (Number(litereCriptate[i])) {
      mesajCriptat = mesajCriptat + alfabet1[litereCriptate[i]];
    }
  }

  msjCriptat.value = mesajCriptat;

  //

  while (r2 != 0) {
    r1 = r2;
    r2 = r;
    var q = Math.floor(r1 / r2);
    asd.push(q);
    r = r1 - q * r2;
    contor++;
  }

  let t1 = r2;
  let t2 = r1;
  let t = t1 - asd[0] * t2;
  i = 1;
  while (contor != 0) {
    t1 = t2;
    t2 = t;
    t = t1 - asd[i] * t2;
    console.log(`t1 ${t1}, t2 ${t2}, t ${t}, asd[i] ${asd[i]} `);
    i++;
    contor--;
  }

  let invers;
  if (t1 < 0) {
    invers = alfabet1.length - Math.abs(t1);
  } else {
    invers = t1;
  }

  console.log(`inversul este ${invers}`);

  if (cmmdc(cheieA, alfabet1.length) == 1) {
    decriptPosibila = true;
  } else {
    decriptPosibila = false;
  }

  let cont = mesajCriptat.length;

  if (decriptPosibila) {
    //decriptare
    console.log("decript posibila");

    console.log(`contor ${cont}`);

    btnDecriptare.addEventListener("click", function () {
      for (let i = 0; i < litereCriptate.length; i++) {
     

        litereMesajDecriptat[i] =
          (invers * (litereCriptate[i] - cheieB)) % alfabet1.length;
        
        if (litereMesajDecriptat[i] < 0) {
          litereMesajDecriptat[i] = alfabet1.length + litereMesajDecriptat[i];
         
        }
      }

      for (let i = 0; i < litereMesajDecriptat.length; i++) {
        //trb sa gasim litera corespunzatoare indexului
        console.log(litereMesajDecriptat[i]);
        mesajDecriptat =
          mesajDecriptat + "" + alfabet1[litereMesajDecriptat[i]];
      
      }

      msjDecriptat.value = mesajDecriptat;
    });
  } else {
 
    msjDecriptat.value = "Nu se poate face decriptarea.";
  }

  console.log(litereMesajDecriptat);
  console.log(mesajDecriptat);
});

selectAlfabet.addEventListener("mouseover", function (e) {
  const tooltip = document.createElement("div");

  tooltip.classList.add("tooltip-show");
  tooltip.append("Alegeti un alfabet din cele 3");
  selectAlfabet.insertAdjacentElement("beforebegin", tooltip);

  selectAlfabet.addEventListener("mouseleave", function (e) {
    tooltip.classList.add("tooltip-hide");
    tooltip.classList.remove("tooltip-show");
    tooltip.remove();
  });
});
