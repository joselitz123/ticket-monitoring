import { schema } from 'normalizr';

const id_attribute = '_id';

const notifs = new schema.Entity('notifications', {}, { idAttribute: 'notif_id' });

const ticket_details = new schema.Entity('ticket_details', {}, { idAttribute: id_attribute });

export const tickets = new schema.Entity('tickets', {
    notifications: [notifs],
    ticket_details: ticket_details
}, {
        idAttribute: id_attribute
    });






