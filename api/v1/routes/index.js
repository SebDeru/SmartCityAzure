const router = require("express").Router();

const EventsRouter = require('./events');
const EventRouter = require('./event');
const MembersRouter = require('./members');
const MemberRouter = require('./member');
const CategoriesRouter = require('./categories');
const LocationsRouter = require('./locations.js');
const UserRouter = require('./user');
const ManagerRouter = require('./manager');
const ParticipationRouter = require('./participation');

router.use("/events", EventsRouter);
router.use("/event", EventRouter);
router.use("/members", MembersRouter);
router.use("/member", MemberRouter);
router.use("/categories", CategoriesRouter);
router.use("/locations", LocationsRouter);
router.use("/user", UserRouter);
router.use("/manager", ManagerRouter);
router.use("/participation", ParticipationRouter);

module.exports = router;