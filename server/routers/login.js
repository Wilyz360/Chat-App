const express = require("express");
const db = require("../database/db");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
  if (!(req.body.email && req.body.password)) {
    console.log("Missing input fields");
    res.status(400).json({ accepted: false, message: "Missing input fields" });
  } else {
    const user = req.body;
    //console.log(db.authUser(user));
    //const existUser = db.findUserByEmail(user.email); // return user if exist
    // const match = await bcrypt.compare(user.password, existUser.encPassword); // compare client user password and db user password

    db.authUser(user).then((result) => {
      if (result) {
        console.log("User authorized");
        res.status(200).json({ accepted: true, message: "User authorized" });
      } else {
        res
          .status(401)
          .json({ accepted: false, message: "Incorrect credentials" });
      }
    });

    // if (match) {
    //   console.log("User authorized");
    //   res.status(200).json({ accepted: true, message: "User authorized" });
    // } else {
    //   res
    //     .status(401)
    //     .json({ accepted: false, message: "Incorrect credentials" });
    // }
  }
});

module.exports = router;
