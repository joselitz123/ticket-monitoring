const logger = require('../../../logger/loggerSettings')();
const cheerio = require('cheerio');

/**
 * Gets the index of the row from the table coming in DOM element extracted
 * @param {array} filters 
 * @param {array} pages 
 */
function getIndexOfRow(filters, pages){

    return new Promise(async (resolve, reject)=>{

        try {
            
            const $ = cheerio.load(pages[0]);
            let filteredIndex = [];

            filters.map((filter)=>{

                $('#task > #task_table > thead > #hdr_task th').each(function(index){

                    /**
                     * Filters the header
                     */
                    const filterScrape = (stringFilter)=>{

                        return $(this).find('span .column_head').text().indexOf(stringFilter);

                    }

                    if (filterScrape(filter) != -1) {

                        filteredIndex.push(index);
                        
                    }

                });  

                
            });

            resolve(filteredIndex);

        } catch (error) {
            
            logger.error(error, 'Unable to get the index of the columns for the ticket');
            reject(error);

        }

    })


}

module.exports = getIndexOfRow;