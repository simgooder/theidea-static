document.addEventListener('DOMContentLoaded', function () {

    var localStorage = window.localStorage;

    // Local Storage Helpers
    setLocalStore = function (key, val) {
        if (localStorage) {
            localStorage.setItem(key, val);
        }
    }

    getLocalStore = function (val) {
        if (localStorage) {
            return localStorage.getItem(val);
        }
    }

    // track if user has engaged in conversation...
    setLocalStore('idea.chatEngaged', false);

    // CTA Buttons...
    var msgBtn = document.querySelectorAll('[data-trigger-messenger]');

    for (var i = 0; msgBtn.length > i; i++) {
        msgBtn[i].addEventListener('click', function (e) {

            setLocalStore('idea.chatEngaged', true);

            // Get the attr value (if there is one)
            var msg = this.getAttribute('data-trigger-messenger');

            if ( $crisp != undefined && msg != "" ) {
                // Open the chat widget and send a message
                $crisp.push(['do', 'chat:open']);
                $crisp.push(["do", "message:show", ["text", msg]])
                setLocalStore('idea.chatEngaged', true);

            } else if ( $crisp != undefined && msg == "" ) {
                // Just open the chat widget
                $crisp.push(['do', 'chat:open']);
            }

        });
    }

    // Check to make sure the user hasn't previously engaged in the chat, 
    //   then prompt them to chat with a little message...
    promptUser = function() {
        if ( getLocalStore('idea.chatEngaged') === false ) {
            
            // If the user hasn't previously engaged, then send them a message!
            msg = "Is there anything I can help you with?";
            $crisp.push(["do", "message:show", ["text", msg]]);
            // Then set the idea.chatEngaged to true!
            setLocalStore('idea.chatEngaged', true);

        } else {
            //return;
        }
    }   

    setTimeout(promptUser, 30000)

}, false);