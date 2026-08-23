/* =========================================================
   AIEL — AMERICAN INSTITUTE OF ENGLISH LANGUAGE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader =
        document.getElementById("preloader");


    if (preloader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                preloader.classList.add("hidden");


                setTimeout(() => {

                    preloader.style.display = "none";

                }, 700);


            }, 700);

        });

    }



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");


    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");


            document.body.classList.toggle(
                "no-scroll",
                navLinks.classList.contains("active")
            );

        });


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("active");

                    document.body.classList.remove(
                        "no-scroll"
                    );

                });

            });

    }



    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    function updateNavbar() {

        if (!navbar) return;


        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar
    );


    updateNavbar();



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const id =
                    link.getAttribute("href");


                if (!id || id === "#") return;


                const target =
                    document.querySelector(id);


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            });

        });



    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll("[data-target]");


    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    const counter =
                        entry.target;


                    const target =
                        Number(counter.dataset.target);


                    let current = 0;


                    const duration = 1300;


                    const step =
                        target / (duration / 16);


                    function animate() {

                        current += step;


                        if (current >= target) {

                            counter.textContent =
                                target;

                            return;

                        }


                        counter.textContent =
                            Math.floor(current);


                        requestAnimationFrame(
                            animate
                        );

                    }


                    animate();


                    counterObserver.unobserve(
                        counter
                    );

                });

            },

            {
                threshold: 0.5
            }

        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });



    /* =====================================================
       ENGLISH TEST
    ===================================================== */

    const questions = [

        {

            question:
                "Choose the correct sentence:",

            options: [

                "He don't like coffee.",

                "He doesn't likes coffee.",

                "He doesn't like coffee.",

                "He not like coffee."

            ],

            answer: 2,

            explanation:
                "After 'doesn't', we use the base form 'like'."

        },


        {

            question:
                "Choose the synonym of 'Happy':",

            options: [

                "Angry",

                "Joyful",

                "Tired",

                "Weak"

            ],

            answer: 1,

            explanation:
                "Joyful means feeling or showing happiness."

        },


        {

            question:
                "Complete the sentence: I ___ a student.",

            options: [

                "am",

                "is",

                "are",

                "be"

            ],

            answer: 0,

            explanation:
                "The correct form with 'I' is 'am'."

        },


        {

            question:
                "Which word is a noun?",

            options: [

                "Beautiful",

                "Quickly",

                "Teacher",

                "Run"

            ],

            answer: 2,

            explanation:
                "Teacher is a noun because it names a person."

        },


        {

            question:
                "Choose the correct sentence:",

            options: [

                "She have a car.",

                "She has a car.",

                "She having a car.",

                "She has having a car."

            ],

            answer: 1,

            explanation:
                "With 'she', we use 'has'."

        },


        {

            question:
                "Complete: They ___ playing cricket.",

            options: [

                "is",

                "am",

                "are",

                "be"

            ],

            answer: 2,

            explanation:
                "The plural subject 'they' takes 'are'."

        },


        {

            question:
                "Which sentence is in the past tense?",

            options: [

                "I eat breakfast.",

                "I am eating breakfast.",

                "I ate breakfast.",

                "I will eat breakfast."

            ],

            answer: 2,

            explanation:
                "'Ate' is the past tense of 'eat'."

        },


        {

            question:
                "Choose the correct article: He is ___ honest man.",

            options: [

                "a",

                "an",

                "the",

                "no article"

            ],

            answer: 1,

            explanation:
                "We use 'an' before the vowel sound in 'honest'."

        },


        {

            question:
                "What does 'Improve' mean?",

            options: [

                "To make something better",

                "To destroy something",

                "To forget something",

                "To stop something"

            ],

            answer: 0,

            explanation:
                "Improve means to make something better."

        },


        {

            question:
                "Choose the correct sentence:",

            options: [

                "I have been learning English.",

                "I has been learning English.",

                "I have learning English.",

                "I been learning English."

            ],

            answer: 0,

            explanation:
                "The correct present perfect continuous form is 'I have been learning'."

        }

    ];



    let currentQuestion = 0;

    let userScore = 0;

    let selectedAnswer = null;



    const quizQuestion =
        document.getElementById("quizQuestion");


    const quizOptions =
        document.getElementById("quizOptions");


    const quizNext =
        document.getElementById("quizNext");


    const quizProgress =
        document.getElementById("quizProgress");


    const quizScore =
        document.getElementById("quizScore");



    function showQuestion() {

        if (!quizQuestion || !quizOptions)
            return;


        const question =
            questions[currentQuestion];


        selectedAnswer = null;


        quizQuestion.textContent =
            question.question;


        quizOptions.innerHTML = "";


        question.options.forEach(
            (option, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type = "button";


                button.className =
                    "answer";


                button.textContent =
                    option;


                button.addEventListener(
                    "click",
                    () =>
                        selectAnswer(
                            index,
                            button
                        )
                );


                quizOptions.appendChild(
                    button
                );

            }
        );


        if (quizProgress) {

            quizProgress.textContent =
                `Question ${currentQuestion + 1} of ${questions.length}`;

        }


        if (quizNext) {

            quizNext.disabled = true;

            quizNext.style.opacity = "0.45";

            quizNext.innerHTML =
                "Next Question →";

        }

    }



    function selectAnswer(
        index,
        button
    ) {

        if (selectedAnswer !== null)
            return;


        selectedAnswer = index;


        const question =
            questions[currentQuestion];


        const allButtons =
            quizOptions.querySelectorAll(
                ".answer"
            );


        allButtons.forEach(btn => {

            btn.disabled = true;

        });


        if (index === question.answer) {

            button.classList.add(
                "correct"
            );

            userScore++;

        } else {

            button.classList.add(
                "wrong"
            );


            allButtons[
                question.answer
            ].classList.add(
                "correct"
            );

        }


        if (quizNext) {

            quizNext.disabled = false;

            quizNext.style.opacity = "1";

        }

    }



    function showQuizResult() {

        if (!quizQuestion || !quizOptions)
            return;


        const percentage =
            Math.round(
                (userScore /
                    questions.length) *
                    100
            );


        let level = "";

        let message = "";


        if (percentage >= 90) {

            level = "Advanced";

            message =
                "Excellent performance! Your English foundation looks strong.";

        }

        else if (percentage >= 70) {

            level =
                "Upper Intermediate";

            message =
                "Great work! A little more practice can make you even stronger.";

        }

        else if (percentage >= 50) {

            level =
                "Intermediate";

            message =
                "Good start. Focus on grammar and vocabulary to improve.";

        }

        else {

            level =
                "Beginner";

            message =
                "Keep practicing. Consistent learning can improve your score.";

        }


        quizQuestion.innerHTML = `

            <div style="
                text-align:center;
            ">

                <div style="
                    font-size:48px;
                ">
                    🏆
                </div>


                <h2 style="
                    margin:10px 0;
                ">
                    ${userScore}/${questions.length}
                </h2>


                <h3 style="
                    color:#1677ff;
                ">
                    ${level}
                </h3>


                <p style="
                    color:#667085;
                ">
                    ${message}
                </p>

            </div>

        `;


        quizOptions.innerHTML = `

            <div style="
                padding:20px;
                border-radius:16px;
                background:#f5f8fc;
                text-align:center;
            ">

                <strong>
                    Your Score: ${percentage}%
                </strong>


                <p style="
                    margin-top:8px;
                    color:#667085;
                    font-size:13px;
                ">
                    Want to improve your English?
                </p>

            </div>

        `;


        if (quizProgress) {

            quizProgress.textContent =
                "Assessment Complete";

        }


        if (quizNext) {

            quizNext.innerHTML =
                "Take Test Again ↻";


            quizNext.disabled = false;


            quizNext.style.opacity = "1";


            quizNext.onclick =
                restartQuiz;

        }

    }



    function restartQuiz() {

        currentQuestion = 0;

        userScore = 0;

        selectedAnswer = null;


        if (quizNext) {

            quizNext.onclick =
                nextQuestion;

        }


        showQuestion();

    }



    function nextQuestion() {

        if (selectedAnswer === null)
            return;


        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            showQuizResult();

            return;

        }


        showQuestion();

    }



    if (
        quizQuestion &&
        quizOptions &&
        quizNext
    ) {

        quizNext.addEventListener(
            "click",
            nextQuestion
        );


        showQuestion();

    }



    /* =====================================================
       VOCABULARY GAME
    ===================================================== */

    const gameData = [

        {

            word: "Happy",

            options: [
                "Joyful",
                "Angry",
                "Weak",
                "Sad"
            ],

            answer: 0

        },


        {

            word: "Brave",

            options: [
                "Fearful",
                "Courageous",
                "Lazy",
                "Quiet"
            ],

            answer: 1

        },


        {

            word: "Rapid",

            options: [
                "Slow",
                "Fast",
                "Heavy",
                "Small"
            ],

            answer: 1

        },


        {

            word: "Begin",

            options: [
                "Start",
                "Finish",
                "Stop",
                "Forget"
            ],

            answer: 0

        },


        {

            word: "Accurate",

            options: [
                "Wrong",
                "Approximate",
                "Correct",
                "Difficult"
            ],

            answer: 2

        }

    ];


    let gameQuestion = 0;

    let gamePoints = 0;

    let gameAnswered = false;


    const gameWord =
        document.getElementById("gameWord");


    const gameOptions =
        document.getElementById("gameOptions");


    const gameNext =
        document.getElementById("gameNext");


    const gameScore =
        document.getElementById("gameScore");



    function loadGameQuestion() {

        if (!gameWord || !gameOptions)
            return;


        const item =
            gameData[gameQuestion];


        gameAnswered = false;


        gameWord.textContent =
            item.word;


        gameOptions.innerHTML = "";


        item.options.forEach(
            (option, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type = "button";


                button.className =
                    "game-option";


                button.textContent =
                    option;


                button.addEventListener(
                    "click",
                    () =>
                        selectGameAnswer(
                            index,
                            button
                        )
                );


                gameOptions.appendChild(
                    button
                );

            }
        );


        if (gameScore) {

            gameScore.textContent =
                `Score: ${gamePoints}`;

        }


        if (gameNext) {

            gameNext.disabled = true;

            gameNext.style.opacity = "0.45";

            gameNext.textContent =
                "Next Word →";

        }

    }



    function selectGameAnswer(
        index,
        button
    ) {

        if (gameAnswered)
            return;


        gameAnswered = true;


        const item =
            gameData[gameQuestion];


        const buttons =
            gameOptions.querySelectorAll(
                ".game-option"
            );


        buttons.forEach(btn => {

            btn.disabled = true;

        });


        if (index === item.answer) {

            button.classList.add(
                "correct"
            );

            gamePoints += 10;

        } else {

            button.classList.add(
                "wrong"
            );


            buttons[
                item.answer
            ].classList.add(
                "correct"
            );

        }


        if (gameScore) {

            gameScore.textContent =
                `Score: ${gamePoints}`;

        }


        if (gameNext) {

            gameNext.disabled = false;

            gameNext.style.opacity = "1";

        }

    }



    function nextGameQuestion() {

        if (!gameAnswered)
            return;


        gameQuestion++;


        if (
            gameQuestion >=
            gameData.length
        ) {

            showGameResult();

            return;

        }


        loadGameQuestion();

    }



    function showGameResult() {

        if (!gameWord || !gameOptions)
            return;


        let level = "";


        if (gamePoints >= 40) {

            level =
                "Vocabulary Master 🏆";

        }

        else if (gamePoints >= 30) {

            level =
                "Great Vocabulary 🔥";

        }

        else if (gamePoints >= 20) {

            level =
                "Good Progress 👍";

        }

        else {

            level =
                "Keep Practicing 💪";

        }


        gameWord.innerHTML = `

            <span style="
                font-size:38px;
            ">
                🏆
            </span>

            <br>

            Challenge Complete!

        `;


        gameOptions.innerHTML = `

            <div style="
                text-align:center;
                width:100%;
                padding:20px;
            ">

                <strong style="
                    font-size:38px;
                    color:#1677ff;
                ">
                    ${gamePoints}/50
                </strong>


                <p style="
                    margin-top:8px;
                    color:#667085;
                ">
                    ${level}
                </p>

            </div>

        `;


        if (gameScore) {

            gameScore.textContent =
                "Final Score";

        }


        if (gameNext) {

            gameNext.textContent =
                "Play Again ↻";


            gameNext.disabled = false;


            gameNext.style.opacity = "1";


            gameNext.onclick =
                restartGame;

        }

    }



    function restartGame() {

        gameQuestion = 0;

        gamePoints = 0;

        gameAnswered = false;


        if (gameNext) {

            gameNext.onclick =
                nextGameQuestion;

        }


        loadGameQuestion();

    }



    if (
        gameWord &&
        gameOptions &&
        gameNext
    ) {

        gameNext.addEventListener(
            "click",
            nextGameQuestion
        );


        loadGameQuestion();

    }

        /* =====================================================
       CONTACT FORM → WHATSAPP LEAD SYSTEM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                /* =========================
                   GET FORM VALUES
                ========================= */

                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim();


                const phone =
                    document
                        .getElementById("phone")
                        ?.value
                        .trim();


                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim();



                /* =========================
                   NAME + PHONE VALIDATION
                ========================= */

                if (!name || !phone) {

                    if (formMessage) {

                        formMessage.innerHTML = `

                            <div style="
                                padding:14px;
                                margin-top:12px;
                                border-radius:12px;
                                background:#fff1f1;
                                color:#d93636;
                            ">

                                ⚠️ Please enter your
                                name and phone number.

                            </div>

                        `;

                    }

                    return;

                }



                /* =========================
                   PHONE VALIDATION
                ========================= */

                const cleanPhone =
                    phone.replace(/\D/g, "");


                if (cleanPhone.length < 10) {

                    if (formMessage) {

                        formMessage.innerHTML = `

                            <div style="
                                padding:14px;
                                margin-top:12px;
                                border-radius:12px;
                                background:#fff1f1;
                                color:#d93636;
                            ">

                                ⚠️ Please enter a
                                valid phone number.

                            </div>

                        `;

                    }

                    return;

                }



                /* =========================
                   AIEL WHATSAPP NUMBER
                ========================= */

                const whatsappNumber =
                    "919451813349";



                /* =========================
                   WHATSAPP MESSAGE
                ========================= */

                const whatsappMessage =

