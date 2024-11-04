const express = require("express");
const router = new express.Router();
const controller = require("../controllers/messages.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.post("/send", controller.postMessagesSend);

router.get("/:thread_id", controller.getMessagesByThreadId);

router.delete("/:thread_id", controller.deleteMessagesByThreadId);

router.patch("/:thread_id", controller.patchMessagesByThreadId);

router.get("/history/:admin_id", controller.getMessagesHistoryByAdminId);

router.post("/reply/:thread_id", controller.postMessagesReplyByThreadId);

router.use(handleError);

module.exports = router;
