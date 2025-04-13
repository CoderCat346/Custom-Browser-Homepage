const ayahNumber = Math.floor(Math.random() * 6236) + 1; // Random ayah

fetch(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/editions/quran-simple,en.asad`)
  .then(res => res.json())
  .then(data => {
    const arabic = data.data[0].text;
    const translation = data.data[1].text;
    const surah = data.data[1].surah.englishName;
    const numberInSurah = data.data[1].numberInSurah;

    document.getElementById("ayah-arabic").textContent = arabic;
    document.getElementById("ayah-translation").textContent = translation;
    document.getElementById("ayah-info").textContent = `Surah ${surah}, Ayah ${numberInSurah}`;
  });

export function initQuran() {
    console.log("Quran ready");
}