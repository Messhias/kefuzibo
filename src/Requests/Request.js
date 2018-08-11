const ws = new WebSocket("wss://js-assignment.evolutiongaming.com/ws_api");
// Initialize WebSocket connection and event handlers
export function setup(message = null) {

    if (ws.onopen) {
        sendMessage(message);
    }

    // Listen for the connection open event then call the sendMessage function
    ws.onopen = function (e) {
        console.log("Connected");
        sendMessage(message);
    }

    // Listen for the close connection event
    ws.onclose = function (e) {
        console.log("Disconnected: " + e.reason);
    }

    // Listen for connection errors
    ws.onerror = function (e) {
        console.log("Error ",);
    }

    // Listen for new messages arriving at the client
    ws.onmessage = function (e) {
        const { data } = e;

        switch (JSON.parse(data)["$type"]) {
            case 'login_successful':
                localStorage.setItem('login_successful', data);
            break;

            case 'table_list':
                localStorage.removeItem('table_list');
                localStorage.setItem('table_list', data);
            break;

            case 'table_added':
                localStorage.removeItem('table_list');
                localStorage.setItem('table_list', data);
                sendMessage({
                    "$type": "subscribe_tables"
                });
            break;

            case 'table_removed':
                localStorage.removeItem('table_list');
                localStorage.setItem('table_list', data);
                sendMessage({
                    "$type": "subscribe_tables"
                });
            break;

            case 'table_updated':
                localStorage.removeItem('table_list');
                localStorage.setItem('table_list', data);
                sendMessage({
                    "$type": "subscribe_tables"
                });
            break;

            default:
                sendMessage({
                    "$type": "subscribe_tables"
                });
            break;
        }
    }
}

// Send a message on the WebSocket.
function sendMessage(message = null) {
    const msg = {
        "$type": "login",
        "username": "user1234",
        "password": "password1234"
    }
    ws.send(JSON.stringify(msg));
    if (message) {
        ws.send(JSON.stringify(message));
    }
    console.log("Message sent");
}

export default {
    setup
}
