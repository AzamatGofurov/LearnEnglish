const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// map click
document.addEventListener("DOMContentLoaded", () => {
    const lessonItems = document.querySelectorAll(".lesson-item"); // Barcha darslarni olish
    const menuItems = document.querySelectorAll(".menu-item"); // Barcha boblarni olish
    let completedLessons = []; // Tugatilgan darslar ro'yxati

    // Har bir darsni bosganda
    lessonItems.forEach((item) => {
        item.addEventListener("click", () => {
            const lessonNumber = parseFloat(item.dataset.lesson); // Hozirgi dars raqami

            // Agar dars qulfli bo'lsa
            if (item.classList.contains("locked")) {
                alert("This lesson is locked. Complete previous lessons first!");
                return;
            }

            // Darsni tugatgan deb belgilash
            if (!completedLessons.includes(lessonNumber)) {
                completedLessons.push(lessonNumber);
            }

            alert(`Starting lesson: ${lessonNumber}`);

            // Tugallangan darsni yashil qilish
            item.style.background = "linear-gradient(90deg, #00c853, #00796b)";
            item.style.boxShadow = "0 6px 15px rgba(0, 200, 83, 0.5)";

            // Keyingi darsni ochish
            unlockNextLesson(lessonNumber);

            // Keyingi bobni ochish
            checkAndUnlockNextChapter(lessonNumber);
        });
    });

    // Navbatdagi darslarni qulfdan chiqarish
    function unlockNextLesson(currentLesson) {
        const nextLessonNumber = currentLesson + 0.1; // Keyingi dars raqami

        lessonItems.forEach((item) => {
            const lessonNumber = parseFloat(item.dataset.lesson); // Dars raqamini olish

            // Agar dars qulfli va keyingi dars bo'lsa, uni ochish
            if (item.classList.contains("locked") && lessonNumber === nextLessonNumber) {
                item.classList.remove("locked");
                item.style.background = "linear-gradient(90deg, #0077b6, #00b4d8)";
                item.style.cursor = "pointer";

                // Qulf ikonkasini yashirish
                const lockIcon = item.querySelector("i");
                if (lockIcon) lockIcon.style.display = "none";
            }
        });
    }

    // Keyingi bobni ochish
    function checkAndUnlockNextChapter(currentLesson) {
        const currentChapter = Math.floor(currentLesson); // Hozirgi bob raqami
        const isChapterCompleted = [...lessonItems].every((item) => {
            const lessonNumber = parseFloat(item.dataset.lesson);
            return Math.floor(lessonNumber) !== currentChapter || completedLessons.includes(lessonNumber);
        });

        if (isChapterCompleted) {
            const nextChapter = currentChapter + 1; // Keyingi bob raqami

            menuItems.forEach((menuItem) => {
                const lessons = menuItem.querySelectorAll(".lesson-item");
                const lessonNumbers = [...lessons].map((item) => parseFloat(item.dataset.lesson));

                // Keyingi bobni ochish
                if (lessonNumbers.some((lesson) => Math.floor(lesson) === nextChapter)) {
                    menuItem.classList.remove("locked");
                    lessons.forEach((lesson) => {
                        lesson.classList.remove("locked");
                        lesson.style.background = "linear-gradient(90deg, #0077b6, #00b4d8)";
                        lesson.style.cursor = "pointer";

                        // Qulf ikonkasini yashirish
                        const lockIcon = lesson.querySelector("i");
                        if (lockIcon) lockIcon.style.display = "none";
                    });
                }
            });
        }
    }
});





