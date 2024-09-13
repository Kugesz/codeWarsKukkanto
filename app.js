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
        osszes = {
            rang: data.ranks.overall.name,
            pont: data.ranks.overall.score
        }

        let adatok = []
        adat = data.ranks.languages
        for (let nyelv in adat){
            nyelv = nyelv[0].toUpperCase() + nyelv.slice(1)
            console.log(nyelv)
            adatok.push({
                nyelv: nyelv,
                pont: adat[nyelv.toLowerCase()].score
            })
        }

        const container = document.getElementById("languages");

        container.innerHTML += `<tr><th>${osszes.rang}</th> <th>${osszes.pont}pont</th></tr>`

        adatok.forEach(element => {   
            container.innerHTML += `<tr><th>${element.nyelv}:</th> <th>${element.pont}pont</th></tr>`
        });
    })
}

