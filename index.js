/************************** EVENTS JS MINI CHALLENGE WITH JSON SERVER ******************************/


// querySelects

const profile = document.querySelector('div#profile')
const urlTraveler = 'http://localhost:3000/travelers'
const urlAnimals = 'http://localhost:3000/animalSightings'
const animals = document.querySelector('ul#animals')
const likeButton = document.querySelector('button.like-button')
const headerToggle = document.querySelector('h1#header')

// Functions

function loadProfile() {

    fetch(urlTraveler)
        .then(r => r.json())
        .then(traveler => {

        const img = profile.querySelector('img')
        img.src = traveler[0].photo
        img.alt = traveler[0].name 

        const h2profile = profile.querySelector('h2')
        h2profile.innerText = traveler[0].name

        const emprofile = profile.querySelector('em')
        emprofile.innerText = traveler[0].nickname

        const pprofile = profile.querySelector('p')
        pprofile.innerText = `${traveler[0].likes} Likes`

        likeButton.dataset.id = traveler[0].id

        })
}

function loadAnimalSightings () {

    fetch(urlAnimals)
        .then( r => r.json())
        .then( sightings => {
            sightings.forEach( sighting => {

                const li = document.createElement('li')
                li.dataset.id = sighting.id
                li.dataset.travelerId = sighting.travelerId

                const img = document.createElement('img')
                img.src = sighting.photo
                img.dataset.link = sighting.link
                li.append(img) 

                const h3 = document.createElement('h3')
                h3.innerText = sighting.species
                li.append(h3)

                const p = document.createElement('p')
                p.innerText = sighting.description
                li.append(p)

                const sightingLikeButton = document.createElement('button')
                sightingLikeButton.className = 'like-button'
                sightingLikeButton.innerText = 'LIKE'
                li.append(sightingLikeButton)

                const sightingDeleteButton = document.createElement('button')
                sightingDeleteButton.className = 'delete-button'
                sightingDeleteButton.innerText = 'DELETE'
                li.append(sightingDeleteButton)

                animals.append(li)
            })
        })

}

// Event Handlers




// Event Listeners

likeButton.addEventListener('click', event => {
    
    const travelerProfile = likeButton.closest('div')
    const likes = parseInt(travelerProfile.querySelector('p.likes').innerText)+1

    const updateTraveler = { likes }
    // debugger
    fetch(`${urlTraveler}/${event.target.dataset.id}`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
                    'Accept': 'application/json'},
        body: JSON.stringify(updateTraveler)
    })
        .then( r => r.json())
        .then( traveler => {
            console.log('UPDATED:', traveler.likes)
                loadProfile()
        })
})



headerToggle.addEventListener('click', event => {
    headerToggle.classList.toggle('header2')
})

// Inititiations

loadProfile()
loadAnimalSightings()
