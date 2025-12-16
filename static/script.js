let slideIndex = 1;
let autoSlideTimer;

document.addEventListener('DOMContentLoaded', function() {
    showSlide(slideIndex);
    startAutoSlide();
    // displayCalendar();
});

function changeSlide(n) {
    clearTimeout(autoSlideTimer);
    showSlide(slideIndex += n);
    startAutoSlide();
}

function currentSlide(n) {
    clearTimeout(autoSlideTimer);
    showSlide(slideIndex = n);
    startAutoSlide();
}

function showSlide(n) {
    const slides = document.getElementsByClassName('carousel-slide');
    const dots = document.getElementsByClassName('dot');
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    slides[slideIndex - 1].classList.add('active');
}

function startAutoSlide() {
    autoSlideTimer = setTimeout(function() {
        slideIndex++;
        showSlide(slideIndex);
        startAutoSlide();
    }, 5000); // Change slide every 5 seconds
}

// Calendar functionality
// let currentDate = new Date();

// function displayCalendar() {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     // Update header
//     const monthNames = [
//         'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
//         'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
//     ];
//     document.getElementById('monthYear').textContent = monthNames[month] + ' ' + year;
    
//     // Get first day of month and number of days
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const daysInPrevMonth = new Date(year, month, 0).getDate();
    
//     let calendarDays = '';
    
//     // Days from previous month
//     for (let i = firstDay - 1; i >= 0; i--) {
//         calendarDays += `<div class="calendar-day other-month">${daysInPrevMonth - i}</div>`;
//     }
    
//     // Days of current month
//     const today = new Date();
//     for (let day = 1; day <= daysInMonth; day++) {
//         const isToday = day === today.getDate() && 
//                        month === today.getMonth() && 
//                        year === today.getFullYear();
//         const classNames = isToday ? 'calendar-day today' : 'calendar-day';
//         calendarDays += `<div class="${classNames}" onclick="selectDate(this, ${day})">${day}</div>`;
//     }
    
//     // Days from next month
//     const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
//     for (let day = 1; day <= totalCells - firstDay - daysInMonth; day++) {
//         calendarDays += `<div class="calendar-day other-month">${day}</div>`;
//     }
    
//     document.getElementById('calendarDays').innerHTML = calendarDays;
// }

// function previousMonth() {
//     currentDate.setMonth(currentDate.getMonth() - 1);
//     displayCalendar();
// }

// function nextMonth() {
//     currentDate.setMonth(currentDate.getMonth() + 1);
//     displayCalendar();
// }

// function selectDate(element, day) {
//     // Remove previous selection
//     const previousSelected = document.querySelector('.calendar-day.selected');
//     if (previousSelected) {
//         previousSelected.classList.remove('selected');
//     }
    
//     // Add new selection
//     element.classList.add('selected');
// }
