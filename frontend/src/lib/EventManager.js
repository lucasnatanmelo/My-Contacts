// Método de criação e manipulação de objetos diferente

// Utilizando o Map()
export default class EventManager {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event).push(listener);
    }

    emit(event, payload) {
        if (!this.listeners.has(event)) {
            return;
        }

        this.listeners.get(event).forEach((listener) => {
            listener(payload);
        });
    }

    removeListener(event, listenerToRemove) {
        const listeners = this.listeners.get(event);

        if (!listeners) {
            return;
        }
        const filteredListeners = listeners.filter(
            (listener) => listener !== listenerToRemove,
        );

        this.listeners.set(event, filteredListeners);
    }
}

// const toastEventMager = new EventManager();
// console.log({ toastEventMager });

// Utilizando o object normal {}
// export default class EventManager {
//     constructor() {
//         this.listeners = {};
//     }

//     on(event, listener) {
//         if (!this.listeners[event]) {
//             this.listeners[event] = [];
//         }

//         this.listeners[event].push(listener);
//     }

//     emit(event, payload) {
//         if (!this.listeners[event]) {
//             return;
//         }

//         this.listeners[event].foEach((listener) => {
//             listener(payload);
//         });
//     }

//     removeListener(event, listenerToRemove) {
//         const listeners = this.listeners[event];

//         if (!listeners) {
//             return;
//         }
//         const filteredListeners = listeners.filter(
//             (listener) => listener !== listenerToRemove,
//         );

//         this.listeners[event] = filteredListeners;
//     }
// }

// const toastEventMager = new EventManager();
// console.log({ toastEventMager });
