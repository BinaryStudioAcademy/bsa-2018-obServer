const apiResponse = require("express-api-response"),
  userService = require("../../services/userService"),
  passport = require("passport");

module.exports = app => {
  app.get(
    "/user",
    async (req, res, next) => {
      try {
        const data = await userService.findAll();
        res.data = data;
        res.err = null;
      } catch (err) {
        res.data = null;
        res.err = err;
      } finally {
        next();
      }
    },
    apiResponse
  );

  app.post(
    "/user",
    async (req, res, next) => {
      try {
        const data = await userService.create(req.body);
        res.data = data;
        res.err = null;
      } catch (err) {
        res.data = null;
        res.err = err;
      } finally {
        next();
      }
    },
    apiResponse
  );

  app.delete(
    "/user/:id",
    async (req, res, next) => {
      try {
        const data = await userService.delete(req.params.id);
        res.data = data;
        res.err = null;
      } catch (err) {
        res.data = null;
        res.err = err;
      } finally {
        next();
      }
    },
    apiResponse
  );

  app.patch(
    "/user/:id",
    async (req, res, next) => {
      try {
        const data = await userService.update(req.params.id, req.body);
        res.data = data;
        res.err = null;
      } catch (err) {
        res.data = null;
        res.err = err;
      } finally {
        next();
      }
    },
    apiResponse
  );

  app.post(
    "/signin",
    (req, res, next) => {
      try {
        passport.authenticate("local.signin", (req, res, next) => {
          //send SOME data to client
        });
      } catch (err) {
        res.data = null;
        res.err = err;
      } finally {
        next();
      }
    },
    apiResponse
  );

  app.post(
    "/signup",
    (req, res, next) => {
      try {
        passport.authenticate("local.signup", (req, res, next) => {
          //send SOME data to client
        });
      } catch (err) {
        res.data = null;
        res.err = err;
      } finally {
        next();
      }
    },
    apiResponse
  );

  //FOR TEST USER OPERATIONS
  app.get(
    "/user/:id",
    async (req, res, next) => {
      try {
        const data = await userService.findById(req.params.id);
        res.data = data;
        res.err = null;
      } catch (err) {
        res.data = null;
        res.err = err;
      } finally {
        next();
      }
    },
    apiResponse
  );
};
