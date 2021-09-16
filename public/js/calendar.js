


let dateEl = document.querySelector('.date');
let dayEl =  document.querySelector('.day');
let monthEl =  document.querySelector('.month');


async function startTime() {
    var now = moment();
    var month = moment(now).month() + 1; // month is zero indexed
    var year = now.year();
    var startOfMonth = moment(now).startOf('month');
    var endOfMonth = moment(now).endOf('month');
    console.log(startOfMonth)
    console.log(endOfMonth)
    monthEl.append(now.format("MMMM YYYY"));
    
}


startTime();