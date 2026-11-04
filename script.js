
// Info cards
const allChips = document.querySelectorAll(".chip");
for (let i = 0; i < allChips.length; i++) {
    allChips[i].addEventListener("click", onChipClick);
}

function onChipClick(event) {
    const chip = event.currentTarget;
    const card = chip.closest(".info-card");
    const chipsInCard = card.querySelectorAll(".chip");
    const wasOpen = chip.classList.contains("open");


    for (let i = 0; i < chipsInCard.length; i++) {
        const panelId = chipsInCard[i].getAttribute("data-panel");
        chipsInCard[i].classList.remove("open");
        document.getElementById(panelId).hidden = true;
        }
    if (wasOpen === false) {
        const panelId = chip.getAttribute("data-panel");
        chip.classList.add("open");
        document.getElementById(panelId).hidden = false;
        }
}

// Island map 
var spots = document.querySelectorAll(".map-svg .spot");
var infoTitle = document.getElementById("map-title");
var infoText = document.getElementById("map-text");
var infoLinks = document.getElementById("map-links");
function selectSpot(spot) {
    spots.forEach(function (s) {
        s.classList.remove("active");
        s.setAttribute("aria-pressed", "false");
    });

    spot.classList.add("active");
    spot.setAttribute("aria-pressed", "true");
    if (infoTitle) infoTitle.textContent = spot.getAttribute("data-title");
    if (infoText) infoText.textContent = spot.getAttribute("data-text");
    if (infoLinks) {
        infoLinks.textContent = "";
        (spot.getAttribute("data-links") || "").split(";").forEach(function (item) {
            var p = item.split("|");
            if (p.length < 3) return;
            var a = document.createElement("a");
            a.className = "map-link";
            a.href = p[1];
            var label = document.createElement("strong");
            label.innerHTML = p[0];
            var page = document.createElement("small");
            page.textContent = p[2] + " \u2192";
            a.appendChild(label);
            a.appendChild(page);
            infoLinks.appendChild(a);
        });
    }
  }

spots.forEach(function (spot) {
    spot.addEventListener("click", function () { selectSpot(spot); });
    spot.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectSpot(spot);
            }
        });
    });

// Gallery arrows
var track = document.querySelector(".track");
  if (track) {
    var step = function () {
        var first = track.querySelector(".slide");
        return first ? first.getBoundingClientRect().width + 16 : 240;
        };
    var prev = document.querySelector(".arrow.prev");
    var next = document.querySelector(".arrow.next");
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    }

// Positional awareness

const cards = document.querySelectorAll(".info-card");

function highlightCard(card) {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("is-target");
  }
  card.offsetWidth;
  card.classList.add("is-target");
  const heading = card.querySelector("h3");
  heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
}

function checkAddress() {
  const id = location.hash.slice(1);
  const card = document.getElementById(id);
  if (card && card.classList.contains("info-card")) {
    highlightCard(card);
  }
}

checkAddress();
window.addEventListener("hashchange", checkAddress);
const hashLinks = document.querySelectorAll('a[href*="#"]');

for (let i = 0; i < hashLinks.length; i++) {
  hashLinks[i].addEventListener("click", onHashLinkClick);
}

function onHashLinkClick(event) {
  const link = event.currentTarget;
  const id = link.hash.slice(1);
  const card = document.getElementById(id);
  const samePage = link.pathname === location.pathname;
  if (samePage && card && card.classList.contains("info-card")) {
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    highlightCard(card);
  }
}
