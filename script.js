// canvas setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1450
canvas.height = 600

//variables
const gravity = 1

// declaring avatar images
const avatarIdleUp = new Image()
avatarIdleUp.src='images/avatar-idle-up.png'

const avatarIdleDown = new Image()
avatarIdleDown.src='images/avatar-idle-down.png'

const avatarWalk1 = new Image()
avatarIdleUp.src='images/avatar-idle-up.png' //change source later

const avatarWalk2 = new Image()
avatarIdleUp.src='images/avatar-idle-up.png' //change source later


// classes
class Player {
    constructor (up, down, walk1, walk2, position) {
        this.up = up
        this.down = down
        this.walk1 = walk1
        this.walk2 = walk2
        this.position = position
        this.velocity = {
            x: 0,
            y: 1, // default we are falling down
        }
        this.height = 100
    }

    draw() {
        if (frame%40 < 20) {
            if (this.up.complete){
                c.drawImage(this.up, this.position.x, this.position.y)
            }
        }
        else {
            if (this.down.complete){
                c.drawImage(this.down, this.position.x, this.position.y)
            }
        }
        
    }

    update() {
        this.draw()
        
        if (this.height + this.position.y + this.velocity.y < canvas.height) {
            this.position.y += this.velocity.y
            this.velocity.y += gravity //add acceleration
        }
        
    }
}


const cera = new Player(avatarIdleUp, avatarIdleDown, avatarWalk1, avatarWalk2, {
    x:0,
    y:0,
})


let frame = 0

// animation
function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    
    cera.update()

    frame++
    window.requestAnimationFrame(animate) //shcedules to run animate() on the next frame
}

animate()