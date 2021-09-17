let dateEl = document.querySelector('.date');
<<<<<<< HEAD
let dayEl =  document.querySelector('.day');
let monthEl =  document.querySelector('.month');
const hbs = require("Handlebars")
=======
let dayEl = document.querySelector('.day');
let monthEl = document.querySelector('.month');
let listEl = document.querySelectorAll('li');
>>>>>>> main

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

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
  });
});
document.querySelector('.event-form').addEventListener('submit', eventForm);

// Testing area for post
async function Test() {
  const headers = await fetch('/Event');
  const events = await headers.json();
  const eventData = await events.map((event) => ({
    html: `<div class='event'>
  <div class='event-desc'>
    ${event.event_name}
  </div>
</div>`,
    day_of_month: event.day_of_month,
  }));
  console.log(eventData);
  listEl.forEach((element) => {
    let cellData = element.id;
    console.log(cellData);
    for (let i = 0; i < eventData.length; i++) {
      const event = eventData[i];
      if ((event.day_of_month = element.id)) {
        element.append(event.html);
      }
    }
  });
}

Test();
