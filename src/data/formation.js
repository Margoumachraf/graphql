import navbar from "./navbar.js";

export default function formation(postsContainer, data) {
    console.log(data.data.user.map(i => i.login));
    navbar(data.data.user)
    Container(data.data, postsContainer)
   
}


function Container(data, postsContainer) {
    console.log(data);
    
    const ContanerIntra = document.createElement("div")
    
    level(ContanerIntra, data.transaction)
    Audits(ContanerIntra, data.user)
    postsContainer.appendChild(ContanerIntra)

}



function level(ContanerIntra,transaction){
   

    console.log(transaction[transaction.length - 1]);
    const level = document.createElement("div")
    level.className = "level"
    const headerlevel=document.createElement("h2")
    headerlevel.className = "headerlevel"
    headerlevel.textContent = "level"

    const levelKnow = document.createElement("div")
    levelKnow.className = "levelKnow"
    levelKnow.textContent=transaction[transaction.length - 1].amount
    level.appendChild(headerlevel)
    level.appendChild(levelKnow)

    ContanerIntra.appendChild(level)
}

function Audits(){
    
}