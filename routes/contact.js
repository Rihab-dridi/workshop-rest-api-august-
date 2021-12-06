const express = require("express");
const router = express.Router();
let Contacts = require("../models/Contacts");
//CRUD
//Create
//read
//update
//delete

// @role: testing
//url:http://localhost:5000/api/contact/test
router.get("/test", (req, res) => {
  res.send(`it's working?? `);
});

//Create
// @role: create data
//url:http://localhost:5000/api/contact/add
router.post("/add", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = new Contacts({ name, email, phone });
    const contact = await newContact.save();
    res
      .status(200)
      .json({ msg: ` ${name} has been added to your contacts`, contact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//READ
// @role: read all the  data
//url:http://localhost:5000/api/contact/all
router.get("/all", async (req, res) => {
  try {
    const contacts = await Contacts.find();
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//Update
// @role: update data
//url:http://localhost:5000/api/contact/edit/:id
router.put("/edit/:id", async (req, res) => {
  const ID = req.params.id; //reading the value of the id from the url
  try {
    const contact = await Contacts.findByIdAndUpdate(ID, { $set: req.body }); // find the element and update it
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//Delete
// @role: delete data
//url:http://localhost:5000/api/contact/delete/:id

router.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const contact = await Contacts.findByIdAndDelete(ID);
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
