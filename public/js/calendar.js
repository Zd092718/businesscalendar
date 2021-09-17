let dateEl = document.querySelector('.date');
let dayEl = document.querySelector('.day');
let monthEl = document.querySelector('.month');
let listEl = document.querySelectorAll('li');

async function startTime() {
    var now = moment();
    var month = moment(now).month() + 1; // month is zero indexed
    var year = now.year();
    var startOfMonth = moment(now).startOf('month');
    var endOfMonth = moment(now).endOf('month');
  // console.log(startOfMonth);
  // console.log(endOfMonth);
    monthEl.append(now.format('MMMM YYYY'));
}

startTime(); 


const eventForm = async (e) => {
    e.preventDefault();
    const date = document.querySelector('#date').value.trim();
    const event = document.querySelector('#input_text').value.trim();
    if (date && event) {
        console.log(event, date);
        const res = await fetch('/api/calendar/event', {
        method: 'POST',
        body: JSON.stringify({
            day_of_month: moment(date).date(),
            event_name: event,
        }),
        headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
        document.location.replace('/');
        } else {
        alert('Failed to add event');
        }
    }
    const headers = await fetch('/Event');
    const events = await headers.json();
    console.log(events);
};
const deleteEvent = async (event) => {
    event.preventDefault();


    console.log(event.target)
    console.log(event.target.name)
    if (event.target.hasAttribute('name')) {
        const id = event.target.getAttribute('name');
        console.log(id)
        const response = await fetch(`/api/calendar/event/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete project');
        }
    }

};
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left',
    });
});
document.querySelector('#event-form').addEventListener('submit', eventForm);
document.querySelector('#delete-form').addEventListener('click', deleteEvent);

// New post
async function postNew() {
    const headers = await fetch('/Event');
    const events = await headers.json();
    const eventData = await events.map((event) => ({
        html: `<div class='date'>${event.day_of_month}</div>
        <div class='event'>
        <div class='event-desc'>
            ${event.event_name}
        </div>
        </div>`,
        day_of_month: event.day_of_month,
    }));
    listEl.forEach((element) => {
        let cellData = element.id;
        for (let i = 0; i < eventData.length; i++) {
        const event = eventData[i];
        if (event.day_of_month == cellData) {
            element.innerHTML = event.html;
        }
        }
    });
}

postNew();
