const ticketUpdateModel = require('../../database/collections/tckt_update_log/tckt_update_log');
const logger = require('../../logger/loggerSettings')();


/**
 * fetchTicketUpdates
 * @param {String} ticket_id - ticket to fetch the updates
 */
const fetchTicketUpdates = (ticket_id) => {


    
    return new Promise(async (resolve, reject) => {

        try {

            const ticketUpdateCon = await ticketUpdateModel();

            ticketUpdateCon.aggregate([
                {$match: {ticket_id: ticket_id}},
                {$lookup: {
                    from: 'biops_resources',
                    let: {resource_id: '$resource_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$$resource_id', '$_id']}}}
                    ],
                    as: 'resource'
                }},
                {$unwind: '$resource'},
                {$addFields: {resource: '$resource.resource_name'}},
                {$project: {__v: 0, resource_id: 0}}
            ])
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, 'An issue occured in fetchTicketUpdates');

                reject(err);

            });
            
        } catch (error) {

            logger.error(error, 'An issue occured in fetchTicketUpdates');

            reject(error);
            
        }


    })

}

module.exports = fetchTicketUpdates;