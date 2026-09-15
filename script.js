document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    setTimeout(function () {
        if (preloader) {
            preloader.classList.add("fade-out");
        }
    }, 1800);

    const header = document.querySelector(".site-header");
    if (header) {
        const toggleHeaderState = function () {
            header.classList.toggle("scrolled", window.scrollY > 20);
        };
        toggleHeaderState();
        window.addEventListener("scroll", toggleHeaderState, { passive: true });
    }

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    if (revealElements.length > 0 && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: "0px 0px -20px 0px"
        });

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("is-revealed");
        });
    }

    const registrationForm = document.querySelector("form");

    if (!registrationForm) {
        return;
    }

    registrationForm.addEventListener("submit", function (event) {
        let isValid = true;
        let firstInvalidInput = null;

        registrationForm.querySelectorAll(".field-invalid").forEach(function (el) {
            el.classList.remove("field-invalid");
        });

        const emailInput = registrationForm.querySelector("input[type='email']");
        if (emailInput && emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                emailInput.classList.add("field-invalid");
                if (!firstInvalidInput) firstInvalidInput = emailInput;
            }
        }

        const phoneInput = registrationForm.querySelector("input[name='phone']");
        if (phoneInput && phoneInput.value.trim()) {
            const dzPhoneRegex = /^0(5|6|7)[0-9]{8}$/;
            if (!dzPhoneRegex.test(phoneInput.value.trim())) {
                isValid = false;
                phoneInput.classList.add("field-invalid");
                if (!firstInvalidInput) firstInvalidInput = phoneInput;
            }
        }

        const requiredInputs = registrationForm.querySelectorAll("input[required], select[required]");
        requiredInputs.forEach(function (input) {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add("field-invalid");
                if (!firstInvalidInput) firstInvalidInput = input;
            }
        });

        if (!isValid) {
            event.preventDefault();
            alert("Please provide a valid email and a correct Algerian phone number (05/06/07XXXXXXXX).");
            if (firstInvalidInput) {
                firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });
});
document.getElementById('add-question-btn').addEventListener('click', function() {
    const container = document.getElementById('custom-questions-container');
    const index = container.getElementsByClassName('custom-question-item').length;
    
    const newItem = document.createElement('div');
    newItem.className = 'custom-question-item';
    newItem.style.cssText = 'border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;';
    newItem.innerHTML = `
        <div>
            <label>Question Prompt:</label><br>
            <input type="text" name="custom_questions[${index}][prompt]">
        </div>
        <br>
        <div>
            <label>Input Type:</label><br>
            <select name="custom_questions[${index}][type]">
                <option value="text">Fill in Text Field</option>
                <option value="yes_no">Yes / No Radio</option>
                <option value="select">Select Choice (Dropdown)</option>
            </select>
        </div>
        <br>
        <div>
            <label>Options (Comma separated for Select Choice):</label><br>
            <input type="text" name="custom_questions[${index}][options]" placeholder="Option 1, Option 2, Option 3">
        </div>
    `;
    container.appendChild(newItem);
});
