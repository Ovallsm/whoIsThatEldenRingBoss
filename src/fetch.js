const url = "https://eldenring.fanapis.com/api/bosses?limit=106";
let selectedIMG = null;
let selectedBossName = null;
let bossNameList = [];

async function fetchBossData() {
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getRandomBossImage(data.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function getRandomBossImage(data) {
  data = data.filter((boss) => boss.image != null);
  data = data.reduce((acc, boss) => {
    let x = acc.find((b) => b.name === boss.name);
    if (!x) {
      acc.push(boss);
    }
    return acc;
  }, []);

  
  let randomIndex = Math.floor(Math.random() * data.length);
  selectedIMG = data[randomIndex].image;
  selectedBossName = data[randomIndex].name;
  bossNameList = data.map((boss) => boss.name);
 
  document.getElementById("placeholder").hidden = true;
  let img = document.createElement("img");
  img.src = selectedIMG;
  img.id = "bossImage";
  document.getElementById("bossIMG").appendChild(img);
}
