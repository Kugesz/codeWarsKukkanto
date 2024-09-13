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
        let adatok = []
        adat = data.ranks.languages
        for (let nyelv in adat){
            adatok.push({
                nyelv: nyelv,
                pont: adat[nyelv].score
            })
        }

        console.log(adatok);
        const container = document.getElementById("languages");
        Array.adatok.forEach(element => {   
            container.innerHTML += `<h2>${element.nyelv}</h2><h2>${element.pont}</h2>`
        });
    })
}

