import Login from "../auth/login.js";

export default function CreateNext(postsContainer, data) {

const div = document.createElement("div");
div.className = "row";
showUserinfo(postsContainer, data.user)
level(div, data.level)
Audits(div, data.user)
XP(div, data.user)
postsContainer.appendChild(div)
postsContainer.appendChild(creatPath(data.transaction));
}


function showUserinfo(element, dataUser) {
  const div = document.createElement("header");
  div.className = "user header";
  const name = document.createElement("span");
  name.className = "username";
  const logOut = document.createElement("button");
  logOut.innerHTML = "Log Out";
  logOut.className = "log-out";
  dataUser.map(i=>{
    name.innerText = `Welcome,  ${i.firstName} ${i.lastName}!`;
    div.append(name, logOut);

  })
  element.append(div);
  logOut.addEventListener("click", () => {
    localStorage.removeItem("Token");
    element.className="log_in_form"
    Login()
  });
}



function creatPath(trans) {
  console.log(trans);

  let cumulativeXP = 0;
  const width = 680;
  const height = 303;
  const div = document.createElement("div");
  div.className = "card path";
  const dataPoints = trans.map((transaction) => {
    cumulativeXP += transaction.amount;
    return {
      date: new Date(transaction.createdAt),
      name: transaction.object.name,
      xp: cumulativeXP,
    };
  });
  console.log("dataPoints",dataPoints);

  if (dataPoints.length === 0) return;

  const endTime = dataPoints[dataPoints.length - 1].date;
  const startTime = dataPoints[0].date;
  const maxXP = dataPoints[dataPoints.length - 1].xp;

  const pathData = dataPoints
    .map((point, index) => {
      const x = scaleX(point.date, endTime, startTime, width);
      const y = scaleY(point.xp, maxXP, height);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
 
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "#ffff");
  path.setAttribute("fill", "transparent");
  path.setAttribute("stroke-width", "3");

  svg.classList.add('SVG');
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.append(path);
  dataPoints.forEach((point) => {
    console.log(point.name);

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    const x = scaleX(point.date, endTime, startTime, width);
    const y = scaleY(point.xp, maxXP, height);

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "5");
    circle.setAttribute("fill", "#F9B824");
    circle.addEventListener("mouseenter", (e) => {
      const div = document.createElement("div");
      div.className = "hover";
      div.style.left = `${e.pageX + 10}px`;
      div.style.top = `${e.pageY - 10}px`;
      div.innerHTML = `
        Name : ${point.name}<br>
      `;
      circle.setAttribute("r", "8");
      circle.addEventListener("mouseleave", () => {
        div.remove();
        circle.setAttribute("r", "5");
      });
      document.body.append(div);
    });
    svg.append(circle);
  });
  div.append(svg);
  return div;
}


function scaleX(date, endDate, startDate, width) {
  const timeRange = endDate - startDate;
  const timePosition = date - startDate;
  return (timePosition / timeRange) * width;
}

function scaleY(xp, maxXP, height) {
  return height - (xp / maxXP) * height;
}





function level(ContanerIntra, transaction) {
  const element =document.createElement("div")
  element.className="user-level"

  const level = document.createElement("div")
  level.className = "card"
  const headerlevel = document.createElement("h2")
  headerlevel.className = "titleRatio titlelevel"
  headerlevel.textContent = "level"

  const levelKnow = document.createElement("div")
  levelKnow.className = "level"
  levelKnow.textContent = transaction[transaction.length - 1].amount

  element.appendChild(headerlevel)
  element.appendChild(levelKnow)

  level.appendChild(element)
  ContanerIntra.appendChild(level)
}



function Audits(ContanerIntra, data) {


  const audits = document.createElement("div");
  audits.className = 'card';
  let totalUp = 0;
  let totalDown = 0;

  data.forEach(i => {
    totalUp += i.totalUp;
    totalDown += i.totalDown;
  });



  const totalValue = totalUp + totalDown;



  const percentageUp = (totalUp / totalValue) * 100;
  const percentageDown = (totalDown / totalValue) * 100;




  const SVG = document.createElement("div");


  const dashArrayDown = percentageToStrokeLength(percentageDown);
  const dashArrayUp = percentageToStrokeLength(percentageUp);



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
  totalUpElement.innerText = `Done: ${convertSize(totalUp)}`;

  const totalDownElement = document.createElement("div");
  totalDownElement.className = 'totalDownElement';
  totalDownElement.style.backgroundColor = "#d2d3d4";
  totalDownElement.innerText = `Received: ${convertSize(totalDown)}`;


  const Audits_ratio = document.createElement("div");
  let auditRatio = data.map(i => i.auditRatio);

  Audits_ratio.className = 'Audits_ratio';
  Audits_ratio.style.backgroundColor = "#F3C623";
  Audits_ratio.innerText = `${auditRatio.map(value => value.toFixed(1))}`;

  audits.appendChild(SVG);
  audits.appendChild(totalUpElement);
  audits.appendChild(totalDownElement);
  audits.appendChild(Audits_ratio);
  ContanerIntra.appendChild(audits);

}
function percentageToStrokeLength(percentage) {
  const circleLength = 2*3.14*5;
  return (percentage / 100) * circleLength;
}



function XP(ContanerIntra, totalXp) {
  const element =document.createElement("div")
  element.className="card"
  const aggregate = totalXp.map(i => i.totalXp)

  const sum = aggregate.map(i => i.aggregate)

  const amount = sum.map(i => i.sum)


  const amountElement = document.createElement("div")
  amountElement.className = "user-xp"

  const amountHeader = document.createElement("h1")
  amountHeader.className = "titleRatio titlelevel"
  amountHeader.textContent = "XP"


  const amountValue = document.createElement("p")
  amountValue.className="level xp"
  amountValue.textContent = `${amount.map(i => convertSize(i.amount))}`
  amountElement.appendChild(amountHeader)
  amountElement.appendChild(amountValue)
  element.appendChild(amountElement)

  ContanerIntra.appendChild(element)


}




function convertSize(value) {
  if (value >= 1000000) {
    let MG = value / 1000000
    return `${MG} MG`;
  } else if (value >= 1000) {
    let kb = value / 1000
    return `${kb} KB`;
  } else {
    return value
  }
}