const spinner = document.getElementById("spinner");

function searchIssues(){
    
    const text = document.getElementById("search-input").value.toLowerCase();
    const filteredIssues = allIssues.filter(issue =>
     issue.title.toLowerCase().includes(text));
     displayIssues(filteredIssues);
};


function setActiveButton(activeId){

   const buttons = ["all-btn","open-btn","closed-btn"];

    buttons.forEach(id => {

   const btn = document.getElementById(id);

   btn.classList.remove("btn-primary");

});

document.getElementById(activeId).classList.add("btn-primary");

};

  function updateCount(number){

  const countElement = document.getElementById("issue-count");

  countElement.innerText = `${number} Issues`;

};

const loadCardDetails =async(id) =>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    
    const res=await fetch(url);
    const details=await res.json();
    displayCardDetails(details.data);
};
const displayCardDetails = (cards) =>{
    console.log(cards);
    const detailContainer = document.getElementById("detail-container");
    detailContainer.innerHTML=`
        <div>
            <h2 class="text-xl font-semibold">${cards.title}</h2>
            <p><span class="badge badge-soft badge-primary">${cards.status}</span><small class="ml-1 mr-3">.${cards.author}</small><small>.${cards.createdAt}</small></p>
        </div>
        <div>
            <p><span class="badge badge-soft badge-secondary"><i class="fa-solid fa-bug"></i>${cards.labels[0]}</span><span class="badge badge-soft badge-warning"><i class="fa-solid fa-life-ring"></i>${cards.labels[1]}</span></p>
        </div>
        <div>
            <p class="text-[#64748B]">${cards.description}</p>
        </div>
        <div class="flex gap-40 p-3 bg-base-200">
            <div>
             <p class="text-[#64748B]">Author</p>
             <p>${cards.author}</p>
            </div>
            <div>
             <p class="text-[#64748B]">Priority<p/>
             <p class="badge badge-error text-white">${cards.priority}</p>
            </div>
        </div>
    `;
    document.getElementById("my_modal_1").showModal();
};

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssues = [];

async function loadAll() {
  
  spinner.classList.remove("hidden");
  const res = await fetch(url);
  const result = await res.json();

  allIssues = result.data;   

  displayIssues(allIssues);
  
  spinner.classList.add("hidden");
}

function displayIssues(issues) {

  const container = document.getElementById("issues-container");
  container.innerHTML = "";

  issues.forEach(issue => {
    let borderColor = "";

  if(issue.status === "open"){
  borderColor = "border-t-4 border-green-500";
 }

 else{
 borderColor = "border-t-4 border-blue-500";
}

    const div = document.createElement("div");
    div.className = `card bg-base-100 shadow ${borderColor}`;

    div.classList.add("card");

    div.innerHTML = `<div onclick="loadCardDetails(${issue.id})" class="space-y-3">
     <span class="badge badge-soft badge-primary">${issue.priority}</span>
      <h3 class="text-xl font-semibold text-[#1F2937]">${issue.title}</h3>
      <p class="text-[#64748B]">${issue.description}</p>
      <p class="badge badge-ghost">Status: ${issue.status}</p>
      <p><span class="badge badge-soft badge-secondary"><i class="fa-solid fa-bug"></i>${issue.labels[0]}</span> <span class="badge badge-soft badge-warning"><i class="fa-solid fa-life-ring"></i>${issue.labels[1]}</span></p>
      <small>${issue.author}</small> <br>
      <small>${issue.createdAt}</small>
      </div>
    `;

    container.appendChild(div);
  });
}

function showAll(){
    setActiveButton("all-btn");
    updateCount(allIssues.length);
    displayIssues(allIssues)
}

function showOpen() {
  setActiveButton("open-btn");

  const openIssues = allIssues.filter(issue => issue.status === "open");

  displayIssues(openIssues);
  updateCount(openIssues.length);
}

function showClosed() {
  setActiveButton("closed-btn"); 

  const closedIssues = allIssues.filter(issue => issue.status === "closed");

  displayIssues(closedIssues);
  updateCount(closedIssues.length);
}


loadAll();