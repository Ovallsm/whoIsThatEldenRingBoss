let zoomLevel = 10;
let gameEnded = false;

const failSound = document.getElementById("failSound");
const correctSound = document.getElementById("correctsound");

const bossGuess = document.getElementById("bossGuess");
function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;

          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

addEventListener("DOMContentLoaded", async () => {
  await fetchBossData();
  autocomplete(document.getElementById("bossGuess"), bossNameList);
  imageZoom(10);
});

function imageZoom(level) {
  const img = document.getElementById("bossImage");
  const container = document.getElementById("bossIMG");
  if (!img || !container) return;

  if (level <= 1) {
    container.style.overflow = "visible";    
    container.style.width = "auto";
    container.style.height = "auto";

    img.style.position = "static";           
    img.style.transform = "scale(1)";
    img.style.maxWidth = "400px";
    img.style.height = "auto";
  } else {
    container.style.overflow = "hidden";
    container.style.width = "300px";
    container.style.height = "300px";

    img.style.position = "absolute";
    img.style.transform = `scale(${level})`;
    img.style.transformOrigin = "center center";
  }
}


guess.addEventListener("click", (e) => {
  e.preventDefault();
  if (bossGuess.value == selectedBossName && !gameEnded) {
    gameEnded = true;
    createLog(true, bossGuess);
    bossGuess.readOnly = true;
    bossGuess.style.color = "green";
    imageZoom(1);
  }

  if (!gameEnded) {
    const guessedName = bossGuess.value.trim();
    createLog(false, bossGuess);
    zoomLevel -= 1;
    const index = bossNameList.indexOf(guessedName);
    if (index > -1) {
      bossNameList.splice(index, 1);
    }

    bossGuess.value = "";
    autocomplete(document.getElementById("bossGuess"), bossNameList);
    if (zoomLevel < 1) {
      gameEnded = true;
      bossGuess.value = selectedBossName;
      bossGuess.readOnly = true;
      bossGuess.style.color = "red";
      imageZoom(1); 
      return;
    }

    imageZoom(zoomLevel);
  }
});

const logDIV = document.getElementById("guessLog");

function createLog(isCorrect, bossName) {
  let div = document.createElement("div");
  if (isCorrect) {
    div.classList.add("correct");
    correctSound.currentTime = 0;
    correctSound.play();
  } else {
    div.classList.add("fail");
    failSound.currentTime = 0;
    failSound.play();
  }
  div.classList.add("log");

  if (!bossName.value) {
    div.innerText = "no answer";
  } else {
    div.innerText = bossName.value;
  }

  logDIV.appendChild(div);
}

document.getElementById("again").addEventListener("click", () =>
{
  window.location.reload()
})


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("SW registered"))
    .catch(err => console.log("SW error", err));
}
