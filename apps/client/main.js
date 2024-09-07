window.addEventListener("message", ({ origin, data }) => {
  // bail out if the message isn't coming from a trusted URL
  if (origin !== "http://localhost:3001") {
    return;
  }

  if (data === "success") {
    window.alert("You did it! Here's some putt-putt!");
  }

  if (data === "failure") {
    window.alert("No putt-putt for you!");
  }
});
