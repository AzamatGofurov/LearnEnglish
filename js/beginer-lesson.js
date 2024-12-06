const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


// Mashq uchun to'g'ri javoblar
// Mashq uchun to'g'ri javoblar
const correctAnswers = {
    1: "a, b, c, e, t, x",
    2: { "a", "o", "BO__K": "o" },
    3: { "hello": "HELLO", "WORLD": "world" },
    4: { "A": "ey", "H": "eich" },
    5: "apple, banana, cat, dog, elephant"
};

// Mashqlarni topish
const exercises = document.querySelectorAll(".exercise");

// Mashq javoblarini tekshirish funksiyasi
function checkAnswers(event) {
    const exercise = event.target.closest(".exercise");
    const exerciseId = exercise.getAttribute("data-exercise-id");
    const feedback = exercise.querySelector(".feedback");

    // Mashqni aniqlash va javoblarni tekshirish
    switch (exerciseId) {
        case "1": // Mashq 1: Harflarni tartiblash
            const userAnswer1 = exercise.querySelector("input").value.trim().toLowerCase();
            feedback.textContent = userAnswer1 === correctAnswers[1]
                ? "To'g'ri javob! 🎉"
                : "Xato javob. Qayta urinib ko'ring.";
            feedback.className = `feedback ${userAnswer1 === correctAnswers[1] ? "correct" : "incorrect"}`;
            break;

        case "2": // Mashq 2: Yo'qolgan harfni topish
            const inputs2 = exercise.querySelectorAll("input");
            let allCorrect2 = true;
            inputs2.forEach(input => {
                const question = input.previousSibling.textContent.trim();
                const userAnswer2 = input.value.trim().toLowerCase();
                if (userAnswer2 !== correctAnswers[2][question.toUpperCase()]) {
                    allCorrect2 = false;
                }
            });
            feedback.textContent = allCorrect2
                ? "Barcha javoblar to'g'ri! 🎉"
                : "Ba'zi javoblar xato. Tekshirib ko'ring.";
            feedback.className = `feedback ${allCorrect2 ? "correct" : "incorrect"}`;
            break;

        case "3": // Mashq 3: So'zlarni katta va kichik yozish
            const inputs3 = exercise.querySelectorAll("input");
            let allCorrect3 = true;
            inputs3.forEach(input => {
                const word = input.previousSibling.textContent.trim().toLowerCase().replace(":", "");
                const userAnswer3 = input.value.trim();
                if (userAnswer3 !== correctAnswers[3][word]) {
                    allCorrect3 = false;
                }
            });
            feedback.textContent = allCorrect3
                ? "Barcha javoblar to'g'ri! 🎉"
                : "Ba'zi javoblar xato. Qayta urinib ko'ring.";
            feedback.className = `feedback ${allCorrect3 ? "correct" : "incorrect"}`;
            break;

        case "4": // Mashq 4: Talaffuzni moslash
            const inputs4 = exercise.querySelectorAll("input");
            let allCorrect4 = true;
            inputs4.forEach(input => {
                const letter = input.previousSibling.textContent.trim().replace(":", "");
                const userAnswer4 = input.value.trim().toLowerCase();
                if (userAnswer4 !== correctAnswers[4][letter]) {
                    allCorrect4 = false;
                }
            });
            feedback.textContent = allCorrect4
                ? "Barcha talaffuzlar to'g'ri! 🎉"
                : "Ba'zi javoblar noto'g'ri. Qayta urinib ko'ring.";
            feedback.className = `feedback ${allCorrect4 ? "correct" : "incorrect"}`;
            break;

        case "5": // Mashq 5: So'zlarni alifbo tartibida yozish
            const userAnswer5 = exercise.querySelector("input").value.trim().toLowerCase();
            feedback.textContent = userAnswer5 === correctAnswers[5]
                ? "To'g'ri javob! 🎉"
                : "Xato javob. Qayta urinib ko'ring.";
            feedback.className = `feedback ${userAnswer5 === correctAnswers[5] ? "correct" : "incorrect"}`;
            break;

        default:
            feedback.textContent = "Noma'lum mashq.";
            feedback.className = "feedback incorrect";
    }

    feedback.style.display = "block";
}

// Tugmalarni aniqlash va bosganda tekshirish
exercises.forEach(exercise => {
    const button = exercise.querySelector(".check-answer");
    button.addEventListener("click", checkAnswers);
});

// "Next Lesson" tugmasini yaratish
function createNextLessonButton() {
    if (!document.querySelector("#next-lesson-btn")) {
        const nextButton = document.createElement("button");
        nextButton.id = "next-lesson-btn";
        nextButton.textContent = "Next Lesson";
        nextButton.style = `
            margin-top: 20px;
            padding: 15px 30px;
            font-size: 1.2rem;
            color: #fff;
            background: linear-gradient(90deg, #28a745, #218838);
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        nextButton.addEventListener("click", () => {
            window.location.href = "/next-lesson.html"; // Keyingi darsga yo'naltirish
        });

        document.querySelector("#alphabet-lesson").appendChild(nextButton);
    }
}

// Tugmalarni aniqlash va bosganda tekshirish
exercises.forEach(exercise => {
    const button = exercise.querySelector(".check-answer");
    button.addEventListener("click", checkAnswers);
});
