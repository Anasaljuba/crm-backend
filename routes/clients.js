const express = require("express");
const router = express.Router();
const ClientsController = require("../controllers/clientsController");
const { authenticate, authorize } = require("../middleware/auth"); // Make sure this path is correct
const { addCustomColumn } = require("../controllers/clientsController");

router.get("/", ClientsController.getAllClients);
router.post("/", ClientsController.createClient);
router.get("/:id", ClientsController.getClientById);
router.put("/:id", ClientsController.updateClient);
router.delete("/:id", ClientsController.deleteClient);
router.get("/search/:query", ClientsController.searchClients);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  ClientsController.deleteClient
);
// Import the new function from the clientsController

// Create the new route
router.post(
  "/custom-column",
  //   authenticate,
  //   authorize(["admin"]),
  addCustomColumn
);

module.exports = router;
