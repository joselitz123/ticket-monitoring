const logger = require('../logger/loggerSettings')();
const fetchLatestTicketUpdateLog = require('../dbQueries/notificationLogicQueries/fetchLatestTicketUpdateLog');
const moment = require('moment-business-days');

/**
 * Runs the logic for calculating the nextupdate of the ticket based on data in database
 * @param {Array} notif_types - the noticafication types for which to use the id
 */
function ticketNextUpdateEvaluator(notif_types) {

    return new Promise( async(resolve, reject) => {

        try {            

            const variables = await fetchLatestTicketUpdateLog();

            const notifId = notif_types.find(notifType => notifType.notif_type == 'ticket_update').id;

            moment.updateLocale('us', {
                workingWeekdays: [1, 2, 3, 4, 5]
            });

            const secPerHour = 3600;

            const hoursPerDay = 24;

            const result = variables.reduce((accumulator, current) => {

                const { tckt_nmbr, update_interval, divide_time, ticket_update, ticket_status} = current;

                const { date_updated } = ticket_update;

                const hourUpdate = ((update_interval * divide_time) / secPerHour);

                if (hourUpdate % hoursPerDay == 0) {
                    
                    const nextUpdate = moment(date_updated).businessAdd((hourUpdate/hoursPerDay), "days");

                    const data = {
                        ticket_id: tckt_nmbr,
                        notification: `This needs to be updated now as this was last updated on ${moment(date_updated).format('LL')} and is in ${ticket_status} status`,
                        notif_id: notifId,
                        time_prompted: moment()
                    }
                    
                    return nextUpdate.format('LL') >= moment().format('LL') ? [...accumulator, data] : accumulator;

                } else {

                    const nextUpdate = moment(date_updated).businessAdd(hourUpdate, "hours");

                    const hrBeforeNxtUpd = moment(date_updated).businessAdd((hourUpdate-1), "hours")

                    const data = {
                        ticket_id: tckt_nmbr,
                        notification: `This ticket is in ${ticket_status} status and needs to be updated in ${moment(nextUpdate).format('LL')}`,
                        notif_id: notifId,
                        time_prompted: moment()
                    }

                    return  hrBeforeNxtUpd.format('LLL') >= moment().format('LLL') ? [...accumulator, data] : accumulator;

                }

            },[]);

            resolve(result);

        } catch (error) {
            
            logger.error(error, 'An issue occured in notificationLogic');

            reject(error);

        }

    });


}

module.exports = ticketNextUpdateEvaluator;