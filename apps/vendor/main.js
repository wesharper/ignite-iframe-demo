const successButton = document.querySelector("#success");
const failureButton = document.querySelector("#failure");

successButton.addEventListener("click", () => {
  // this message is posted to the iframe parent's window if and only if the parent is running on domain "http://localhost:3000"
  // there is nothing that stops us from posting any number of messages to any number of domains
  // if the vendor will always host their form on the same domain, just have them post the same message to each one of your domains
  window.parent.postMessage("success", "http://localhost:3000");
});

failureButton.addEventListener("click", () => {
  window.parent.postMessage("failure", "http://localhost:3000");
});
