const express = require('express');

const router = express.Router();

const db = require('../data/dbConfig')


router.get("/", (req, res) => {
    // get the data from the db
    // select * from posts;
    db.select("*")
      .from("accounts") // returns a promise
      .then(rows => {
        res.status(200).json({ data: rows });
      })
      .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
  });
  
  router.get("/:id", (req, res) => {
    db("accounts")
      // .where("id", "=", req.params.id)
      .where({ id: req.params.id })
      .first()
      .then(post => {
        if (post) {
          res.status(200).json({ data: post });
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
  });
  
  router.post("/", (req, res) => {
    db("accounts")
      .insert(req.body, "id")
      .then(ids => {
        res.status(201).json({ results: ids });
      })
      .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
  });
  
  router.put("/:id", (req, res) => {
    const changes = req.body;
  
    db("accounts")
      .where({ id: req.params.id })
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "record updated successfully" });
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
  });
  
  router.delete("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .del() // delete the records
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "record deleted successfully" });
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
  });

  module.exports = router;