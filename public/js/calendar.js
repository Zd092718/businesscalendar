


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
// const eventForm = () => {
//     const date = document.querySelector("#date").value.trim();
//     const event = document.querySelector("#input_text").value.trim();
//     console.log(event,date)
// }

startTime();

const eventForm = async (e) => {
    e.preventDefault();
    const date = document.querySelector("#date").value.trim();
    const event = document.querySelector("#input_text").value.trim();
    if(date&&event){
        console.log(event,date)
        const res = await fetch ('/api/calendar/event',{
            method: "POST",
            body: JSON.stringify({day_of_month:moment(date).date(), event_name:event}),
            headers: { 'Content-Type': 'application/json' },
        });
        if(res.ok){
            document.location.replace('/');
        }
        else{
            alert('Failed to add event');
        }
    }
} 
document
    .querySelector('.event-form')
    .addEventListener('submit', eventForm);