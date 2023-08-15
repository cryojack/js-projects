const canvas = document.querySelector('canvas')
const scoreEl = document.getElementById('scoreEl')
const bigScoreEl = document.getElementById('bigScoreEl')
const startGameBttn = document.getElementById('startGameBttn')
const startModal = document.getElementById('startModal')

canvas.width = innerWidth
canvas.height = innerHeight

const ctx = canvas.getContext('2d')

// Constants here
const x = canvas.width / 2
const y = canvas.height / 2

const enemyMaxRadius = 30
const enemyMinRadius = 10
const particlePower = 6
const friction = 0.99

let projectiles = []
let enemies = []
let particles = []
let player

let animationId
let score = 0


// Player class
class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

// Projectile class
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

// Enemy class
class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

// Particle class
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }
}

// Init function to reset
function init() {
    player = new Player(x, y, 15, 'white')
    projectiles = []
    enemies = []
    particles = []
    score = 0
    scoreEl.innerText = score
    bigScoreEl.innerText = score
}

// Spawn enemies
function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (enemyMaxRadius - enemyMinRadius) + enemyMinRadius
        let x
        let y

        if(Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(
            x,
            y,
            radius,
            color,
            velocity
        ))
        
    }, 1000)

}

// Main animation function : runs always
function animate() {
    animationId = requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    particles.forEach((particle, particleIndex) => {
        if(particle.alpha <= 0) {
            particles.splice(particleIndex,1)
        } else {
            particle.update()
        }
    })

    projectiles.forEach((projectile,index) => {
        projectile.update()

        // Remove projectile when outside the canvas frame
        if(
            projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height
            ) {
            setTimeout(() => {
                projectiles.splice(index,1)
            },0)
        }
    })
    enemies.forEach((enemy,enemyIndex) => {
        enemy.update()
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        // Check if player is hit by enemy
        if(dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
            startModal.style.display = 'flex'
            bigScoreEl.innerText = score
        }

        // Remove projectiles and enemy when they hit
        projectiles.forEach((projectile,projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            if(dist - enemy.radius - projectile.radius < 1) {
                // Increase score
                
                // Generate particles on hit
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(new Particle(
                        projectile.x,
                        projectile.y,
                        Math.random() * 2,
                        enemy.color,
                        {
                            x: (Math.random() - 0.5) * (Math.random() * particlePower),
                            y: (Math.random() - 0.5) * (Math.random() * particlePower)
                        }
                    ))
                }
                if(enemy.radius - 10 > 5) {
                    // Increase score on hit
                    score += 50
                    scoreEl.innerText = score
                    gsap.to(enemy,{
                        radius: enemy.radius - 10
                    })
                    setTimeout(() => {
                        projectiles.splice(projectileIndex,1)
                    },0)
                } else {
                    // Increase score on enemy kill
                    score += 200
                    scoreEl.innerText = score
                    setTimeout(() => {
                        enemies.splice(enemyIndex,1)
                        projectiles.splice(projectileIndex,1)
                    },0)
                }
            }
        })
    })
}

addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2)

    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }

    projectiles.push(
        new Projectile(
            canvas.width / 2,
            canvas.height / 2,
            5,
            'white',
            velocity
        )
    )
})

startGameBttn.addEventListener('click', () => {
    init()
    animate()
    spawnEnemies()
    startModal.style.display = 'none'
})