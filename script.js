const themes = [
                {theme: 'dark', priClr: '#1e2022', secClr: '#333539'},
                {theme: 'light', priClr: '#fff', secClr: '#93c5fd'},
            ]
    
            let themeIndex = 0;
    
            const themesDOM = document.querySelector('.themes');
    
            const redirectBtn = document.getElementById('redirectTo');
    
            const componentID = '66aae2abcee507776b3673ba';
    
            let baseURL = `https://we-code.dev/components/component?id=${componentID}`;
    
            const themeEvent = (targetEle) => {
                const targetElement = targetEle.target;
    
                const targetEleIndex = Array.from(document.querySelectorAll('.themes ul li')).indexOf(targetElement);
    
                const switchThemeTo = targetElement.getAttribute('data-theme');
    
                const parentElement = targetElement.closest('ul');
    
                const {x: parentX} = parentElement.getBoundingClientRect();
                const {x: targetX} = targetElement.getBoundingClientRect();
    
                const fromX = `${targetX - parentX}px`;
    
                parentElement.style.setProperty('--posX', fromX);
    
                const containerEle = document.querySelector('.container');
    
                baseURL = `${baseURL.split('&')[0]}&theme=${switchThemeTo}`;
    
                containerEle.setAttribute('data-theme', switchThemeTo);
    
                const {priClr, secClr} = themes[targetEleIndex];
    
                containerEle.style.setProperty('--matchBg', `linear-gradient(to bottom right, ${priClr}, ${secClr})`)
            }
    
            const renderThemes = () => {
                const ulEle = document.createElement('ul');
    
                themes.forEach(themeData => {
    
                    const {theme, priClr, secClr} = themeData;
    
                    const liEle = document.createElement('li');
    
                    liEle.style.background = `linear-gradient(to bottom right, ${priClr} 50%, ${secClr} 50%)`;
    
                    liEle.setAttribute('data-theme', theme);
    
                    liEle.addEventListener('click', themeEvent);
    
                    ulEle.appendChild(liEle);
                });
    
                themesDOM.appendChild(ulEle);
            }
    
            redirectBtn.addEventListener('click', () => window.open( baseURL, "_blank" ));
    
            renderThemes();


