import navbar from "./navbar.js";

export default function formation(postsContainer, data) {
    console.log(data.data.user.map(i => i.login));
    navbar(data.data.user)
    level(data.data.transaction, postsContainer)
    // XP()
}


function level(transaction, postsContainer) {
    console.log(transaction);

    console.log(transaction[transaction.length - 1]);
    const level = document.createElement("div")
    level.className = "level"

    const levelKnow = document.createElement("div")
    levelKnow.className = "levelKnow"
    levelKnow.textContent=transaction[transaction.length - 1].amount
    level.appendChild(levelKnow)

    postsContainer.appendChild(level)

}