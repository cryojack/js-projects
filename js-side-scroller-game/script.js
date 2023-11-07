// The main game area and display
const gameArea      = document.querySelector('.game-area')
const displayScore  = document.getElementById('score')
const displayRemain = document.getElementById('remain')
const displaySpeed  = document.getElementById('speed')

// Game area dimensions
const WIDTH = gameArea.clientWidth
const HEIGHT = gameArea.clientHeight

// Constants for the gameplay
const GRAVITY               = 0.57  // Gravity constant
const OBSTACLES_NUM         = 100   // Number of obstacles
const OBSTACLE_START        = 1000  // Start location of first obstacle
const OBSTACLE_MAX_WIDTH    = 30    // Max width of an obstacle
const OBSTACLE_MIN_HEIGHT   = 150   // Min height of an obstacle
const OBSTACLE_MAX_HEIGHT   = 300   // Max height of an obstacle
const OBSTACLE_MIN_GAP      = 10    // Min gap between an obstacle
const OBSTACLE_MAX_GAP      = 50    // Max gap between an obstacle
const OBSTACLE_VELOCITY     = 1     // Obstacle velocity
const OBSTACLE_STEP         = 5     // Increase speed after removing these many obstacles

// Floor tiles and pillar arrays
const obstacles = []
const jumpedObstacles = []
const removedObstacles = []

// Obstacle speed counter and score variable
let playerScore = 0
let obstacleSpeed = 1

// Game interval ID
let loopId

// Player class
class Player {
    constructor(pX,pY,pWidth = 50,pHeight = 50,pVelocity = 0.01) {
        const PLAYER_COLOR = 'rgb(120,120,120)'
        this.pX = pX
        this.pY = pY
        this.pWidth = pWidth
        this.pHeight = pHeight
        this.pVelocity = pVelocity
        this.pCanMove = true
        this.createPlayer(this.pX,this.pY,this.pWidth,this.pHeight,PLAYER_COLOR)
    }

    // Create player
    createPlayer(pX,pY,pWidth,pHeight,pColor) {
        this.el = document.createElement('div')
        this.el.style.position = 'absolute'
        this.el.style.left = pX + 'px'
        this.el.style.top = pY + 'px'
        this.el.style.width = pWidth + 'px'
        this.el.style.height = pHeight + 'px'
        this.el.style.backgroundColor = pColor
        this.el.className = 'player'

        gameArea.append(this.el)
    }

    // Applying gravity
    applyGravity() {
        if(this.checkFloorCollisions()) {
            this.pY += this.pVelocity
            this.pVelocity += GRAVITY
        } else {
            this.pVelocity = 0
            this.pY = floorTile.fY - this.pHeight
        }
        this.el.style.top = this.pY + 'px'
    }

    // Check floor collisions
    checkFloorCollisions() {
        if(this.pY + this.pHeight + this.pVelocity < floorTile.fY) return true
        else return false
    }

    // Check obstacle collisions
    checkObstacleCollisions() {
        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i]
            if(
                this.pX + this.pWidth > obstacle.oX &&
                this.pX < obstacle.oX + obstacle.oWidth &&
                this.pY + this.pHeight > obstacle.oY
            ) {
                this.pCanMove = false
                obstacle.el.style.backgroundColor = 'white'
                clearInterval(loopId)
            }
        }
    }

    changePlayerScore() {
        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i]
            if(this.pX >= obstacle.oX + obstacle.oWidth) {
                jumpedObstacles.push(obstacle)
                break
            }
        }
        console.clear()
        console.log(jumpedObstacles)
    }

    // Player jump
    jump() {
        if(
            !this.pCanMove ||
            this.pY + this.pHeight + this.pVelocity < floorTile.fY
        ) {
            return
        } else {
            this.pVelocity = -25
            this.pY += this.pVelocity
        }
        this.el.style.top = this.pY + 'px'
    }

    move(mX,mY) {
        this.pX += mX
        this.pY += mY
        this.el.style.left = this.pX + 'px'
        this.el.style.top = this.pY + 'px'
    }

}

