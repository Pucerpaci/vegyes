"use strict";
let szint;

let élet = 10;
let kérdésszámok = 1;
let újra = 0;
let jóválaszarány;
let tema;

let kérdések;
let aktválaszok;
let válaszok;
let helyesválasz;
let válasz1;
let válasz2;
let válasz3;
let válasz4;
let véletlenk;
let kérdés;
let daraboltkérdés;
let reqválaszok;
let kérdéskülön;

const reqkérdések = new XMLHttpRequest();

reqkérdések.open("GET", "Kerdesek.txt", true);
reqkérdések.send();

// document.querySelector(".töri").addEventListener("click", function () {
//   tema = 1;
//   // reqkérdések.open("GET", "/tortenelem.txt");
//   // reqkérdések.send();
//   document.querySelector(".btn-kezdés").classList.remove("hidden");
//   document.querySelector(".töri").classList.add("hidden");
//   document.querySelector(".földrajz").classList.add("hidden");
//   document.querySelector(".téma").textContent =
//     "Magyarország kvíz - történelem";
// });

// document.querySelector(".földrajz").addEventListener("click", function () {
//   tema = 2;
//   // reqkérdések.open("GET", "/foldrajz.txt");
//   // reqkérdések.send();
//   document.querySelector(".btn-kezdés").classList.remove("hidden");
//   document.querySelector(".töri").classList.add("hidden");
//   document.querySelector(".földrajz").classList.add("hidden");
//   document.querySelector(".téma").textContent = "Magyarország kvíz - földrajz";
// });

//   reqtöri.open("GET", "/tortenelem.txt");
//   reqtöri.send();

//   reqföldrajz.open("GET", "/foldrajz.txt");
//   reqföldrajz.send();

