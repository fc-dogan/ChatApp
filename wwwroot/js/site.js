// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
const connection = new signalR.HubConnectionBuilder()
  .withUrl("/chatHub")
  .build();


  //send the message
  document.getElementById("sendMessage").addEventListener("click", event => {
    const user = document.getElementById("userName").value;
    const message = document.getElementById("userMessage").value;

    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
    event.preventDefault();
  });

  //receive the message
  connection.on("ReceiveMessage", (user, message) => {
    const recMsg = user + ": " + message;
    const li = document.createElement("li");
    li.textContent = recMsg;
    document.getElementById("messageList").appendChild(li);
  });

  connection.start().catch(err => console.error(err.toString()));
