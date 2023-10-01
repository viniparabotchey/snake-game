const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")
var h1 = document.querySelector("h1")

const size = 30

const snake = [{x: 270, y: 240}]

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomPosition() {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

function randomColor() {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return  `rgb(${red}, ${green}, ${blue})`
}

h1.innerText = randomColor()

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction, loopId

function drawFood() {
    const {x, y, color} = food

    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

function drawSnake() {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) => {
        
        if (index == snake.length -1) {
            ctx.fillStyle = "white"
        }
        
        ctx.fillRect(position.x, position.y, size, size)
    })
}

function moveSnake() {
    if (!direction) return

    const head = snake[snake.length -1]

    if (direction == "right") {
        snake.push({x: head.x + size, y: head.y})
    }

    if (direction == "left") {
        snake.push({x: head.x - size, y: head.y})
    }

    if (direction == "down") {
        snake.push({x: head.x, y: head.y + size})
    }

    if (direction == "up") {
        snake.push({x: head.x, y: head.y - size})
    }

    snake.shift()
}

function drawGrid() {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"
    
    for (let i = 30; i < canvas.width; i += 30){
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()
       
        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }

    
}

function checkEat() {
    const head = snake[snake.length - 1]
    if (head.x == food.x && head.y == food.y) {
        snake.push
    }
}

function gameLoop() {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()

    loopId = setTimeout(() => {
        gameLoop()
    }, 300)
}

gameLoop()

document.addEventListener("keydown", ({key}) =>{
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})