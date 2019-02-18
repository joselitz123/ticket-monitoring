const logger = require('../logger/loggerSettings')();
const fetchLatestTicketUpdateLog = require('../dbQueries/notificationLogicQueries/fetchLatestTicketUpdateLog');
const insertForActionTicketData = require('../dbQueries/notificationLogicQueries/insertForActionTicketData');
const moment = require('moment-business-days');

/**
 * Runs the logic for prompting the notification to the user
 */
function setupNotificationData() {

    return new Promise( async(resolve, reject) => {

        try {
            
            const variables = await fetchLatestTicketUpdateLog();

            moment.updateLocale('us', {
                workingWeekdays: [1, 2, 3, 4, 5]
            });


            const result = await variables.reduce((accumulator, current) => {

                const secPerHour = 3600;

                const hoursPerDay = 24;

                const { tckt_nmbr, update_interval, divide_time, ticket_update } = current;

                const { date_updated } = ticket_update;

                const hourUpdate = ((update_interval * divide_time) / secPerHour);

                if (hourUpdate % hoursPerDay == 0) {
                    
                    const nextUpdate = moment(date_updated).businessAdd((hourUpdate/hoursPerDay), "days");
                    
                    const currentDate = moment().format('LL');

                    const data = {
                        ticket_id: tckt_nmbr,
                        date_last_updated: moment(date_updated),
                        date_to_update: moment(nextUpdate.format('LL')),
                        is_acknowledged: false,
                        time_prompted: moment()
                    }
                    
                    return [...accumulator, data];

                } else {

                    const nextUpdate = moment(date_updated).businessAdd(hourUpdate, "hours");

                    const data = {
                        ticket_id: tckt_nmbr,
                        date_last_updated: moment(date_updated),
                        date_to_update: nextUpdate,
                        is_acknowledged: false,
                        time_prompted: moment()
                    }

                    return [...accumulator, data];

                }

            },[]);

            await insertForActionTicketData(result);

            resolve(result);

        } catch (error) {
            
            logger.error(error, 'An issue occured in notificationLogic');

            reject();

        }

    });


}

module.exports = setupNotificationData;