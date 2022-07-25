import EventManager from '../../lib/EventManager';

export const toastEventMager = new EventManager();

export default function toast({ type, text, duration }) {
    toastEventMager.emit('addtoast', { type, text, duration });
}
