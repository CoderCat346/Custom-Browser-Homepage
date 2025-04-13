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

    // Assemble time string
    const timeString = `${hours}:${minutesFormatted}:${secondsFormatted} ${period}`;

    // Update the clock element
    document.getElementById('clock-widget').textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock
updateClock();


export function initClock() {
    console.log("Clock ready") ;
  }