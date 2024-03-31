// Using json rather than a MockAPI, but have set up an MockAPI 





//Emptry array for the date to be enterd in to
let videoGame = []



// Communicate with the Back-End (get data, send data)

async function fetchVideogame() {
    // Fetch the date list for the API( using a json server)
    const response = await fetch("http://localhost:3005/games")
    const fetchedVideoGame = await response.json() // parses and unsmooshes the data
    videoGame = fetchedVideoGame
    // Re-render based on the state
    renderVideogame()
}

fetchVideogame()
// Make the User Interface match what the data says it should show

const gameContainer = document.getElementById("game-container")

function renderVideogame() {
    // Clear out whatever we rendered last time
    gameContainer.innerHTML = ""
    // shoe each genre of games(date) we enter
    for (let i = 0; i < videoGame.length; i++) {
        const deleteGame = async () => {
            // update the API on the backend
            //using JSON to store the date
            await fetch("http://localhost:3005/games/" + videoGame[i].id, {
                method: "DELETE"
            })
            // update the state on the frontend
            videoGame.splice(i, 1)
            // Re-render (call the rendering function again)
            renderVideogame()

        }

        // adding style to the page
        const div = document.createElement("div")
        div.className = "border bg-light p-3 m-3"
        div.innerHTML = `
            <h3>${videoGame[i].title}</h3>
            <p>${videoGame[i].category}</p>
            <button class="btn btn-danger">Delete</button>
        `
        div.querySelector("button").addEventListener("click", deleteGame)
        gameContainer.append(div)
    }
}

const titleInput = document.getElementById("title-input")
const categoryInput = document.getElementById("category-input")

async function createGame(event) {
    event.preventDefault() // making sure the page doesnt get refresh
    
    // grab the data from the form and make the new list of games
    const newGameData = {
        title: titleInput.value,
        category: categoryInput.value
    }

    // clear out the inputs
    titleInput.value = ""
    categoryInput.value = ""

    // update backend
    const response = await fetch("http://localhost:3005/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newGameData) // turn in to a string for JSON
    })
    const createdGameWithId = await response.json()

    // update frontend state
    videoGame.push(createdGameWithId)

    // re-render
    renderVideogame()
}