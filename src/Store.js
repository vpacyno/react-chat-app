import React from "react";
import io from 'socket.io-client';

export const CTX = React.createContext();


const initState = {
    General: [
        { from: 'Aron', message: 'hello' },
        { from: 'John', message: 'wow' },
        { from: 'Arnold', message: 'hi' },
    ],
    'New Users': [
        { from: 'Aron', message: 'hello there' },
        { from: 'John', message: 'hi' },
        { from: 'Arnold', message: 'hi!' },
    ],
    'Random Topic': [
        { from: 'Jonas', message: 'hahaha' },
        { from: 'Alex', message: 'Hello' },
        { from: 'Marius', message: 'thanks' },
    ],

}


function reducer(state, action) {

    const { from, message, topic } = action.payload;

    switch (action.type) {
        case 'RECEIVE MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        from: from,
                        message: message
                    }

                ]

            }

        default:
            return state
    }
}


let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}


export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io(':3001');

        socket.on('chat message', function (msg) {

            dispatch({ type: 'RECEIVE MESSAGE', payload: msg });
        });
    }

    const user = 'Josh' + Math.round((Math.random(100).toFixed(2)) * 100);

    return (
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    )
}