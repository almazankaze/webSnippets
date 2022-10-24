const list = document.querySelector("#data-list");

// get users
const getUsers = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    return data;
  } catch (e) {
    return [];
  }
};

// returns a list of posts
const getPosts = async (userId) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const data = await res.json();

    return data;
  } catch (e) {
    return [];
  }
};

// create a new li element
const getNewListItem = async (data) => {
  // create li
  const el = document.createElement("li");
  el.classList.add("list-item");

  // create elements that will go in li
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title-container");

  const h4 = document.createElement("h4");
  h4.innerText = data.name;

  const btn = document.createElement("button");
  btn.classList.add("list-btn");
  btn.innerHTML = "&#8250;";

  titleDiv.appendChild(h4);
  titleDiv.appendChild(btn);

  const posts = await getPosts(data.id);
  const subBox = document.createElement("ul");
  subBox.classList.add("sub-box");
  subBox.classList.add("list-container");

  posts.forEach((post) => {
    const li = document.createElement("li");
    li.classList.add("sub-list-item");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    h4.innerText = post.title;
    p.innerText = post.body;
    li.append(h4, p);
    subBox.appendChild(li);
  });

  // add elements to li
  el.appendChild(titleDiv);
  el.appendChild(subBox);

  btn.addEventListener("click", () => {
    const old = document.querySelector(".open");

    if(old === subBox) {
      subBox.classList.remove("open");
    } else {

      if(old) {
        old.classList.remove("open");
      }
      subBox.classList.toggle("open");
    }
  });

  return el;
};

const createList = async (users) => {
  const fragment = new DocumentFragment();

  for (let i = 0; i < users.length; i++) {
    const el = await getNewListItem(users[i]);
    fragment.appendChild(el);
  }

  list.appendChild(fragment);
};

init = async () => {
  const users = await getUsers();
  createList(users);
};

init();
