class TicketController {

    /**
     *
     * @param formData
     * @returns {Promise<resolve,reject>}
     */
    static insertTimeline(formData)
    {
        return new Promise((resolve) => {
            ConnectionServer.sendRequest('ticket/inertTimeLine','POST',formData,resolve,false,true)
        })
    }

    /**
     *
     * @param formdata
     * @returns {Promise<resolve>}
     */
    static updateStatusTicket(formdata)
    {
        return new Promise(resolve => {
            ConnectionServer.sendRequest('ticket/update','POST',formdata,resolve,false,true)
        })
    }
}
