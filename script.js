const dogInfo = document.getElementById('dogInfo');
const form = document.getElementById('searchForm');
const breedInput = document.getElementById('breedInput');

const apiKey = "live_Gw3syf02scqrGKdrXJoGA3Rx9EYINdzBkR6pKd4z6EEoenfHWTyYnXnZM0pwiCrZA";

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const breedName = breedInput.value.trim();

  if (!breedName) {
    alert("Por favor, digite uma raça.");
    return;
  }

  try {
    // Buscar ID da raça
    const breedRes = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breedName}`, {
      headers: { "x-api-key": apiKey }
    });
    const breedData = await breedRes.json();

    if (breedData.length === 0) {
      dogInfo.innerHTML = `<p>Raça não encontrada.</p>`;
      return;
    }

    const breedId = breedData[0].id;

    // Buscar imagem da raça
    const imgRes = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}`, {
      headers: { "x-api-key": apiKey }
    });
    const imgData = await imgRes.json();
    const dog = imgData[0];

    dogInfo.innerHTML = `
      <h2>${breedData[0].name}</h2>
      <img src="${dog.url}" alt="Foto de ${breedData[0].name}" />
    `;
  } catch (err) {
    dogInfo.innerHTML = `<p>Erro ao buscar dados da API.</p>`;
    console.error(err);
  }
});
