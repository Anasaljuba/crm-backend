const express = require("express");
const router = express.Router();
const TicketsController = require("../controllers/ticketsController");

router.get("/", TicketsController.getAllTickets);
router.post("/", TicketsController.createTicket);
router.get("/:id", TicketsController.getTicketById);
router.put("/:id", TicketsController.updateTicket);
router.delete("/:id", TicketsController.deleteTicket);
router.get("/search/:query", TicketsController.searchTickets);

module.exports = router;
