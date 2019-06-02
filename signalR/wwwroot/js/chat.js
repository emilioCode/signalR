const connection = new signalR.HubConnectionBuilder()
    .withUrl('/chatHub').build();


connection.on('ReceiveMessage', (user, message, host) => {
    if (document.getElementById('host').value === host) {
        var fecha = new Date().toLocaleTimeString();
        const msg = " <strong> " + user + ": </strong><span style='float:right;'>"+fecha+"</span> <br/>" + message;

        const li = document.createElement('li');
        li.innerHTML = msg;
        li.classList.add("list-group-item");
        document.getElementById('messageList').appendChild(li);

        document.getElementById('mailBox').scrollBy(0, 3000);
    }
    
})

connection.start().catch(err => console.error(err.toString()));

document.getElementById('sendButton').addEventListener('click', event => {
    const host = document.getElementById('host').value;
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;
    if (user != '' && message != '') {
        connection.invoke('sendMessage', user, message, host).catch(err => console.error(err));
        document.getElementById('message').value='';
    }
    
    
    event.preventDefault();

})

document.getElementById('message').addEventListener('keypress', event => {
    
    if (event.key === 'Enter') {
        const host = document.getElementById('host').value;
        const user = document.getElementById('user').value;
        const message = document.getElementById('message').value;
        if (user != '' && message != '') {
            connection.invoke('sendMessage', user, message, host).catch(err => console.error(err));
            
            document.getElementById('message').value = message.substring(0, message.length- message.length - 1);
        }
    }
    
})