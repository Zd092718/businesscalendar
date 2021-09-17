const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const eventData = await Event.findAll();
    const events = eventData.map((event) => event.get({ plain: true }));

    res.render("homepage",{events, logged_in: req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);

  }
});

router.get('/Event', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const eventData = await Event.findAll();

    // // Serialize data so the template can read it
    const events = eventData.map((event) => event.get({ plain: true }));

    // res.render("homepage",{events, logged_in: req.session.logged_in});
    res.json(events)
  } catch (err) {
    res.status(500).json(err);

  }
});



router.get('/Event/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Event,
          attributes: ['name'],
        },
      ],
    });

    const project = eventData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
