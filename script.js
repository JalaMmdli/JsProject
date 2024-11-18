const input = document.getElementById("input");
let clearBtn = document.querySelector(".clear");
let removeBtns = document.querySelectorAll(".remove");
const list = document.getElementById("list");
const addBtn = document.querySelector(".addBtn");
let inpDiv = document.querySelector(".inp");
const addInp=document.querySelector(".addInp")
let li=document.querySelector("li")
const aToZBtn = document.querySelector(".a-Z");
const zToABtn = document.querySelector(".z-A");

clearBtn.addEventListener("click", () => {
    input.value = "";
});

function addRemoveEvent() {
    removeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.parentElement.remove();
            const countOutputs = document.querySelectorAll(".count");
            countOutputs.forEach((output, i) => {
                output.innerHTML = i + 1;
            });
            checkListStatus();
        });
    });
  
}

function checkListStatus() {
    if (list.childElementCount === 0) {
        inpDiv.classList.remove("hiddenInput"); 
        list.classList.add("hiddenList"); 
    } else {
        list.classList.remove("hiddenList"); 
    }
}

addBtn.addEventListener("click", (e) => {
    let value = input.value.trim();
    let taskCount = list.childElementCount;
    let newLi = document.createElement("li");
  newLi.innerHTML = `
             <div class="li-left">
                    <span class="count">${taskCount + 1}.</span>
                    <span class="info">${value}</span>
                </div>
                <button class="remove"><i class="fa-regular fa-circle-xmark fa-xl remo"></i> <i class="fa-solid fa-circle-xmark fa-xl hidden"></i></button>
         `;
  list.append(newLi);
  newLi.classList.add("transition");
  input.value = "";
  removeBtns = document.querySelectorAll(".remove");
  addRemoveEvent();
  inpDiv.classList.add("hiddenInput");
 
    list.classList.remove("hiddenList"); 

 
  
});

addInp.addEventListener("click",()=>{
    inpDiv.classList.remove("hiddenInput");
    
})


function sortAZ() {
    let tasks = Array.from(list.querySelectorAll("li"));
    tasks.sort((a, b) => {
        let textA = a.querySelector(".info").textContent.trim().toLowerCase();
        let textB = b.querySelector(".info").textContent.trim().toLowerCase();
        return textA.localeCompare(textB); 
    });
    
    reorderTasks(tasks);
}

function sortZA() {
    let tasks = Array.from(list.querySelectorAll("li"));
    tasks.sort((a, b) => {
        let textA = a.querySelector(".info").textContent.trim().toLowerCase();
        let textB = b.querySelector(".info").textContent.trim().toLowerCase();
        return textB.localeCompare(textA); 
    });
    
    reorderTasks(tasks);
}

function reorderTasks(tasks) {
    list.innerHTML = ""; 
    tasks.forEach((task, index) => {
        task.querySelector(".count").textContent = `${index + 1}.`;
        list.appendChild(task); 
    });
}

aToZBtn.addEventListener("click", () => {
    sortAZ();
    aToZBtn.classList.add("hidden");
    zToABtn.classList.remove("hidden");
});

zToABtn.addEventListener("click", () => {
    sortZA();
    zToABtn.classList.add("hidden");
    aToZBtn.classList.remove("hidden");
});

addRemoveEvent();
checkListStatus();