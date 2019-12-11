const router = require("express").Router();
let Message = require("../../models/Message");

router.post("/add", async (req, res) => {
  //   if (!req.user) {
  //     return res.json({ error: "User not logged in" });
  //   }

  let newMessage = new Message({
    from: req.body.from,
    to: req.body.to,
    text: req.body.text,
    timeStamp: req.body.timeStamp,
    id: req.body.id || new Date().getTime()
  });

  await newMessage.save((error, message) => {
    if (error) {
      return res.json({ error: "Something went wrong." });
    }
    return res.json({ message });
  });
});

router.get("/", async (req, res) => {
  await Message.find({}, (error, messages) => {
    if (error) {
      return res.json({ error: "Something went wrong." });
    }
    return res.json({ messages });
  });
});

module.exports = router;
