const list = document.querySelector("#data-list");

// create a new li element
const getNewListItem = (data) => {
  // create li
  const el = document.createElement("li");
  el.classList.add("list-item");

  // create elements that will go in li
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title-container");

  const h4 = document.createElement("h4");
  h4.innerText = data.attributes.canonicalTitle;

  const btn = document.createElement("button");
  btn.classList.add("list-btn");
  btn.innerText = "see more";

  titleDiv.appendChild(h4);
  titleDiv.appendChild(btn);

  // add elements to li
  el.appendChild(titleDiv);

  return el;
};

const getData = async () => {
  try {
    const res = await fetch("https://kitsu.io/api/edge/anime");
    const obj = await res.json();

    const fragment = new DocumentFragment();

    obj.data.forEach((item) => {
      fragment.appendChild(getNewListItem(item));
    });

    list.appendChild(fragment);

    // add event to all buttons
    document.querySelectorAll(".list-btn").forEach((btn, key) => {
        btn.addEventListener("click", () => {
            console.log(btn.previousSibling.innerText);
        })
    })
  } catch (e) {
    list.innerHTML = "<h2>Error getting data</h2>";
  }
};

getData();