reqkérdések.addEventListener("load", function () {
  console.log(reqkérdések.responseText);
  kérdések = reqkérdések.responseText.split("\n");
  console.log(kérdések);

  const újkérdés = function () {
    véletlenk = Math.trunc(Math.random() * kérdések.length);

    console.log(véletlenk);

    kérdés = kérdések[véletlenk];
    console.log(kérdés);

    daraboltkérdés = kérdés.split(";");
    console.log(daraboltkérdés);

    [kérdéskülön, ...válaszok] = [...daraboltkérdés];
    console.log(kérdéskülön);
    console.log(válaszok);

    helyesválasz = válaszok[0];
    console.log(helyesválasz);

    // VÁLASZOK BEROTÁLÁSA:

    let válaszhely1 = Math.trunc(Math.random() * 4);
    let válaszhely2 = Math.trunc(Math.random() * 4);
    while (válaszhely2 === válaszhely1)
      válaszhely2 = Math.trunc(Math.random() * 4);

    let válaszhely3 = Math.trunc(Math.random() * 4);
    while (válaszhely3 === válaszhely2 || válaszhely3 === válaszhely1)
      válaszhely3 = Math.trunc(Math.random() * 4);

    let válaszhely4 = Math.trunc(Math.random() * 4);
    while (
      válaszhely4 === válaszhely3 ||
      válaszhely4 === válaszhely2 ||
      válaszhely4 === válaszhely1
    )
      válaszhely4 = Math.trunc(Math.random() * 4);

    console.log(válaszhely1, válaszhely2, válaszhely3, válaszhely4);

    válasz1 = válaszok[válaszhely1];
    válasz2 = válaszok[válaszhely2];
    válasz3 = válaszok[válaszhely3];
    válasz4 = válaszok[válaszhely4];

    console.log(válasz1, válasz2, válasz3, válasz4);

    // ITT DOBOM KI AZOKAT A KÉRDÉSEKET, AMIK MÁR VOLTAK!!!

    for (let i = 0; i < kérdések.length; i++) {
      if (kérdések[i] === kérdés) {
        kérdések.splice(i, 1);
      }
    }
  };

  document.querySelector(".btn-kezdés").addEventListener("click", function () {
    újkérdés();
    document.querySelector("#btn-következő").classList.remove("hidden");
    document.querySelector(".kérdés").classList.remove("hidden");
    document.querySelector(".válaszok").classList.remove("hidden");
    document.querySelector(".btn-kezdés").classList.add("hidden");
    document.querySelector(".kezdőkép").classList.add("hidden");
    document.querySelector(".következő").classList.remove("hidden");
    document.querySelector(".kérdés").textContent = kérdéskülön;
    document.querySelector(".kérdés").classList.add("kérdésszöveg");
    document.querySelector(".válasz1label").textContent = válasz1;
    document.querySelector(".válasz2label").textContent = válasz2;
    document.querySelector(".válasz3label").textContent = válasz3;
    document.querySelector(".válasz4label").textContent = válasz4;
  });

  document.querySelector("#válasz1").addEventListener("click", function () {
    if (válasz1 === helyesválasz) {
      document.querySelector(".válasz1label").style.color = "green";
      console.log("helyes válasz");
      document.querySelector(
        ".jóválaszaránya"
      ).textContent = `${élet} / ${kérdésszámok}`;
      if (kérdések.length === 0) {
        document.querySelector("#btn-következő").classList.add("hidden");
        document.querySelector(".kérdés").classList.add("hidden");
        document.querySelector(".válaszok").classList.add("hidden");
        document.querySelector(".vége").classList.remove("hidden");
        document.querySelector(".újra").classList.remove("hidden");
      }
    } else {
      document.querySelector(".válasz1label").style.color = "red";
      if (élet > 0) élet = élet - 1;
      document.querySelector(
        ".jóválaszaránya"
      ).textContent = `${élet} / ${kérdésszámok}`;
      console.log("rossz válasz");
      if (válasz2 === helyesválasz)
        document.querySelector(".válasz2label").style.color = "green";
      if (válasz3 === helyesválasz)
        document.querySelector(".válasz3label").style.color = "green";
      if (válasz4 === helyesválasz)
        document.querySelector(".válasz4label").style.color = "green";
      if (élet === 0) {
        document.querySelector("#btn-következő").classList.add("hidden");
        document.querySelector(".kérdés").classList.add("hidden");
        document.querySelector(".válaszok").classList.add("hidden");
        document.querySelector(".végepont").classList.remove("hidden");
        document.querySelector(".újra").classList.remove("hidden");
      }
    }
    document.querySelector("#válasz1").checked = true;
    document.querySelector("#válasz1").disabled = true;
    document.querySelector("#válasz2").disabled = true;
    document.querySelector("#válasz3").disabled = true;
    document.querySelector("#válasz4").disabled = true;
  });

  document.querySelector("#válasz2").addEventListener("click", function () {
    if (válasz2 === helyesválasz) {
      document.querySelector(".válasz2label").style.color = "green";
      console.log("helyes válasz");
      document.querySelector(
        ".jóválaszaránya"
      ).textContent = `${élet} / ${kérdésszámok}`;
      if (kérdések.length === 0) {
        document.querySelector("#btn-következő").classList.add("hidden");
        document.querySelector(".kérdés").classList.add("hidden");
        document.querySelector(".válaszok").classList.add("hidden");
        document.querySelector(".vége").classList.remove("hidden");
        document.querySelector(".újra").classList.remove("hidden");
      }
    } else {
      document.querySelector(".válasz2label").style.color = "red";
      if (élet > 0) élet = élet - 1;
      document.querySelector(
        ".jóválaszaránya"
      ).textContent = `${élet} / ${kérdésszámok}`;
      jóválaszarány = (élet / kérdésszámok) * 100;
      console.log("rossz válasz");
      if (válasz1 === helyesválasz)
        document.querySelector(".válasz1label").style.color = "green";
      if (válasz3 === helyesválasz)
        document.querySelector(".válasz3label").style.color = "green";
      if (válasz4 === helyesválasz)
        document.querySelector(".válasz4label").style.color = "green";
      if (élet === 0) {
        document.querySelector("#btn-következő").classList.add("hidden");
        document.querySelector(".kérdés").classList.add("hidden");
        document.querySelector(".válaszok").classList.add("hidden");
        document.querySelector(".végepont").classList.remove("hidden");
        document.querySelector(".újra").classList.remove("hidden");
      }
    }
    document.querySelector("#válasz2").checked = true;
    document.querySelector("#válasz2").disabled = true;
    document.querySelector("#válasz1").disabled = true;
    document.querySelector("#válasz3").disabled = true;
    document.querySelector("#válasz4").disabled = true;
  });

  document.querySelector("#válasz3").addEventListener("click", function () {
    if (válasz3 === helyesválasz) {
      document.querySelector(".válasz3label").style.color = "green";
      console.log("helyes válasz");
      document.querySelector(
        ".jóválaszaránya"
      ).textContent = `${élet} / ${kérdésszámok}`;
      if (kérdések.length === 0) {
        document.querySelector("#btn-következő").classList.add("hidden");
        document.querySelector(".kérdés").classList.add("hidden");
        document.querySelector(".válaszok").classList.add("hidden");
        document.querySelector(".vége").classList.remove("hidden");
        document.querySelector(".újra").classList.remove("hidden");
      }
    } else {
      document.querySelector(".válasz3label").style.color = "red";
      if (élet > 0) élet = élet - 1;
      document.querySelector(
        ".jóválaszaránya"
      ).textContent = `${élet} / ${kérdésszámok}`;
      jóválaszarány = (élet / kérdésszámok) * 100;
      console.log("rossz válasz");
      if (válasz1 === helyesválasz)
        document.querySelector(".válasz1label").style.color = "green";
      if (válasz2 === helyesválasz)
        document.querySelector(".válasz2label").style.color = "green";
      if (válasz4 === helyesválasz)
        document.querySelector(".válasz4label").style.color = "green";
      if (élet === 0) {
        document.querySelector("#btn-következő").classList.add("hidden");
        document.querySelector(".kérdés").classList.add("hidden");
        document.querySelector(".válaszok").classList.add("hidden");
        document.querySelector(".végepont").classList.remove("hidden");
        document.querySelector(".újra").classList.remove("hidden");
      }
    }
    document.querySelector("#válasz3").checked = true;
    document.querySelector("#válasz3").disabled = true;
    document.querySelector("#válasz1").disabled = true;
    document.querySelector("#válasz2").disabled = true;
    document.querySelector("#válasz4").disabled = true;
  });

  document.querySelector("#válasz4").addEventListener("click", function () {
    if (válasz4 === helyesválasz) {
      document.querySelector(".válasz4label").style.color = "green";
      console.log("helyes válasz");
      document.querySelector(
        ".jóválaszaránya"
      ).textContent = `${élet} / ${kérdésszámok}`;
      if (kérdések.length === 0) {
        document.querySelector("#btn-következő").classList.add("hidden");
        document.querySelector(".kérdés").classList.add("hidden");
        document.querySelector(".válaszok").classList.add("hidden");
        document.querySelector(".vége").classList.remove("hidden");
        document.querySelector(".újra").classList.remove("hidden");
      }
    } else {
      document.querySelector(".válasz4label").style.color = "red";
      if (élet > 0) élet = élet - 1;
      document.querySelector(
        ".jóválaszaránya"
      ).textContent = `${élet} / ${kérdésszámok}`;
      jóválaszarány = (élet / kérdésszámok) * 100;
      console.log("rossz válasz");
      if (válasz1 === helyesválasz)
        document.querySelector(".válasz1label").style.color = "green";
      if (válasz2 === helyesválasz)
        document.querySelector(".válasz2label").style.color = "green";
      if (válasz3 === helyesválasz)
        document.querySelector(".válasz3label").style.color = "green";
      if (élet === 0) {
        document.querySelector("#btn-következő").classList.add("hidden");
        document.querySelector(".kérdés").classList.add("hidden");
        document.querySelector(".válaszok").classList.add("hidden");
        document.querySelector(".végepont").classList.remove("hidden");
        document.querySelector(".újra").classList.remove("hidden");
      }
    }
    document.querySelector("#válasz4").checked = true;
    document.querySelector("#válasz4").disabled = true;
    document.querySelector("#válasz1").disabled = true;
    document.querySelector("#válasz2").disabled = true;
    document.querySelector("#válasz3").disabled = true;
  });

  document
    .querySelector("#btn-következő")
    .addEventListener("click", function () {
      kérdésszámok = kérdésszámok + 1;

      if (élet === 0) {
        document.querySelector("#btn-következő").classList.add("hidden");
        document.querySelector(".kérdés").classList.add("hidden");
        document.querySelector(".válaszok").classList.add("hidden");
        document.querySelector(".végepont").classList.remove("hidden");
        document.querySelector(".újra").classList.remove("hidden");
      }

      if (
        document.querySelector("#válasz1").checked === false &&
        document.querySelector("#válasz2").checked === false &&
        document.querySelector("#válasz3").checked === false &&
        document.querySelector("#válasz4").checked === false &&
        élet > 0
      ) {
        élet = élet - 1;
        document.querySelector(
          ".jóválaszaránya"
        ).textContent = `${élet} / ${kérdésszámok}`;
      }

      if (kérdések.length > 0) {
        újkérdés();
      } else {
        document.querySelector("#btn-következő").classList.add("hidden");
        document.querySelector(".kérdés").classList.add("hidden");
        document.querySelector(".válaszok").classList.add("hidden");
        document.querySelector(".vége").classList.remove("hidden");
        document.querySelector(".újra").classList.remove("hidden");
      }

      document.querySelector(".kérdés").textContent = kérdéskülön;
      document.querySelector(".válasz1label").textContent = válasz1;
      document.querySelector(".válasz2label").textContent = válasz2;
      document.querySelector(".válasz3label").textContent = válasz3;
      document.querySelector(".válasz4label").textContent = válasz4;
      document.querySelector(".válasz1label").style.color = "white";
      document.querySelector(".válasz2label").style.color = "white";
      document.querySelector(".válasz3label").style.color = "white";
      document.querySelector(".válasz4label").style.color = "white";
      document.querySelector("#válasz1").checked = false;
      document.querySelector("#válasz2").checked = false;
      document.querySelector("#válasz3").checked = false;
      document.querySelector("#válasz4").checked = false;
      document.querySelector("#válasz1").disabled = false;
      document.querySelector("#válasz2").disabled = false;
      document.querySelector("#válasz3").disabled = false;
      document.querySelector("#válasz4").disabled = false;
    });
});

