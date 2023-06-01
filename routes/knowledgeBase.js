const express = require("express");
const router = express.Router();
const KnowledgeBaseController = require("../controllers/knowledgeBaseController");

router.get("/", KnowledgeBaseController.getAllKnowledgeBasePages);
router.post("/", KnowledgeBaseController.createKnowledgeBasePage);
router.get("/:id", KnowledgeBaseController.getKnowledgeBasePageById);
router.put("/:id", KnowledgeBaseController.updateKnowledgeBasePage);
router.delete("/:id", KnowledgeBaseController.deleteKnowledgeBasePage);

module.exports = router;