document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.querySelector(".calendar");

    const calendarInput = document.getElementById("calendar-trigger");

    let calendarOpen = false;

    const dateObj = new Date();

    const actualDMY = {
        date: dateObj.getDate(),
        month: dateObj.getMonth(),
        year: dateObj.getFullYear(),
    };

    let month = dateObj.getMonth();

    let year = dateObj.getFullYear();

    let date = dateObj.getDate();

    const monthsArr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const calendarInputDate = document.querySelector(
        ".calendar-input-date"
    );

    const calendarInputMonth = document.querySelector(
        ".calendar-input-month"
    );

    const calendarInputYear = document.querySelector(
        ".calendar-input-year"
    );

    const updateCalendarInput = (d, m, y) => {
        calendarInputDate.textContent = d;
        calendarInputMonth.textContent = monthsArr[m];
        calendarInputYear.textContent = y;
    };

    updateCalendarInput(date, month, year);

    const calendarBodyEvent = (event) => {
        if (event.animationName == "close-calendar") {
            document.querySelector(".calendar-body").remove();

            calendar.setAttribute("data-state", "close");
        }
    };

    const adjustDay = (day) => (day + 6) % 7;

    const renderCalendarMonth = (parent) => {
        const liEle = document.createElement("li");

        const monthYearTxt = `${monthsArr[month]} - ${year}`;

        monthYearTxt.split("").forEach((letter, index) => {
            const spanEle = document.createElement("span");
            spanEle.textContent = letter;
            spanEle.style.setProperty("--animDelay", `${(index + 1) * 0.1}s`);
            liEle.appendChild(spanEle);
        });

        parent.appendChild(liEle);
    };

    const renderCalendarDates = (parent) => {
        //Empty boxes before month
        const daysBeforeMonth = adjustDay(new Date(year, month, 1).getDay());

        // Getting number of days in month
        const datesInMonth = new Date(year, month + 1, 0).getDate();

        // Getting number of days in previous month
        const datesInPrevMonth = new Date(year, month, 0).getDate();

        //Empty boxes after month
        const daysAfterMonth =
            6 - adjustDay(new Date(year, month + 1, 0).getDay());

        const noOfLi = datesInMonth + daysBeforeMonth + daysAfterMonth;

        const delay = 0.035;

        for (let index = 0; index < noOfLi; index++) {
            const liEle = document.createElement("li");

            const dateToBeRendered = index + 1 - daysBeforeMonth;

            if (index < daysBeforeMonth) {
                liEle.textContent =
                    datesInPrevMonth - (daysBeforeMonth - index - 1);
                liEle.classList.add("dummy");
            } else if (dateToBeRendered > datesInMonth) {
                liEle.textContent = dateToBeRendered - datesInMonth;
                liEle.classList.add("dummy");
            } else {
                liEle.textContent = dateToBeRendered;
            }

            if (
                date == dateToBeRendered &&
                date == actualDMY.date &&
                month == actualDMY.month &&
                year == actualDMY.year
            ) {
                liEle.classList.add("today");
            }

            liEle.style.setProperty(
                "--animationDelayForwards",
                `${index * delay + 0.3}s`
            );
            liEle.style.setProperty(
                "--animationDelayBackwards",
                `${(noOfLi - index + 0.15) * delay}s`
            );

            parent.appendChild(liEle);
        }
    };

    const navigateMonth = (bool) => {
        // Go to next month
        if (bool) {
            month = month < 11 ? month + 1 : 0;

            if (month === 0) year += 1;
        }
        // Go to previous month
        else {
            month = month > 0 ? month - 1 : 11;

            if (month === 11) year -= 1;
        }

        const calendarBody = document.querySelector(".calendar-body");

        const datesParentUL = document.querySelectorAll(
            ".calendar-body-cnts ul"
        )[1];

        calendarBody.setAttribute("data-state", "navigate");

        const monthParentUL = document.querySelector(
            ".calendar-body-header div ul"
        );

        calendarBody.addEventListener(
            "animationend",
            (event) => {
                datesParentUL.innerHTML = "";
                monthParentUL.innerHTML = "";

                calendarBody.removeAttribute("data-state");

                renderCalendarMonth(monthParentUL);

                renderCalendarDates(datesParentUL);
            },
            { once: true }
        );
    };

    const renderCalendar = () => {
        const calendarTemplate =
            document.getElementById("calendar-body-temp");

        const calendarContent = calendarTemplate.content.cloneNode(true);

        const calendarHeaderUL = calendarContent.querySelector(
            ".calendar-body-header div ul"
        );

        const calendarDays = calendarContent.querySelectorAll(
            ".calendar-body-cnts ul"
        )[1];

        renderCalendarMonth(calendarHeaderUL);

        renderCalendarDates(calendarDays);

        calendarDays.addEventListener("click", (event) => {
            if (event.target.tagName == "LI") {
                const liTxt = +event.target.textContent;

                updateCalendarInput(liTxt, month, year);

                calendar.setAttribute("data-state", "closing");
            }
        });

        const prevBtn = calendarContent.getElementById("prev-btn");
        const nxtBtn = calendarContent.getElementById("nxt-btn");

        prevBtn.addEventListener("click", () => navigateMonth(false));
        nxtBtn.addEventListener("click", () => navigateMonth(true));

        const calendarBody = calendarContent.querySelector(".calendar-body");
        calendarBody.addEventListener("animationend", calendarBodyEvent);

        calendar.appendChild(calendarContent);
    };

    const showHideCalendar = (bool) => {
        if (bool) {
            renderCalendar();
        }

        calendar.setAttribute("data-state", bool ? "open" : "closing");
    };

    calendarInput.addEventListener("click", () => {
        calendarOpen = !calendarOpen;

        showHideCalendar(calendarOpen);
    });
});
