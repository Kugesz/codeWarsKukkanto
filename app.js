users = []

function Lekerdezes(){
    let name = document.getElementById("nameInput").value;

    fetch(`https://www.codewars.com/api/v1/users/${name}`)
    .then(response => {
        if(!response.ok){
            throw new Error("Hiba a lekérdezés során!")
        }
        return response.json()
    })
    .then(data => {
        const container = document.getElementById("languages");
        console.log(data)
        user = new User(data.username, data.ranks.overall.score)

        benneVanE = false;
        for(let i = 0; i < users.length; i++){
            if(users[i].name == user.name){
                benneVanE = true;
                break;
            }
        }

        if(!benneVanE){
            users.push(user)
            rangsorFrissítése();
        }


        //  Egyesített pontok kiírása
        if(!getSwitchState()){
            container.innerHTML = `<h2>${data.ranks.overall.name} ${data.ranks.overall.score}pont</h2>`
            return;
        }

        //  Kiírt adatok törlése
        container.innerHTML = ``;
        let adatok = []
        adat = data.ranks.languages
        for (let nyelv in adat){
            nyelv = nyelv[0].toUpperCase() + nyelv.slice(1)
            adatok.push({
                nyelv: nyelv,
                pont: adat[nyelv.toLowerCase()].score
            })
        }


        adatok.forEach(element => {   
            container.innerHTML += `<tr><th>${element.nyelv}:</th> <th>${element.pont}pont</th></tr>`
        });
    })
}

function getSwitchState() {
    const toggleSwitch = document.getElementById('toggleSwitch');

    //  True = kulon, False = egyseges
    if (toggleSwitch.checked) {
        return true;
    } else {
        return false;
    }
}

function rangsorFrissítése() {
    users.sort((a, b) => b.score - a.score);
    
    console.log(users);

    const container = document.getElementById("rangsor");

    container.innerHTML = ``

    for(let i = 0; i<users.length; i++){
        container.innerHTML += `<tr><th>${i+1}.</th> <th>${users[i].name}</th> <th>${users[i].score}pont</th></tr>`
    }
}