// const chuckNorris = async () => {
//     let response = await fetch("https://api.chucknorris.io/jokes/random");
//     let data = await response.json();
//     console.log(data);
// };

// chuckNorris();

const fact = document.getElementById("fact");
const button = document.getElementById("reload");

function loadFact() {
    fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((data) => (fact.innerHTML = data.value));
}

button.addEventListener("click", loadFact);

loadFact();
