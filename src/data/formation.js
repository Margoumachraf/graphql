import navbar from "./navbar.js";

export default function formation(postsContainer, data) {

    
    navbar(data.data.user)
    Container(data.data, postsContainer)
   
}


function Container(data, postsContainer) {
   
    
    const ContanerIntra = document.createElement("div")
    ContanerIntra.className="ContanerIntra"
    level(ContanerIntra, data.level)
    Audits(ContanerIntra, data.user)
    XP(ContanerIntra, data.user)


    postsContainer.appendChild(ContanerIntra)

}



function level(ContanerIntra,transaction){
   

 
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



function Audits(ContanerIntra, data) {
 

const audits = document.createElement("div");
audits.className = 'audite';
let totalUp = 0;
let totalDown = 0;

data.forEach(i => {
  totalUp += i.totalUp;
  totalDown += i.totalDown;
});



const totalValue = totalUp + totalDown;


// Calculate the percentage of each part of the pie
const percentageUp = (totalUp / totalValue) * 100;
const percentageDown = (totalDown / totalValue) * 100;

console.log("percentageDown", percentageDown);
console.log("percentageUp", percentageUp);

// Function to convert percentage to stroke length for the circle's circumference

// Create the SVG element with stroke-dasharray
const SVG = document.createElement("div");

// Calculate stroke-dasharray for each part of the pie
const dashArrayDown = percentageToStrokeLength(percentageDown);
const dashArrayUp = percentageToStrokeLength(percentageUp);
console.log(dashArrayDown);
console.log(31.4-dashArrayUp);

// Create the pie chart SVG
SVG.innerHTML = `
<svg height="40%" width="40%" viewBox="0 0 20 20">
  <circle r="10" cx="10" cy="10" fill="#ce4b99" />
  <circle r="5" cx="10" cy="10" fill="transparent"
          stroke="#d2d3d4"
          stroke-width="10"
          stroke-dasharray="${dashArrayDown} ${dashArrayUp}" 
          transform="rotate(-90) translate(-20)" />
</svg>
`;


const totalUpElement = document.createElement("div");
totalUpElement.className = 'totalUpElement';
totalUpElement.style.backgroundColor = "#ce4b99";
totalUpElement.innerText = `Done: ${totalUp}`;

const totalDownElement = document.createElement("div");
totalDownElement.className = 'totalDownElement';
totalDownElement.style.backgroundColor = "#d2d3d4";
totalDownElement.innerText = `Received: ${totalDown}`;

// Display Audit Ratio
const Audits_ratio = document.createElement("div");
let auditRatio = data.map(i => i.auditRatio);

Audits_ratio.className = 'Audits_ratio';
Audits_ratio.style.backgroundColor = "#F3C623";
Audits_ratio.innerText = `You can do better! ${auditRatio.map(value => value.toFixed(1))}`;

// Append elements to the main container
audits.appendChild(SVG);
audits.appendChild(totalUpElement);
audits.appendChild(totalDownElement);
audits.appendChild(Audits_ratio);
ContanerIntra.appendChild(audits);

}
function percentageToStrokeLength(percentage) {
    const circleLength = 31.4; 
    return (percentage / 100) * circleLength;
  }
  


 function  XP(ContanerIntra,totalXp){

    const aggregate =totalXp.map(i=>i.totalXp)

    const sum =aggregate.map(i=>i.aggregate)

    const amount=sum.map(i=>i.sum)
    console.log(amount.map(i=>i.amount));


    
 } 