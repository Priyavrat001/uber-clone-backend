import {io} from "../app.js"


const sendMessageToSocketId = (socketId, message)=>{
    if(io){
        io.to(socketId).emit(message.event, message.data);
    }else{
        console.log("Socket is not connected");
    }
};

export {
    sendMessageToSocketId
}