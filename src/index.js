document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
    .then(res=> res.json())
    .then(array => {
        array.forEach(dog => {
            renderDogs(dog)
        })
    })
})



function renderDogs(dogArry) {
    let main = document.querySelector('table')
    let tr = document.createElement('tr')
    let tdName = document.createElement('td')
    let tdBreed = document.createElement('td')
    let tdSex = document.createElement('td')
    let tdEdit = document.createElement('td')
    let editBtn = document.createElement('button')
    let form = document.querySelector('form')
    tdName.textContent = dogArry.name
    tdBreed.textContent = dogArry.breed
    tdSex.textContent = dogArry.sex
    editBtn.textContent = "Button"
    editBtn.addEventListener('click', function() {
        form.children[0].value = dogArry.name
        form.children[1].value = dogArry.breed
        form.children[2].value = dogArry.sex
        form.addEventListener('submit', editDog)
        
    })
    function editDog(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/dogs/${dogArry.id}`, {
            method: "PATCH",
            headers: {"Content-Type" : 'application/json',
            'Accept' : 'application/json'
            },
            body:
                JSON.stringify({
                    "name": form.children[0].value,
                    "breed": form.children[1].value,
                    "sex": form.children[2].value
                })
        })
        .then(res=> res.json())
        .then((dog)=> {
            tdName.textContent = dog.name
            tdBreed.textContent = dog.breed
            tdSex.textContent = dog.sex
            
        })
    }
    tdEdit.append(editBtn)
    tr.append(tdName,tdBreed,tdSex,tdEdit)
    main.append(tr)
}

