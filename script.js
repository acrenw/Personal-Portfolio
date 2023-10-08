const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1450
canvas.height = 600

// declaring the avatar image
const avatar = new Image()
avatar.src='images/avatar-idle-down.png'

let x = 0
let y = 0

// animation
function animate() {
    window.requestAnimationFrame(animate) //which function should i call over and over again

    // drawing avatar
    avatar.onload = function () {
        c.drawImage(avatar, x, y)
    }

    y++
    
}

animate()