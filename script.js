// canvas setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1450
canvas.height = 600

//variables
const gravity = 1
var playerLeft = false
//cera stand = true

// declaring images
const avatarIdleUp = new Image()
avatarIdleUp.src='images/avatar-idle-up.png'

const avatarIdleDown = new Image()
avatarIdleDown.src='images/avatar-idle-down.png'

const introduce = new Image() 
introduce.src='images/introduce.png'

const learnMore = new Image() 
learnMore.src='images/learnMore.png'

const comment = new Image()
comment.src='images/comment'


// classes
class Player {
    constructor (up, down, position) {
        this.up = up
        this.down = down
        this.position = position
        this.velocity = {
            x: 0,
            y: 1, // default we are falling down
        }
        this.height = 100
        this.width = 100
    }

    draw() {
        if (frame%40 < 20) {
            if (this.up.complete){
                if (playerLeft){
                    c.save(); // Save the current state
                    c.scale(-1, 1); // Flip along y-axis
                    c.drawImage(this.up, -this.position.x-this.width, this.position.y);
                    c.restore(); // Restore to the previous state
                }
                else {
                    c.drawImage(this.up, this.position.x, this.position.y)
                }
            }
        }
        else {
            if (this.down.complete){
                if (playerLeft){
                    c.save(); // Save the current state
                    c.scale(-1, 1); // Flip along y-axis
                    c.drawImage(this.down, -this.position.x-this.width, this.position.y);
                    c.restore(); // Restore to the previous state
                }
                else {
                    c.drawImage(this.down, this.position.x, this.position.y)
                }
            }
        }
        
    }

    update() {
        this.draw()

        if (this.width + this.position.x + this.velocity.x < canvas.width) {
            this.position.x += this.velocity.x
        }
        if (this.position.x + this.velocity.x <= 0) {
            this.position.x -= this.velocity.x
        }
        if (this.position.y + this.velocity.y <= 0) {
            this.position.y -= this.velocity.y
        }
        if (this.height + this.position.y + this.velocity.y < canvas.height) {
            this.position.y += this.velocity.y
            this.velocity.y += gravity //add acceleration
        }
    }

    // introduce() { //draw speech bubble beside ceras head position
    // }

    // learnMore() {
    // }

    // throwElements() { //explode element icons from ceras coords
    // }

    // comment() {
    // }
}


const cera = new Player(avatarIdleUp, avatarIdleDown, {
    x:canvas.width/2-100,
    y:canvas.height-100,
})


let frame = 0
const keys = {
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
}

// animation
function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)

    //draw background (groud? floors?)
    
    //drawing updated player
    cera.update()

    //updating player's x positions
    cera.velocity.x = 0
    if (keys.ArrowRight.pressed) {
        cera.velocity.x = 5
        playerLeft = false
    }
    else if (keys.ArrowLeft.pressed) {
        cera.velocity.x = -5
        playerLeft = true
    }

    // if mouse clicked on cera 
    //      if cera stand
    //          cera.introduce()
    //          cera introduce = true
    //          cera stand = false
    //      else if cera introduce
    //          cera.learnMore()
    //          cera learn more = true
    //          cera introduce = false
    //      else if cera learn more
    //          cera.throwElements()
    //          cera throw elements = true
    //          cera learn more = false
    //      else if cera throw elements
    //          cera.comment()


    // if elements are thrown (about me, education, experience, projects, achievements, contact me)
    //      //update element position based on whether cera touches them or not
    //      //(physics- kick them away, jump on them, elements cant overlap with each other)

    //      if mouse click on a coords
    //          a-popup = true
    //          set X (close window button) coord to wherever a's X coords are
    //      //repeat for a-z

    //      if a||b||...||z is true
    //          cant click on any other elements
    //          if mouse clicks on X coords
    //              clear all popup windows
    //              set all elements popups to false

    frame++
    window.requestAnimationFrame(animate) //shcedules to run animate() on the next frame
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
        break
        case 'ArrowUp':
            cera.velocity.y = -15
        break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            // cera.velocity.x = 5
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            // cera.velocity.x = -5
        break
    }
})