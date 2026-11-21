"use strict";

/* ---------- Padající sníh (obě stránky) ---------- */
function vytvorSnih() {
  const kontejner = document.querySelector(".snow");
  if (!kontejner) return;

  for (let i = 0; i < 40; i++) {
    const vlocka = document.createElement("span");
    vlocka.className = "vlocka";
    vlocka.textContent = "❄";
    vlocka.style.left = Math.random() * 100 + "%";
    vlocka.style.fontSize = 10 + Math.random() * 16 + "px";
    vlocka.style.animationDuration = 6 + Math.random() * 8 + "s";
    vlocka.style.animationDelay = -Math.random() * 14 + "s";
    kontejner.append(vlocka);
  }
}

/* ---------- Odpočet do Vánoc ---------- */
function dalsiVanoce() {
  const ted = new Date();
  let cil = new Date(ted.getFullYear(), 11, 24, 18, 0, 0); // Štědrý den, 18:00
  if (ted > cil) {
    cil = new Date(ted.getFullYear() + 1, 11, 24, 18, 0, 0);
  }
  return cil;
}

function spustOdpocet() {
  const elDny = document.querySelector("#dny");
  if (!elDny) return; // jsme na jiné stránce

  const elHodiny = document.querySelector("#hodiny");
  const elMinuty = document.querySelector("#minuty");
  const elSekundy = document.querySelector("#sekundy");
  const elZprava = document.querySelector("#zprava");
  const elCil = document.querySelector("#cil-text");
  const cil = dalsiVanoce();

  elCil.textContent = "Do Štědrého dne (24. 12. " + cil.getFullYear() + ", 18:00) zbývá:";

  function aktualizuj() {
    const zbyva = cil - new Date();

    if (zbyva <= 0) {
      elDny.textContent = elHodiny.textContent = elMinuty.textContent = elSekundy.textContent = "0";
      elZprava.textContent = "🎄 Veselé Vánoce! 🎁";
      return;
    }

    const sekundyCelkem = Math.floor(zbyva / 1000);
    elDny.textContent = Math.floor(sekundyCelkem / 86400);
    elHodiny.textContent = String(Math.floor((sekundyCelkem % 86400) / 3600)).padStart(2, "0");
    elMinuty.textContent = String(Math.floor((sekundyCelkem % 3600) / 60)).padStart(2, "0");
    elSekundy.textContent = String(sekundyCelkem % 60).padStart(2, "0");
  }

  aktualizuj();
  setInterval(aktualizuj, 1000);
}

/* ---------- Validace formuláře s přáním ---------- */
function spustFormular() {
  const formular = document.querySelector("#formular");
  if (!formular) return;

  const pole = {
    jmeno: document.querySelector("#jmeno"),
    email: document.querySelector("#email"),
    text: document.querySelector("#text"),
  };
  const vysledek = document.querySelector("#vysledek");

  function nastavChybu(klic, zprava) {
    document.querySelector("#chyba-" + klic).textContent = zprava;
    pole[klic].classList.toggle("neplatne", zprava !== "");
    return zprava === "";
  }

  function over() {
    const jmeno = pole.jmeno.value.trim();
    const email = pole.email.value.trim();
    const text = pole.text.value.trim();

    const a = nastavChybu("jmeno", jmeno.length < 2 ? "Zadejte jméno (alespoň 2 znaky)." : "");
    const b = nastavChybu("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Zadejte platný e-mail.");
    const c = nastavChybu("text", text.length < 5 ? "Přání musí mít alespoň 5 znaků." : "");
    return a && b && c;
  }

  formular.addEventListener("submit", (event) => {
    event.preventDefault();
    if (over()) {
      vysledek.textContent = "Děkujeme, " + pole.jmeno.value.trim() + "! Vaše přání bylo odesláno 🎅\n„" + pole.text.value.trim() + "“";
      formular.reset();
    } else {
      vysledek.textContent = "";
    }
  });
}

vytvorSnih();
spustOdpocet();
spustFormular();
