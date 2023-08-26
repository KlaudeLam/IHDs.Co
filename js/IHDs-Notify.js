// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

var pusher = new Pusher("1548eaf3f1a3cf6520ca", {
  cluster: "ap1",
});

var channel = pusher.subscribe("my-channel");
channel.bind("my-event", function (data) {
  Toastify({
    text: data.title,
    duration: 3000,
    style: {
      background: "rgb(252, 232, 57)",
      color: "rgb(0, 0, 0)",
    },
  }).showToast();
});

const obj = {
  appId: "1655286",
  key: "1548eaf3f1a3cf6520ca",
  secret: "9eeda596d39c688d9812",
  cluster: "ap1",
};
var trigger = new Pusher("1548eaf3f1a3cf6520ca", obj);
trigger.trigger("my-channel", "my-event", { "message": "hello world" });
