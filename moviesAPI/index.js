let leftAnime;
let rightAnime;

const runComparison = () => {
  const leftStats = document.querySelectorAll("#left-summary .notification");
  const rightStats = document.querySelectorAll("#right-summary .notification");

  leftStats.forEach((leftStat, index) => {
    const rightStat = rightStats[index];

    const leftValue = parseInt(leftStat.dataset.value);
    const rightValue = parseInt(rightStat.dataset.value);

    if (leftStat.innerHTML.indexOf("Rank") != -1) {
      if (rightValue < leftValue) {
        leftStat.classList.remove("is-primary");
        leftStat.classList.add("is-warning");
      } else {
        rightStat.classList.remove("is-primary");
        rightStat.classList.add("is-warning");
      }
    } else {
      if (rightValue > leftValue) {
        leftStat.classList.remove("is-primary");
        leftStat.classList.add("is-warning");
      } else {
        rightStat.classList.remove("is-primary");
        rightStat.classList.add("is-warning");
      }
    }
  });
};

const onAnimeSelect = async (anime, summaryElement, side) => {
  const resp = await axios.get("https://kitsu.io/api/edge/anime", {
    params: {
      "filter[id]": anime.id,
    },
  });

  summaryElement.innerHTML = animeTemplate(resp.data.data[0]);

  if (side === "left") leftAnime = resp.data.data[0];
  else rightAnime = resp.data.data[0];

  if (leftAnime && rightAnime) {
    runComparison();
  }
};

const animeTemplate = (animeDetails) => {
  const rating = parseFloat(
    animeDetails.attributes.averageRating.replace(/\$/g, "").replace(/,/g, "")
  );

  const rank = parseInt(animeDetails.attributes.popularityRank);
  const favorites = parseInt(animeDetails.attributes.favoritesCount);

  const imgSrc =
    animeDetails.attributes.posterImage === null
      ? ""
      : animeDetails.attributes.posterImage.large;

  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${imgSrc}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${animeDetails.attributes.canonicalTitle}</h1>
          <h4>${animeDetails.attributes.startDate}</h4>
          <p>${animeDetails.attributes.description}</p>
        </div>
      </div>
    </article>
    <article data-value=${rating} class="notification is-primary">
      <p class="title">${animeDetails.attributes.averageRating}</p>
      <p class="subtitle">Rating</p>
    </article>
    <article data-value=${rank} class="notification is-primary">
      <p class="title">${animeDetails.attributes.popularityRank}</p>
      <p class="subtitle">Rank</p>
    </article>
    <article data-value=${favorites} class="notification is-primary">
      <p class="title">${animeDetails.attributes.favoritesCount}</p>
      <p class="subtitle">Favorited</p>
    </article>
  `;
};

const autoCompleteConfig = {
  renderOption(anime) {
    const imgSrc =
      anime.attributes.posterImage === null
        ? ""
        : anime.attributes.posterImage.small;

    return `
        <img src="${imgSrc}" />
        ${anime.attributes.canonicalTitle} (${anime.attributes.startDate})
      `;
  },
  inputValue(anime) {
    return anime.attributes.canonicalTitle;
  },
  async fetchData(searchTerm) {
    const resp = await axios.get("https://kitsu.io/api/edge/anime", {
      params: {
        "filter[text]": searchTerm,
      },
    });

    return resp.data.data;
  },
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(anime) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onAnimeSelect(anime, document.querySelector("#left-summary"), "left");
  },
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(anime) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onAnimeSelect(anime, document.querySelector("#right-summary"), "right");
  },
});
