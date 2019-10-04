// Main Menu Features

const game = []

class Player {
    constructor(name) {
        this.name = name
        this.score = 0
        this.total = 0
        this.level = 0
    }
}

$('#player-list').on('submit', function(event) {
    event.preventDefault()
    const name = $('#create-name').val()
    const player = new Player(name)
    game.push(player)
    const playlistTemplate = `
    <div>
        <div>Name: ${player.name} Level: ${player.level} Score: ${player.score} Total: ${player.total}</div>
        <button class='start-game'>Start Game</button>
    </div>`
    $('#list').append(playlistTemplate)
    $('.start-game').on('click', function(fffff) {
        console.log('hello')
        // startGame()
    })
})


// Game Features
const fruits = [
    {name: 'Grapes', src: './image/Grape.png'},
    {name: 'Banana', src: './image/Banana.png'},
    {name: 'Strawberry', src: './image/Strawberry.png'},
    {name: 'Watermelon', src: './image/Watermelon.png'}
]
    
let score = 0
let level = 1
let time = 15
let createId = 0
let removeFruits

// Accept Player Name and More Player
// Count Play Round
// Next Another Level
// Animated must not be overlap
// Make Animated center
// Remove all Animated when the gmae done and remove it when hit to height length

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

    $('main').append(templateFruits)

    // Remove this fruits when it drop after 8s // or after hit the ground
    setTimeout(()=> {
        $(`#${currentFruitId}`).remove()
    }, removeFruits)

    // Add EventListenr when click get score and remove it
    $(`#${createId}`).on('click', function(event) {
        score++
        $('#score-section p').text(`Pick Fruit: ${score+1}`)
        $(event.target).remove()
    })
    createId++
}

function setTimer () {
    const timer = setInterval(()=> {
        time--
        updateTime()
        if (time > 0){
            createFruits()
        } else {
            clearInterval(timer)
            $('main div').toggle('#main-menu')
            level++       
        }
    }, 800)
}

function startGame () {
    $('#main-menu').css("display", "none")
    $('#level-section p').text(`Level : ${level}`)
    setTimer()
    score = 0
    time = 15
    createId = 0
}

//Update Time on game board
function updateTime () {
    const $timer = $('#timer')
    $timer.text(`timer: ${time}s`)
}



//Reset game
// ========================================================== 

// Step (2) -------------- Event Listener ------------------- //

