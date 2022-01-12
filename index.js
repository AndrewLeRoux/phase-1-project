
document.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://api.boardgameatlas.com/api/search?order_by/rank&client_id=at1HSHmb21')
    .then(resp => resp.json())
    .then(json => renderGames(json.games))
})

//keeps track of all likes for each board game
const likeCountObj ={}


function renderGames(gamesArray){
    gamesArray.forEach(game => {
        createGameCard(game)
})   
}

function createGameCard(game){
    const gameCollection = document.querySelector('#game-collection') // div containing all games
    const div = document.createElement('div') // div for each game
    div.className = 'card'

    //name of game
    const h2 = document.createElement('h2')
    h2.innerHTML = game.name
    div.appendChild(h2)

    //img of game
    const img = document.createElement('img');
    img.className = 'game-image'
    img.src = game.image_url
    div.appendChild(img)

    //like button text
    const p = document.createElement('p');
    likeCountObj[game.name] = 0
    p.innerHTML = likeCountObj[game.name] + ' Likes'
    div.appendChild(p)

    //like button
    const button = document.createElement('button');
    button.className = 'like-btn'
    button.id = game.handle
    button.innerHTML = 'Like &#10084'
    div.appendChild(button)

    button.addEventListener('click', () => {
        likeCountObj[game.name]++
        p.innerHTML = likeCountObj[game.name] + ' Likes'
    })

    // add game to game collection
    gameCollection.appendChild(div)
}