import navbar from "./src/data/navbar.js";

export default function formation(postsContainer, data) {


  Container(data.data, postsContainer)

}


function Container(data, postsContainer) {


  const ContanerIntra = document.createElement("div")
  ContanerIntra.className = "ContanerIntra"
  level(ContanerIntra, data.level)
  Audits(ContanerIntra, data.user)
  XP(ContanerIntra, data.user)
  // ProjectValid(ContanerIntra, data.user)

  postsContainer.appendChild(ContanerIntra)

}



function level(ContanerIntra, transaction) {



  const level = document.createElement("div")
  level.className = "level"
  const headerlevel = document.createElement("h2")
  headerlevel.className = "headerlevel"
  headerlevel.textContent = "level"

  const levelKnow = document.createElement("div")
  levelKnow.className = "levelKnow"
  levelKnow.textContent = transaction[transaction.length - 1].amount
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



  // Function to convert percentage to stroke length for the circle's circumference

  // Create the SVG element with stroke-dasharray
  const SVG = document.createElement("div");

  // Calculate stroke-dasharray for each part of the pie
  const dashArrayDown = percentageToStrokeLength(percentageDown);
  const dashArrayUp = percentageToStrokeLength(percentageUp);


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
  totalUpElement.innerText = `Done: ${convertSize(totalUp)}`;

  const totalDownElement = document.createElement("div");
  totalDownElement.className = 'totalDownElement';
  totalDownElement.style.backgroundColor = "#d2d3d4";
  totalDownElement.innerText = `Received: ${convertSize(totalDown)}`;

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



function XP(ContanerIntra, totalXp) {

  const aggregate = totalXp.map(i => i.totalXp)

  const sum = aggregate.map(i => i.aggregate)

  const amount = sum.map(i => i.sum)


  const amountElement = document.createElement("div")
  amountElement.className = "amountElement"

  const amountHeader = document.createElement("h1")
  amountHeader.className = "amountHeader"
  amountHeader.textContent = "XP"


  const amountValue = document.createElement("p")
  amountValue.textContent = `${amount.map(i => convertSize(i.amount))}`
  amountElement.appendChild(amountHeader)
  amountElement.appendChild(amountValue)

  ContanerIntra.appendChild(amountElement)


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


function ProjectValid(ContainerIntra, user) {
  var datat = [];
  let accumulatedAmount = 0;  // Variable to keep track of the accumulated amount

  // Loop over each user and their finished projects
  user.forEach(i => {
    i.finished_projects.forEach((j) => {
        // Add current project's amount to the accumulated amount
  
      // Store the accumulated amount along with a project name (or other identifier)
      datat.push({
        amount: j.amount,  
        name: j.object.name,  // Use the project's name or some meaningful identifier
      });
    });
  });
  
  if (datat.length === 0) return;

  // Get the maximum value for scaling the XP (since we only have accumulated amounts)
  const maxAmount = Math.max(...datat.map(d => d.amount));
  
  // Setting up the SVG dimensions
  const width = 680;
  const height = 303;
  const div = document.createElement("div");
  div.className = "card path";
  
  // Path generation based on accumulated amounts
  const pathData = datat
    .map((point, index) => {
      // Since we don't have a date, we will scale based on the index of the data
      const x = scaleX(index, datat.length, width);
      const y = scaleY(point.amount, maxAmount, height);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  // Create the SVG container
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  // Set the path's properties
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "#ffff");
  path.setAttribute("fill", "transparent");
  path.setAttribute("stroke-width", "3");

  // Set the SVG size
  svg.setAttribute("width", "90%");
  svg.setAttribute("height", "90%");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.append(path);

  // Add circles to each data point for visual representation
  datat.forEach((point, index) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const x = scaleX(index, datat.length, width);
    const y = scaleY(point.amount, maxAmount, height);

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "5");
    circle.setAttribute("fill", "#F9B824");

    // Add hover effect to show more info when hovering over a point
    circle.addEventListener("mouseenter", (e) => {
      const div = document.createElement("div");
      div.className = "hover";
      div.style.left = `${e.pageX + 10}px`;
      div.style.top = `${e.pageY - 10}px`;
      div.innerHTML = `
        Name: ${point.name}<br>
        Total Amount: ${point.amount}
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

  // Append the SVG to the div and then the div to the container
  div.append(svg);
  ContainerIntra.appendChild(div);
}

// Scaling function for X-axis (index-based scaling)
function scaleX(index, total, width) {
  return (index / (total - 1)) * width;
}

// Scaling function for Y-axis (based on amount)
function scaleY(amount, maxAmount, height) {
  return (amount / maxAmount) * height;
}