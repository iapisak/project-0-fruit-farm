const game = []
class Player {
    constructor(name) {
        this.name = name
        this.score = 0
        this.level = 1
    }
}
const fruits = [
    {name: 'Grapes', src: './image/Grape.png'},
    {name: 'Banana', src: './image/Banana.png'},
    {name: 'Strawberry', src: './image/Strawberry.png'},
    {name: 'Watermelon', src: './image/Watermelon.png'}
]

let time = 30
let createId = 0
let removeFruits
let score = 0
let total = 0
let level = 1


function deleteMe (deleteMe) {
    game.splice(deleteMe, 1)
}

// ============ Main Menu Features ============== //
$('#player-list').on('submit', function(event) {
    event.preventDefault()
    let playerId = game.length
    const player = new Player($('#create-name').val())
    game.push(player)

    const playlistTemplate = `
        <div class='group'>
            <p id="delete-${playerId}">${game[playerId].name} : Score : ${game[playerId].score}</p>
            <button id="player-${playerId}" class="start-game">Start</button>
        </div>`
    $('#list').append(playlistTemplate)

    // Remove 
    // $(`#delete-${playerId}`).on('click', function() {
    //     let deleteData = this.id.split("-")[1]
    //     $(this).parent().remove()
    //     deleteMe(deleteData)
    // })

    $(`#player-${playerId}`).on('click', function() {
        let currentPlayer = this.id.split("-")[1]
        startGame(currentPlayer)
    })
})

// Game Features
function getLength (lengthOfStartDrop) {
    if (lengthOfStartDrop === 0) {
        return lengthOfStartDrop = 10
    } else if (lengthOfStartDrop === 1) {
        return lengthOfStartDrop = 90
    } else if (lengthOfStartDrop === 2) {
        return lengthOfStartDrop = 170
    } else if (lengthOfStartDrop === 3) {
        return lengthOfStartDrop = 240
    } else {
        return lengthOfStartDrop=320
    }
}

// Create Fruits drop from top to bottom
// Create div that contain image tag with different picture
function createFruits (player) {
    // Make new variable to get ID to remove after
    const currentFruitId = createId;   
    let lengthOfStartDrop = Math.floor(Math.random()*5)
    let randomFruits = Math.floor(Math.random()*fruits.length)
    const templateImage = `<image src="${fruits[`${randomFruits}`].src}" width="50px">`
    const templateFruits = $(`<div id='${createId}' class='move'>${templateImage}</div>`)
    // Need to change Logic
    if (game[player].level === 1) {
        templateFruits.addClass('animation-7')
        removeFruits = 6000
    } else if (game[player].level === 2) {
        templateFruits.addClass('animation-5')
        removeFruits = 4500
    } else {
        templateFruits.addClass('animation-4')
        removeFruits = 3500
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
        $('#score-section p').text(`Score : ${score}`)
        $(this).remove()
    })
    createId++
}

function setTimer (player) {
    const timer = setInterval(()=> {
        time--
        updateTime()
        if (time > 0){
            createFruits(player)
        } else {
            $('#game-board').children().remove()
            game[player].score+=score
            game[player].level++
            $(`#current-score-${player}`).text(`${game[player].name} : Score : ${game[player].score}`)
            clearInterval(timer)
            $('#game-board').hide()
            $('.score-section').show()
            updateScore()
            $('#level-section p').text(`Level : 0 `)
            $('#player').text(`Player : ----- `)
            $('#score-section p').text(`Score : 0 `)
        }
    }, 700)
}

function updateTime () {
    const $timer = $('#timer')
    $timer.text(`timer: ${time}s`)
}

function resetScore () {
    score = 0
    time = 30
}

function startGame (player) {
    $('#main-menu').hide()
    $('#main').hide()
    $('#game-board').show()
    $('#level-section p').text(`Level : ${game[player].level}`)
    $('#player').text(`Player : ${game[player].name}`)
    
    setTimer(player)
    resetScore()
}

function updateScore () {
    $('#score-board').empty()
    for (let i=0; i<game.length; i++) {
    const printScore = `
    <div>${game[i].name}  Score : ${game[i].score}  Level : ${game[i].level}`
    $('#score-board').append(printScore)
    }
}

$('#read').on('click', function() {
    $('#main-menu').hide()
    $('#game-board').hide()
    $('.score-section').hide()
    $('.read-me').show()
})

$('#create-player').on('click', function() {
    $('.read-me').hide()
    $('.score-section').hide()
    $('#game-board').hide()
    $('#main-menu').show()
})

$('#score-player').on('click', function() {
    $('#main-menu').hide()
    $('.read-me').hide()
    $('#game-board').hide()
    $('#score-board').empty()
    updateScore()
    $('.score-section').show()
    
})

$('#back-to-Game').on('click', function() {
    $('#main-menu').hide()
    $('.read-me').hide()
    $('.score-section').hide()
    $('#game-board').show()
})


