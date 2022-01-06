const express = require("express");
const { route } = require("../app");
const router = express.Router();

const userController = require("../controller/users_controller")
const fileUpload = require("../controller/fileUpload");
const ownerController = require("../controller/owner_controller");
router.get("/", userController.findAllUsers);
router.post("/", userController.create);
router.get("/:id", userController.findOne);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.delete);
router.post("/upload", fileUpload.uploadFile);
router.post("/post", ownerController.create);
router.post("/", ownerController.findAllOwner);
router.put("/claim/:id", userController.claim);

module.exports = router;
