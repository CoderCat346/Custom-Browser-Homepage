function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes and seconds to always show two digits
    const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
    const secondsFormatted = seconds < 10 ? '0' + seconds : seconds;

    // Format time string
    const timeString = `${hours}:${minutesFormatted}:${secondsFormatted} ${period}`;

    // Format date string
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);

    // Update the clock and date elements
    document.getElementById('clock-widget').textContent = timeString;
    document.getElementById('date-widget').textContent = dateString;
}

// Update every second
setInterval(updateClock, 1000);

// Initialize immediately
updateClock();

export function initClock() {
    console.log("Clock ready");
}

