import EventManager from '../../lib/EventManager';

export const toastEventMager = new EventManager();

export default function toast({ type, text }) {
    toastEventMager.emit('addtoast', { type, text });
}
