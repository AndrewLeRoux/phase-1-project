
document.addEventListener('DOMContentLoaded', () => {
    
    fetch('https://api.boardgameatlas.com/api/search?order_by/rank&client_id=at1HSHmb21')
    .then(response => response.json())
    .then(json => renderGames(json.games))
})


const likeCountObj ={} //keeps track of number likes for each board game
const favoriteTracker = {} //keeps track of if a game is favorited or not

// function to create all games using the game array obtained from the fetch request
function renderGames(gamesArray){
    gamesArray.forEach(game => {
        createGameCard(game) //creates an individual game
})   
}

// create one game element
function createGameCard(game){
    const gameCollection = document.querySelector('#game-collection') // div containing all games
    
    
    const div = document.createElement('div') // div for each game
    div.className = 'card'
    div.id = `${game.rank}`
    

    //name and rank of game (displayed on webpage)
    const h2 = document.createElement('h2')
    h2.innerHTML = game.rank + ": " + game.name
    div.appendChild(h2)

    //img of game
    const img = document.createElement('img');
    img.className = 'game-image'
    img.src = game.image_url
    div.appendChild(img)

    //text displaying the number of likes for each game
    const p = document.createElement('p');
    likeCountObj[game.name] = 0
    p.innerHTML = likeCountObj[game.name] + ' Likes'
    div.appendChild(p)

    //create like button and add event listener
    const likeButton = createLikeButton()

    likeButton.addEventListener('click', () => {
        likeCountObj[game.name]++
        p.innerHTML = likeCountObj[game.name] + ' Likes'
    })
    div.appendChild(likeButton)

    //create favorite button and add event listener to favorite and unfavorite games
    const favoriteButton = createFavoirteButton()
    favoriteTracker[game.name] = false
    favoriteButton.addEventListener('click', () => {
        if (favoriteTracker[game.name] === false){
            favoriteButton.innerHTML = '&#9733'
            favoriteButton.style = "color:yellow"
            favoriteTracker[game.name] = true
        }
        else if (favoriteTracker[game.name] === true){
            favoriteButton.innerHTML = '&#9734'
            favoriteButton.style = "color:black"
            favoriteTracker[game.name] = false
        }
        
    })
    div.appendChild(favoriteButton)

    // create form
    const form = createCommentForm()
    
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        let p = document.createElement('p')
        let comments = document.querySelector('#commentSection')
        p.className = 'userComments'
        p.innerHTML = `${game.name}: ${event.target.commentInput.value}`
        comments.appendChild(p)
        form.reset()
    })
    
    div.appendChild(form)   

    // add game to game collection
    gameCollection.appendChild(div)
}

function createLikeButton(){
    const button = document.createElement('button')
    button.className = 'like-btn'
    button.innerHTML = 'Like &#10084'
    return button
}

function createFavoirteButton(){
    const button = document.createElement('button')
    button.className = 'favorite-btn'
    button.innerHTML = '&#9734'
    button.style = "color:black"
    return button
}

function createCommentForm(){

    const form = document.createElement('form')
    form.className = 'commentForm'

    // comment input box
    const comment = document.createElement('textarea')
    comment.id = 'textInput'
    comment.name = 'commentInput'
    comment.placeholder = 'Comment on game...'
    comment.rows = 3
    comment.cols = 30
    form.appendChild(comment)

    // break line element
    const br = document.createElement('br')
    form.appendChild(br)

    // submit button
    const submit = document.createElement('button')
    submit.id = 'submit'
    submit.innerHTML = 'Submit comment'
    form.appendChild(submit)

    return form
}