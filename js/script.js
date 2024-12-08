const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// -------- Hero section-------

const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];

class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * canvas.height;
        this.radius = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;

        // Ranglarni o'zgartirish (yorqinroq qilish)
        const colors = [
            'rgba(255, 69, 0, 0.8)',   // Red Orange
            'rgba(60, 179, 113, 0.8)', // Green
            'rgba(70, 130, 180, 0.8)', // Steel Blue
            'rgba(238, 130, 238, 0.8)', // Violet
            'rgba(255, 215, 0, 0.8)'    // Gold
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.y -= this.speed;
        if (this.y + this.radius < 0) {
            this.y = canvas.height + this.radius;
            this.x = Math.random() * canvas.width;
        }
    }
}

function addBubbles() {
    for (let i = 0; i < 50; i++) {
        bubbles.push(new Bubble());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
    });
    requestAnimationFrame(animate);
}

addBubbles();
animate();


// --------Scrool efect Hero and Lesson sections

document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    const lessons = document.querySelector("#lessons");

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        const heroHeight = hero.offsetHeight;

        // Scroll qilganda keyingi bo'limlar hero section ustidan chiqadi
        if (scrollPosition >= heroHeight) {
            hero.style.position = "relative";
        } else {
            hero.style.position = "sticky";
        }
    });
});

// ----------------language sellect



