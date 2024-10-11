let day = document.getElementById("dates");
let month = document.getElementById("month");
let selectMonth = document.getElementById("selectMonth");
let selectYear = document.getElementById("selectYear");
let year = document.getElementById("year");
let week = document.getElementById("week");
let next = document.getElementById("nextBtn");
let prev = document.getElementById("prevBtn");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthAndDays = [[0, 31], [1, 28], [2, 31], [3, 30], [4, 31], [5, 30], [6, 31], [7, 31], [8, 30], [9, 31], [10, 30], [11, 31]];

let date = new Date();
weekDays.forEach(days => {
    week.innerHTML += `<div class="weekDays"><h4>${days.slice(0, 3)}</h4></div>`;
})

let createMonths = () => {
    months.forEach(((value, index) => {
        date.getMonth() == index ? selectMonth.innerHTML += `<option value="${value}" selected>${value}</option>` : selectMonth.innerHTML += `<option value="${value}">${value}</option>`;
    }))
}

createMonths();

for (i = 1900; i < 2200; i++) {
    date.getFullYear() == i ? selectYear.innerHTML += `<option value="${i}" selected>${i}</option>` : selectYear.innerHTML += `<option value="${i}">${i}</option>`;
}


let setCurrentDate = () => {
    let findDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let emptyDates = findDay.getDay();
    let PrevMonth = date.getMonth() - 1 == -1 ? 11 : date.getMonth() - 1;
    let totalDays, PrevMonthDays, NextMonthDays;
    monthAndDays.forEach(values => {
        let [month, days] = values;
        if (month == date.getMonth()) {
            totalDays = days;
        }
        if (month == PrevMonth) {
            PrevMonthDays = days;
        }
    });
    day.innerHTML = "";
    NextMonthDays = 42 - (totalDays + emptyDates);
    PrevMonthDays -= emptyDates;
    for (let i = 1; i <= emptyDates; i++) {
        PrevMonthDays += 1;
        day.innerHTML += `<div class="emptyDays"><h4>${PrevMonthDays}</h4></div>`;
    }
    for (let i = 1; i <= totalDays; i++) {
        let newDate = new Date();
        let today = (newDate.getDate() == i && newDate.getMonth() == date.getMonth() && newDate.getFullYear() == date.getFullYear());
        day.innerHTML += today ? `<div class="currentDate"><h4>${i}</h4></div>`:`<div class="days"><h4>${i}</h4></div>`;
    }
    for (let i = 1; i <= NextMonthDays; i++) {
        day.innerHTML += `<div class="emptyDays"><h4>${i}</h4></div>`;
    }
}

selectMonth.onchange = (event) => {
    for (let monthNumber in months) {
        if (months[monthNumber] == event.target.value) {
            date.setMonth(monthNumber);
            break;
        }
    }
    setCurrentDate();
}

selectYear.onchange = (event) => {
    date.setFullYear(event.target.value);
    setCurrentDate();
}

setCurrentDate();

let updateNextMonth = () => {
    let updateYear = date.getMonth() + 1 == 12 ? selectYear.value = date.getFullYear() + 1 : selectYear;
    let NextMonth = date.getMonth() + 1;
    NextMonth == 12 ? date.setFullYear(date.getFullYear() + 1) : date.setMonth(date.getMonth() + 1);
    NextMonth = NextMonth == 12 ? 0 : NextMonth;
    selectMonth.value = months[NextMonth];
}

let updatePrevMonth = () => {
    let updateYear = date.getMonth() - 1 == -1 ? selectYear.value -= get : selectYear;
    let PrevMonth = date.getMonth() - 1 == -1 ? 11 : date.getMonth() - 1;
    selectMonth.value = months[PrevMonth];
}

next.addEventListener("click", () => {
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    if(currentMonth == 11){
        date.setFullYear(currentYear+1);
        selectYear.value = currentYear+1;
        date.setMonth(0);
        selectMonth.value = months[0];
        setCurrentDate();
    }
    else{
        date.setMonth(currentMonth+1);
        selectMonth.value = months[currentMonth+1];
        setCurrentDate();
    }
})
prev.addEventListener("click", () => {
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    if(currentMonth == 0){
        date.setFullYear(currentYear-1);
        selectYear.value = currentYear-1;
        date.setMonth(11);
        selectMonth.value = months[11];
        setCurrentDate();
    }
    else{
        currentMonth -= 1
        date.setMonth(currentMonth);
        selectMonth.value = months[currentMonth];
        setCurrentDate();
    }
})
