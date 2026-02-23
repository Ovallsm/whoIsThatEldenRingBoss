const url = "https://eldenring.fanapis.com/api/bosses?limit=106";
export let selectedIMG = null;
export let selectedBossName = null;
export let bossNameList = [];

export async function fetchBossData() {
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
  const placeholder = document.getElementById("placeholder");
  if (placeholder) placeholder.hidden = true;

  const existingImg = document.getElementById("bossImage");
  const container = document.getElementById("bossIMG");
  if (existingImg) {
    existingImg.src = selectedIMG;
    existingImg.alt = selectedBossName;
  } else if (container) {
    const img = document.createElement("img");
    img.src = selectedIMG;
    img.id = "bossImage";
    img.alt = selectedBossName;
    container.appendChild(img);
  }
}
