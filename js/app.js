const game = []
class Player {
    constructor(name) {
        this.name = name
        this.score = []
        this.level = 1
    }
}
const fruits = [
    {name: 'Grapes', src: './image/Grape.png'},
    {name: 'Banana', src: './image/Banana.png'},
    {name: 'Strawberry', src: './image/Strawberry.png'},
    {name: 'Watermelon', src: './image/Watermelon.png'}
]

// const playerOne = new Player()
// const playerTwo = new Player()
let time = 15
let createId = 0
let removeFruits
let score = 0
let total = 0
let level = 1

// ============ Main Menu Features ============== //

$('#player-list').on('submit', function(event) {
    event.preventDefault()
    let playerId = game.length
    const player = new Player($('#create-name').val())
    game.push(player)
    const playlistTemplate = `
    <div>
        <div>Name: ${player.name} Level: ${player.level} Score: ${player.score} Total: ${player.total}</div>
        <button id="player-${playerId}">Start Game</button>
    </div>`
    $('#list').append(playlistTemplate)
    $(`#player-${playerId}`).on('click', function() {
        let currentPlayer = this.id.split("-")[1]
        console.log(currentPlayer)
        startGame(currentPlayer)
    })
})

// Game Features

function getLength (lengthOfStartDrop) {
    if (lengthOfStartDrop === 0) {
        return lengthOfStartDrop = 0
    } else if (lengthOfStartDrop === 1) {
        return lengthOfStartDrop = 85
    } else if (lengthOfStartDrop === 2) {
        return lengthOfStartDrop = 170
    } else if (lengthOfStartDrop === 3) {
        return lengthOfStartDrop = 255
    } else {
        return lengthOfStartDrop=340
    }
}

// Create Fruits drop from top to bottom
// Create div that contain image tag with different picture
function createFruits () {
    // Make new variable to get ID to remove after
    const currentFruitId = createId;   
    let lengthOfStartDrop = Math.floor(Math.random()*fruits.length)
    const templateImage = `<image src="${fruits[`${level-1}`].src}" width="50px">`
    const templateFruits = $(`<div id='${createId}' class='move'>${templateImage}</div>`)

    if (level === 1) {
        templateFruits.addClass('animation-7')
        removeFruits = 7000
    } else if (level === 2) {
        templateFruits.addClass('animation-5')
        removeFruits = 5000
    } else {
        templateFruits.addClass('animation-3')
        removeFruits = 3000
    }

    templateFruits.attr("style", `left: ${getLength(lengthOfStartDrop)}px`)
    $('#game-board').append(templateFruits)

    // Remove this fruits when it drop after 8s // or after hit the ground
    setTimeout(()=> {
        $(`#${currentFruitId}`).remove()
    }, removeFruits)

    // Add EventListenr when click get score and remove it
    $(`#${createId}`).on('click', function(event) {
        score++
        $('#score-section p').text(`Pick Fruit: ${score}`)
        $(this).remove()
    })
    createId++
}

function setTimer (player) {
    const timer = setInterval(()=> {
        time--
        updateTime()
        if (time > 0){
            createFruits()
        } else {
            $('#game-board').children().remove()
            game[player].score.push(score)
            // playerOne.score.push(score)
            // playerOne.level++
            // console.log(playerOne)
            clearInterval(timer)
            // $('#main-menu').show()
            $('#main-menu').toggle()
            if (level>3) {
                return level=1
            } else {
                // level++
            }   
        }
    }, 800)
}

function updateTime () {
    const $timer = $('#timer')
    $timer.text(`timer: ${time}s`)
}

function resetScore () {
    score = 0
    time = 15
}

function startGame (player) {
    $('#main-menu').toggle()
    $('#level-section p').text(`Level : ${level}`)
    setTimer(player)
    resetScore()
}

// Step (2) -------------- Event Listener ------------------- //

$('#player-one').on('click', function() {
    startGame(playerOne)
})