document.querySelector("#btn-újra").addEventListener("click", function () {
  kérdések = reqkérdések.responseText.split("\n");
  kérdésszámok = 1;
  élet = 10;

  document.querySelector(".jóválaszaránya").textContent = `10 / 0`;
  document.querySelector(".téma").textContent = "Magyarország kvíz - Vegyes";

  document.querySelector(".btn-kezdés").classList.remove("hidden");
  document.querySelector(".következő").classList.add("hidden");

  document.querySelector(".végepont").classList.add("hidden");
  document.querySelector(".vége").classList.add("hidden");
  document.querySelector(".újra").classList.add("hidden");

  document.querySelector("#btn-következő").classList.add("hidden");

  document.querySelector(".kérdés").textContent = kérdés;
  document.querySelector(".válasz1label").textContent = válasz1;
  document.querySelector(".válasz2label").textContent = válasz2;
  document.querySelector(".válasz3label").textContent = válasz3;
  document.querySelector(".válasz4label").textContent = válasz4;
  document.querySelector(".válasz1label").style.color = "white";
  document.querySelector(".válasz2label").style.color = "white";
  document.querySelector(".válasz3label").style.color = "white";
  document.querySelector(".válasz4label").style.color = "white";
  document.querySelector("#válasz1").checked = false;
  document.querySelector("#válasz2").checked = false;
  document.querySelector("#válasz3").checked = false;
  document.querySelector("#válasz4").checked = false;
  document.querySelector("#válasz1").disabled = false;
  document.querySelector("#válasz2").disabled = false;
  document.querySelector("#válasz3").disabled = false;
  document.querySelector("#válasz4").disabled = false;
});
