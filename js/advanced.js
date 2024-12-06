const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// map click

document.addEventListener("DOMContentLoaded", () => {
    const lessonItems = document.querySelectorAll(".lesson-item"); // Barcha darslarni olish
    const menuItems = document.querySelectorAll(".menu-item"); // Barcha boblarni olish

    // Cookie yaratish
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    // Cookie olish
    function getCookie(name) {
        const cookieArr = document.cookie.split(';');
        for (let i = 0; i < cookieArr.length; i++) {
            const cookie = cookieArr[i].trim();
            if (cookie.indexOf(name + '=') === 0) {
                return cookie.substring(name.length + 1);
            }
        }
        return '';
    }

    // Foydalanuvchi uchun noyob identifikator yaratish
    function generateUserID() {
        return `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    }

    // Foydalanuvchini identifikatsiya qilish
    function getUserID() {
        // Cookie orqali userID ni olish
        let userID = getCookie("userID");

        // Agar cookie mavjud bo'lmasa, localStorage'dan olish
        if (!userID) {
            userID = localStorage.getItem("userID");
        }

        // Agar userID mavjud bo'lmasa, yangi ID yaratish
        if (!userID) {
            userID = generateUserID();
            // Yangi userID ni cookie va localStorage'da saqlash
            setCookie("userID", userID, 365); // 1 yil davomida saqlash
            localStorage.setItem("userID", userID);
        }

        return userID;
    }

    // Foydalanuvchi ID ni olish
    const userID = getUserID();
    console.log("User ID:", userID);

    // Foydalanuvchi ma'lumotlarini saqlash va yuklash
    const userKey = `completedLessons_${userID}`;
    let completedLessons = JSON.parse(localStorage.getItem(userKey)) || [];

    // Tugallangan darslarni yuklash
    function loadCompletedLessons() {
        lessonItems.forEach((item) => {
            const lessonNumber = parseFloat(item.dataset.lesson);

            if (completedLessons.includes(lessonNumber)) {
                item.style.background = "linear-gradient(90deg, #00c853, #00796b)";
                item.style.boxShadow = "0 6px 15px rgba(0, 200, 83, 0.5)";
                item.classList.remove("locked");
                const lockIcon = item.querySelector("i");
                if (lockIcon) lockIcon.style.display = "none";
            }
        });
    }

    loadCompletedLessons();

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
                localStorage.setItem(userKey, JSON.stringify(completedLessons));
            }

            // Tugallangan darsni yashil qilish
            item.style.background = "linear-gradient(90deg, #00c853, #00796b)";
            item.style.boxShadow = "0 6px 15px rgba(0, 200, 83, 0.5)";

            // Keyingi darsni ochish
            unlockNextLesson(lessonNumber);

            // Keyingi bobni ochish
            checkAndUnlockNextChapter();
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
    function checkAndUnlockNextChapter() {
        menuItems.forEach((menuItem) => {
            const lessons = menuItem.querySelectorAll(".lesson-item");
            const chapterNumber = Math.floor(parseFloat(lessons[0]?.dataset.lesson || 0));

            // Agar bobning barcha darslari tugatilgan bo'lsa
            const isChapterCompleted = [...lessons].every((lesson) => {
                const lessonNumber = parseFloat(lesson.dataset.lesson);
                return completedLessons.includes(lessonNumber);
            });

            // Keyingi bobni ochish
            if (isChapterCompleted) {
                const nextChapter = menuItems[chapterNumber];
                if (nextChapter) {
                    nextChapter.classList.remove("locked");
                    const nextLessons = nextChapter.querySelectorAll(".lesson-item");
                    nextLessons.forEach((lesson) => {
                        if (!completedLessons.includes(parseFloat(lesson.dataset.lesson))) {
                            lesson.classList.remove("locked");
                            lesson.style.background = "linear-gradient(90deg, #0077b6, #00b4d8)";
                            lesson.style.cursor = "pointer";

                            // Qulf ikonkasini yashirish
                            const lockIcon = lesson.querySelector("i");
                            if (lockIcon) lockIcon.style.display = "none";
                        }
                    });
                }
            }
        });
    }

    // Yangi holatni qayta yuklash
    function refreshUnlockStatus() {
        completedLessons = JSON.parse(localStorage.getItem(userKey)) || [];
        loadCompletedLessons();
        checkAndUnlockNextChapter();
    }

    refreshUnlockStatus();
});

