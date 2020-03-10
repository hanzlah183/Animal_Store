const asyncHandler = require("../middleware/async");
const Animal = require("../models/animal");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all animals
// @route     GET /api/v1/animals
// @access    Public
exports.getAnimals = asyncHandler(async (req, res, next) => {
  const animal = await Animal.find();
  res.status(200).json({ success: true, data: animal });
});

// @desc      Create new animals
// @route     POST /api/v1/animals
// @access    Private
exports.createAnimal = asyncHandler(async (req, res, next) => {
  let animal = await Animal.findOne(req.body);

  if (animal) {
    return next(new ErrorResponse("Animal already added"));
  }

  animal = await Animal.create(req.body);

  res.status(201).json({
    success: true,
    data: animal
  });
});

// @desc      Update animals
// @route     PUT /api/v1/animals/:id
// @access    Private
exports.updateAnimal = asyncHandler(async (req, res, next) => {
  let animal = await Animal.findById(req.params.id);

  if (!animal) {
    return next(
      new ErrorResponse(`Animal not found with id of ${req.params.id} `, 404)
    );
  }

  animal = await Animal.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: animal });
});

// @desc      Delete animals
// @route     DELETE /api/v1/animals/:id
// @access    Private
exports.deleteAnimal = asyncHandler(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    return next(
      new ErrorResponse(`Animal not found with id of ${req.params.id}`, 404)
    );
  }

  animal.remove();

  res.status(200).json({ success: true, data: "animal deleted" });
});
