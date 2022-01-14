
document.addEventListener('DOMContentLoaded', (event) => {
    
    fetch('https://api.boardgameatlas.com/api/search?order_by/rank&client_id=at1HSHmb21')
    .then(resp => resp.json())
    .then(json => renderGames(json.games))
})

//keeps track of all likes for each board game
const likeCountObj ={}
const favoriteTracker = {}

function renderGames(gamesArray){
    gamesArray.forEach(game => {
        createGameCard(game)
})   
}

function createGameCard(game){
    const gameCollection = document.querySelector('#game-collection') // div containing all games
    
    
    const div = document.createElement('div') // div for each game
    div.className = 'card'
    div.id = `${game.rank}`
    

    //name and rank of game
    const h2 = document.createElement('h2')
    h2.innerHTML = game.rank + ": " + game.name
    

    //img of game
    const img = document.createElement('img');
    img.className = 'game-image'
    img.src = game.image_url
    

    //like button text
    const p = document.createElement('p');
    likeCountObj[game.name] = 0
    p.innerHTML = likeCountObj[game.name] + ' Likes'
    

    //create like button and add event listener
    const likeButton = createLikeButton()

    likeButton.addEventListener('click', () => {
        likeCountObj[game.name]++
        p.innerHTML = likeCountObj[game.name] + ' Likes'
    })
    
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

    // div to contain all comments for each game
    const commentContainer = document.createElement('div')
    commentContainer.className = 'comment-container'

    
    const commentTitle = document.createElement('p')
    commentTitle.id = 'comment-title'
    commentTitle.innerHTML = game.name + ' Comments'
    commentContainer.appendChild(commentTitle)

    // create form
    const form = createCommentForm()
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        let p = document.createElement('p')
        p.className = 'userComments'
        p.innerHTML = `${event.target.commentInput.value}`
        commentContainer.appendChild(p)
        form.reset()
    })


    // append all elements to the game div
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(likeButton)
    div.appendChild(favoriteButton)
    div.appendChild(form)
    div.appendChild(commentContainer)

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

    const comment = document.createElement('textarea')
    // comment input box
    comment.id = 'textInput'
    comment.name = 'commentInput'
    comment.placeholder = 'Comment on game...'
    comment.rows = 3
    comment.cols = 30

    // break line element
    const br = document.createElement('br')

    // submit button
    const submit = document.createElement('button')
    submit.id = 'submit'
    submit.innerHTML = 'Submit comment'

    form.appendChild(comment)
    form.appendChild(br)
    form.appendChild(submit)

    return form
}