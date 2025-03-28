let playerPool = JSON.parse(localStorage.getItem("playerPool")) || [];
let signUpList = JSON.parse(localStorage.getItem("signUpList")) || [];

function saveToStorage() {
    localStorage.setItem("playerPool", JSON.stringify(playerPool));
    localStorage.setItem("signUpList", JSON.stringify(signUpList));
}

function addToPool() {
    const name = document.getElementById("playerName").value.trim();
    const role = document.getElementById("playerRole").value;
    const skill = parseInt(document.getElementById("skillLevel").value);

    if (name === "") {
        alert("Please enter a name.");
        return;
    }

    playerPool.push({ name, role, skill });
    saveToStorage();
    displayPlayerPool();
    document.getElementById("playerName").value = "";
}

function removeFromPool(index) {
    playerPool.splice(index, 1);
    saveToStorage();
    displayPlayerPool();
}

function addToSignUp(index) {
    signUpList.push(playerPool[index]);
    saveToStorage();
    displaySignUpList();
}

function removeFromSignUp(index) {
    signUpList.splice(index, 1);
    saveToStorage();
    displaySignUpList();
}

function clearSignUp() {
    signUpList = [];
    saveToStorage();
    displaySignUpList();
}

function displayPlayerPool() {
    const poolDiv = document.getElementById("playerPool");
    poolDiv.innerHTML = "";

    playerPool.forEach((player, index) => {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player-item");
        playerDiv.innerHTML = `${player.name} - ${player.role} (Skill: ${player.skill}) 
            <button onclick="addToSignUp(${index})">Add</button>
            <button onclick="removeFromPool(${index})">Remove</button>`;
        poolDiv.appendChild(playerDiv);
    });
}

function displaySignUpList() {
    const signUpDiv = document.getElementById("signUpList");
    signUpDiv.innerHTML = "";

    signUpList.forEach((player, index) => {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player-item");
        playerDiv.innerHTML = `${player.name} - ${player.role} (Skill: ${player.skill}) 
            <button onclick="removeFromSignUp(${index})">Remove</button>`;
        signUpDiv.appendChild(playerDiv);
    });
}

function generateTeams() {
    const noLiberoMode = document.getElementById("noLiberoMode").checked;
    
    let filteredPlayers = [...signUpList];
    if (noLiberoMode) {
        filteredPlayers = filteredPlayers.filter(player => player.role !== "libero");
    }

    filteredPlayers.sort((a, b) => b.skill - a.skill);  

    let teamA = [];
    let teamB = [];
    let teamASkill = 0;
    let teamBSkill = 0;

    filteredPlayers.forEach(player => {
        if (teamASkill <= teamBSkill) {
            teamA.push(player);
            teamASkill += player.skill;
        } else {
            teamB.push(player);
            teamBSkill += player.skill;
        }
    });

    displayTeams(teamA, teamB);
}

function displayTeams(teamA, teamB) {
    const teamADiv = document.getElementById("teamA");
    const teamBDiv = document.getElementById("teamB");

    teamADiv.innerHTML = "<h2>Team A</h2>";
    teamBDiv.innerHTML = "<h2>Team B</h2>";

    teamA.forEach((player, index) => {
        let div = document.createElement("div");
        div.classList.add("player-item", "draggable");
        div.innerHTML = `${player.name} - ${player.role} (Skill: ${player.skill}) 
            <button onclick="removeFromTeam(${index}, 'A')">❌</button>`;
        teamADiv.appendChild(div);
    });

    teamB.forEach((player, index) => {
        let div = document.createElement("div");
        div.classList.add("player-item", "draggable");
        div.innerHTML = `${player.name} - ${player.role} (Skill: ${player.skill}) 
            <button onclick="removeFromTeam(${index}, 'B')">❌</button>`;
        teamBDiv.appendChild(div);
    });
}

function removeFromTeam(index, team) {
    if (team === "A") {
        teamA.splice(index, 1);
    } else {
        teamB.splice(index, 1);
    }
    displayTeams(teamA, teamB);
}

document.addEventListener("DOMContentLoaded", () => {
    displayPlayerPool();
    displaySignUpList();
});
