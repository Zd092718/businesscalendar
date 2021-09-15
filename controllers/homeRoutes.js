const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/',  (req, res) => {
  try {
    //Get all projects and JOIN with user data
    // const projectData = await Event.findAll({
    //   include: [
    //     {
    //       model: Event,
    //       attributes: ['id'],
    //     },
    //   ],
    // });

    //Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    // res.render('homepage',{ projects });
    res.render("homepage");
  } catch (err) {
    res.status(500).json("500 error");

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
router.get('/calendar', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
