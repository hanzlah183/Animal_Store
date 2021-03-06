const express = require('express');
const {
  getAnimals,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal
} = require('../controllers/animal');


const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getAnimals)

  .post(protect, authorize("admin"), createAnimal);

router
  .route("/:id")
  .get(protect, authorize("admin"), getAnimal)
  .put(protect, authorize("admin"),updateAnimal)
  .delete(protect, authorize("admin"),deleteAnimal);

module.exports = router;