`Hello American Institute of English Language 👋

I am interested in the Free Demo.

Name: ${name}

Phone: ${phone}

Message:
${message || "I would like to know more about the courses."}

I found AIEL through your website.`;



                /* =========================
                   CREATE WHATSAPP URL
                ========================= */

                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );



                /* =========================
                   SUCCESS MESSAGE
                ========================= */

                if (formMessage) {

                    formMessage.innerHTML = `

                        <div style="
                            padding:16px;
                            margin-top:12px;
                            border-radius:14px;
                            background:#eafaf4;
                            color:#16865e;
                            line-height:1.6;
                        ">

                            <strong>
                                ✓ Demo Request Ready!
                            </strong>

                            <br>

                            Opening WhatsApp...

                        </div>

                    `;

                }



                /* =========================
                   OPEN WHATSAPP
                   
                   window.location.href is used
                   instead of window.open()
                   to avoid popup blocking.
                ========================= */

                setTimeout(() => {

                    window.location.href =
                        whatsappURL;

                }, 500);



                /* =========================
                   RESET FORM
                ========================= */

                setTimeout(() => {

                    contactForm.reset();

                }, 1500);

            }
        );

    }



    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqQuestions =
        document.querySelectorAll(
            ".faq-question"
        );


    faqQuestions.forEach(question => {

        question.addEventListener(
            "click",
            () => {

                const answer =
                    question.nextElementSibling;


                const isOpen =
                    question.classList.contains(
                        "active"
                    );



                /* =========================
                   CLOSE ALL FAQS
                ========================= */

                document
                    .querySelectorAll(
                        ".faq-question"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                document
                    .querySelectorAll(
                        ".faq-answer"
                    )
                    .forEach(item => {

                        item.style.maxHeight =
                            null;

                    });



                /* =========================
                   OPEN SELECTED FAQ
                ========================= */

                if (!isOpen) {

                    question.classList.add(
                        "active"
                    );


                    if (answer) {

                        answer.style.maxHeight =
                            answer.scrollHeight +
                            "px";

                    }

                }

            }
        );

    });



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById(
            "backTop"
        );


    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    backTop.classList.add(
                        "show"
                    );

                }

                else {

                    backTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".course-card, " +
            ".benefit, " +
            ".testimonial, " +
            ".feature-card, " +
            ".gallery-item, " +
            ".faq-item"
        );


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(
            element
        );

    });



    /* =====================================================
       IMAGE GALLERY LIGHTBOX
    ===================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-grid img, " +
            ".gallery img, " +
            ".photo-grid img"
        );


    let currentImageIndex = 0;


    if (galleryImages.length > 0) {

        /* Create lightbox */

        const lightbox =
            document.createElement(
                "div"
            );


        lightbox.id =
            "aielLightbox";


        lightbox.innerHTML = `

            <div class="aiel-lightbox-overlay">

                <button
                    class="aiel-lightbox-close"
                    aria-label="Close">
                    ×
                </button>


                <button
                    class="aiel-lightbox-prev"
                    aria-label="Previous">
                    ‹
                </button>


                <img
                    class="aiel-lightbox-image"
                    src=""
                    alt="Gallery Image"
                >


                <button
                    class="aiel-lightbox-next"
                    aria-label="Next">
                    ›
                </button>


                <div
                    class="aiel-lightbox-counter">
                </div>

            </div>

        `;


        document.body.appendChild(
            lightbox
        );


        const overlay =
            lightbox.querySelector(
                ".aiel-lightbox-overlay"
            );


        const lightboxImage =
            lightbox.querySelector(
                ".aiel-lightbox-image"
            );


        const closeButton =
            lightbox.querySelector(
                ".aiel-lightbox-close"
            );


        const prevButton =
            lightbox.querySelector(
                ".aiel-lightbox-prev"
            );


        const nextButton =
            lightbox.querySelector(
                ".aiel-lightbox-next"
            );


        const counter =
            lightbox.querySelector(
                ".aiel-lightbox-counter"
            );



        function showLightbox(index) {

            currentImageIndex =
                index;


            const image =
                galleryImages[
                    currentImageIndex
                ];


            if (!image) return;


            lightboxImage.src =
                image.src;


            lightboxImage.alt =
                image.alt ||
                "AIEL Gallery";


            counter.textContent =
                `${currentImageIndex + 1} / ${galleryImages.length}`;


            lightbox.classList.add(
                "active"
            );


            document.body.classList.add(
                "no-scroll"
            );

        }



        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "no-scroll"
            );


            lightboxImage.src = "";

        }



        function showPrevious() {

            currentImageIndex--;


            if (
                currentImageIndex < 0
            ) {

                currentImageIndex =
                    galleryImages.length - 1;

            }


            showLightbox(
                currentImageIndex
            );

        }



        function showNext() {

            currentImageIndex++;


            if (
                currentImageIndex >=
                galleryImages.length
            ) {

                currentImageIndex = 0;

            }


            showLightbox(
                currentImageIndex
            );

        }



        galleryImages.forEach(
            (image, index) => {

                image.style.cursor =
                    "zoom-in";


                image.addEventListener(
                    "click",
                    () => {

                        showLightbox(
                            index
                        );

                    }
                );

            }
        );



        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        prevButton.addEventListener(
            "click",
            showPrevious
        );


        nextButton.addEventListener(
            "click",
            showNext
        );



        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    overlay
                ) {

                    closeLightbox();

                }

            }
        );



        document.addEventListener(
            "keydown",
            event => {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {

                    return;

                }


                if (
                    event.key === "Escape"
                ) {

                    closeLightbox();

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    showPrevious();

                }


                if (
                    event.key === "ArrowRight"
                ) {

                    showNext();

                }

            }
        );

    }



    /* =====================================================
       GALLERY LIGHTBOX STYLES
    ===================================================== */

    const lightboxStyle =
        document.createElement(
            "style"
        );


    lightboxStyle.textContent = `

        #aielLightbox {

            position: fixed;

            inset: 0;

            z-index: 99999;

            display: flex;

            align-items: center;

            justify-content: center;

            opacity: 0;

            visibility: hidden;

            transition:
                opacity .3s ease,
                visibility .3s ease;

        }


        #aielLightbox.active {

            opacity: 1;

            visibility: visible;

        }


        .aiel-lightbox-overlay {

            position: absolute;

            inset: 0;

            background:
                rgba(3,10,20,.94);

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 30px;

        }


        .aiel-lightbox-image {

            max-width: 88vw;

            max-height: 82vh;

            object-fit: contain;

            border-radius: 14px;

            box-shadow:
                0 30px 100px
                rgba(0,0,0,.45);

            user-select: none;

        }


        .aiel-lightbox-close,
        .aiel-lightbox-prev,
        .aiel-lightbox-next {

            position: absolute;

            border: none;

            color: white;

            background:
                rgba(255,255,255,.12);

            width: 48px;

            height: 48px;

            border-radius: 50%;

            cursor: pointer;

            font-size: 32px;

            display: flex;

            align-items: center;

            justify-content: center;

            transition:
                background .2s ease,
                transform .2s ease;

        }


        .aiel-lightbox-close:hover,
        .aiel-lightbox-prev:hover,
        .aiel-lightbox-next:hover {

            background:
                rgba(255,255,255,.25);

            transform:
                scale(1.08);

        }


        .aiel-lightbox-close {

            top: 25px;

            right: 25px;

            font-size: 30px;

        }


        .aiel-lightbox-prev {

            left: 25px;

        }


        .aiel-lightbox-next {

            right: 25px;

        }


        .aiel-lightbox-counter {

            position: absolute;

            bottom: 22px;

            left: 50%;

            transform:
                translateX(-50%);

            color: white;

            font-size: 14px;

            background:
                rgba(0,0,0,.35);

            padding:
                7px 13px;

            border-radius: 20px;

        }


        @media (max-width:600px) {

            .aiel-lightbox-overlay {

                padding: 15px;

            }


            .aiel-lightbox-image {

                max-width: 94vw;

                max-height: 72vh;

            }


            .aiel-lightbox-close {

                top: 15px;

                right: 15px;

            }


            .aiel-lightbox-prev {

                left: 10px;

            }


            .aiel-lightbox-next {

                right: 10px;

            }


            .aiel-lightbox-close,
            .aiel-lightbox-prev,
            .aiel-lightbox-next {

                width: 42px;

                height: 42px;

            }

        }

    `;


    document.head.appendChild(
        lightboxStyle
    );

        /* =====================================================
       WHATSAPP QUICK ACTIONS
    ===================================================== */

    const whatsappLinks =
        document.querySelectorAll(
            'a[href*="wa.me"]'
        );


    whatsappLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                console.log(
                    "Opening AIEL WhatsApp..."
                );

            }
        );

    });



    /* =====================================================
       PHONE NUMBER PROTECTION
    ===================================================== */

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );


    phoneLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                console.log(
                    "Calling AIEL..."
                );

            }
        );

    });



    /* =====================================================
       EMAIL LINKS
    ===================================================== */

    const emailLinks =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );


    emailLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                console.log(
                    "Opening AIEL email..."
                );

            }
        );

    });



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );


    if (
        sections.length &&
        navigationLinks.length
    ) {

        const sectionObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        const sectionId =
                            entry.target.id;


                        navigationLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${sectionId}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    });

                },

                {
                    threshold: 0.35
                }

            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }



    /* =====================================================
       FORM PHONE INPUT
    ===================================================== */

    const phoneInput =
        document.getElementById(
            "phone"
        );


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                phoneInput.value =
                    phoneInput.value.replace(
                        /[^\d+\-\s()]/g,
                        ""
                    );

            }
        );

    }



    /* =====================================================
       PREVENT DOUBLE SUBMISSION
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            () => {

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.dataset.originalText =
                        submitButton.innerHTML;


                    submitButton.innerHTML =
                        "Opening WhatsApp...";


                    submitButton.disabled =
                        true;

                }

            }
        );

    }



    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(link => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });



    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "AIEL image could not be loaded:",
                        image.src
                    );


                    image.style.opacity =
                        "0.35";


                    image.style.filter =
                        "grayscale(1)";

                }
            );

        });



    /* =====================================================
       LAZY LOAD IMAGES
    ===================================================== */

    document
        .querySelectorAll(
            ".gallery-grid img"
        )
        .forEach(image => {

            image.loading = "lazy";

        });



    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /* Escape closes mobile menu */

            if (
                event.key === "Escape" &&
                navLinks
            ) {

                navLinks.classList.remove(
                    "active"
                );


                document.body.classList.remove(
                    "no-scroll"
                );

            }

        }
    );



    /* =====================================================
       PAGE VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                console.log(
                    "AIEL website is in background."
                );

            } else {

                console.log(
                    "Welcome back to AIEL."
                );

            }

        }
    );



    /* =====================================================
       CURRENT PAGE URL
    ===================================================== */

    const currentURL =
        window.location.href;


    console.log(
        "Current AIEL page:",
        currentURL
    );



    /* =====================================================
       WEBSITE STATUS
    ===================================================== */

    console.log(
        "AIEL website systems initialized."
    );


    console.log(
        "✓ Navigation"
    );


    console.log(
        "✓ English Assessment"
    );


    console.log(
        "✓ Vocabulary Game"
    );


    console.log(
        "✓ WhatsApp Lead System"
    );


    console.log(
        "✓ Gallery Lightbox"
    );


    console.log(
        "✓ FAQ"
    );


    console.log(
        "✓ Contact System"
    );



    /* =====================================================
       FINAL INITIALIZATION
    ===================================================== */

    document.body.classList.add(
        "aiel-ready"
    );



    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    window.addEventListener(
        "error",
        event => {

            console.warn(
                "AIEL JavaScript warning:",
                event.message
            );

        }
    );



    /* =====================================================
       FINAL MESSAGE
    ===================================================== */

    console.log(
        "%cAIEL Website Loaded Successfully 🚀",
        "font-size:16px;font-weight:bold;"
    );

});

