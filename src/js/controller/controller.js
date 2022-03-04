"use strict"
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

//import model
import * as model from "../model/model.js";
import { TIMER_SECONDS } from "../config.js"

//import views
import messageView from "../views/messageView.js";
// import { async } from 'regenerator-runtime/runtime';



//create controls
const controlCreateMessages = async function () {
    const length = messageView.createMessages(model.data);
    let i = 0;
    const interval = setInterval(loadMessage, TIMER_SECONDS * 1000);

    function loadMessage() {
        i++;
        if (i > length - 1) clearInterval(interval);
        messageView.loadMessage()
    }
}

//init handlers
const init = () => {
    messageView.addHanderInit(controlCreateMessages);
}

init();