const router = require('express').Router();
const { Event } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/event', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const events = eventData.map((event) => event.get({ plain: true }));
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/event', withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/event/:id', withAuth, async (req, res) => {
  try {
    const EventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(EventData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/event/:id', withAuth, async (req, res) => {
  try {
    const EventData = await Event.update( req.body,
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    res.status(200).json(EventData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