// FloorTile class
class FloorTile {
    constructor(fX = 0,fY = 750,fWidth = WIDTH,fHeight = 250) {
        const FLOOR_TILE_COLOR = 'rgb(208 208 208)'
        this.fX = fX
        this.fY = fY
        this.fWidth = fWidth
        this.fHeight = fHeight
        this.createFloorTile(this.fX,this.fY,this.fWidth,this.fHeight,FLOOR_TILE_COLOR)
    }

    // Create floor tiles
    createFloorTile(fX,fY,fWidth,fHeight,fColor) {
        this.el = document.createElement('div')
        this.el.style.position = 'absolute'
        this.el.style.left = fX + 'px'
        this.el.style.top = fY + 'px'
        this.el.style.width = fWidth + 'px'
        this.el.style.height = fHeight + 'px'
        this.el.style.backgroundColor = fColor
        this.el.className = 'floor'

        gameArea.append(this.el)
    }

}

// Obstacle class
class Obstacle {
    constructor(oID,oX,oY,oWidth,oHeight,oVelocity = 8) {
        const OBSTACLE_COLOR = 'blue'
        this.oID = oID
        this.oX = oX
        this.oY = oY
        this.oWidth = oWidth
        this.oHeight = oHeight
        this.oVelocity = oVelocity
        this.createObstacle(this.oX,this.oY,this.oWidth,this.oHeight,OBSTACLE_COLOR)
    }

    // Create obstacle
    createObstacle(oX,oY,oWidth,oHeight,oColor) {
        this.el = document.createElement('div')
        this.el.style.position = 'absolute'
        this.el.style.left = oX + 'px'
        this.el.style.top = oY + 'px'
        this.el.style.width = oWidth + 'px'
        this.el.style.height = oHeight + 'px'
        this.el.style.backgroundColor = oColor
        this.el.className = 'obstacle'

        gameArea.append(this.el)
    }

    // Move obstacle
    moveObstacle() {
        this.oX -= this.oVelocity
        this.el.style.left = this.oX + 'px'
    }
}

// Simple randomizer function
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Obstacle remaining and speed display function
function displayStats() {
    displayScore.innerText = jumpedObstacles.length
    displayRemain.innerText = obstacles.length
    displaySpeed.innerText = obstacleSpeed
}

// Remove obstacles function
function removeObstacle() {
    obstacles.forEach((obstacle, index) => {
        if(obstacle.oX + obstacle.oWidth < 0) {
            removedObstacles.push(obstacles.splice(index,1))
        }
        obstacle.moveObstacle()
    })
}

// Increase obstacle speed function
function changeObstacleSpeed() {
    if(removedObstacles.length >= OBSTACLE_STEP) {
        removedObstacles.splice(0,removedObstacles.length)
        obstacles.forEach(obstacle => {
            obstacle.oVelocity += OBSTACLE_VELOCITY
        })
        obstacleSpeed++
    }
}

// Main game run function
function runGame() {
    player.applyGravity()
    player.checkObstacleCollisions()
    player.changePlayerScore()
    displayStats()
    removeObstacle()
    changeObstacleSpeed()
}


// Create floor tile
const floorTile = new FloorTile()

// Create obstacles with some random distance between each one
for(let i = 1 ; i <= OBSTACLES_NUM ; i++) {
    const x = i * OBSTACLE_START + randomize(OBSTACLE_MIN_GAP,OBSTACLE_MAX_GAP)
    const y = floorTile.fY - randomize(OBSTACLE_MIN_HEIGHT,OBSTACLE_MAX_HEIGHT)
    const w = OBSTACLE_MAX_WIDTH
    const h = floorTile.fY - y
    obstacles.push(new Obstacle(
        i,x,y,w,h
    ))
}

// Create a player object here
const player = new Player(200,170)

// Key event listeners
window.addEventListener('keydown',(e) => {
    switch(e.key) {
        case ' ':
            player.jump()
            break

        // case 'w':
        //     player.move(0,-20)
        //     break

        // case 'a':
        //     player.move(-20,0)
        //     break

        // case 's':
        //     player.move(0,20)
        //     break

        // case 'd':
        //     player.move(20,0)
        //     break
    }
})

loopId = setInterval(runGame,20)