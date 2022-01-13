
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
    div.id = `${game.rank}`
    

    //name and rank of game
    const h2 = document.createElement('h2')
    
    h2.innerHTML = game.rank + ": " + game.name
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
    const button = document.createElement('button')
    button.className = 'like-btn'
    button.id = game.handle
    button.innerHTML = 'Like &#10084'
    div.appendChild(button)

    button.addEventListener('click', () => {
        likeCountObj[game.name]++
        p.innerHTML = likeCountObj[game.name] + ' Likes'
    })
    
    
    // div to contain all comments for each game
    const commentContainer = document.createElement('div')
    commentContainer.className = 'comment-container'

    const commentTitle = document.createElement('p')
    commentTitle.id = 'comment-title'
    commentTitle.innerHTML = 'Comments'
    commentContainer.appendChild(commentTitle)

    // create form
    const form = createCommentForm()
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        let p = document.createElement('p')
        p.innerHTML = `${event.target.commentInput.value}`
        commentContainer.appendChild(p)
        form.reset()
    })


    // add comment form and comment form container to game
    div.appendChild(form)
    div.appendChild(commentContainer)

    // add game to game collection
    gameCollection.appendChild(div)
}




function createCommentForm(){

    const form = document.createElement('form')
    form.className = 'commentForm'

    const comment = document.createElement('input')
    // comment input box
    comment.type = 'text'
    comment.name = 'commentInput'
    comment.placeholder = 'Comment on game...'

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