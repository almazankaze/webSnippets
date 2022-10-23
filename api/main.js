const display = document.querySelector("#display-data");
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
    getData();
})

const getData = async () => {

    try {

        const res = await fetch("https://kitsu.io/api/edge/anime");
        const obj = await res.json();

        display.innerHTML = `<h2>${obj.data[0].attributes.canonicalTitle}</h2>`

    } catch(e) {
        display.innerHTML = "<h2>Error getting data</h2>"
    }
};