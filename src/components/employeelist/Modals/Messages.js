import React from "react";

function Message({mess}) {
    return ( 
        <small class="form-text font-italic text-danger">
            *{mess}
        </small>
    );
}

export default Message;