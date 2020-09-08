class TestController extends ConnectionServer{

    /**
     *
     * @param id
     * @returns {Promise<unknown>}
     */
    static getTimeline(id)
    {
        return new Promise(resolve => {
            ConnectionServer.sendRequest('tests/'+id,'POST','',resolve,true,false)
        })
    }
    /**
     *
     * @param formData
     * @returns {Promise<unknown>}
     */
    static insertTimeline(formData)
    {
        return new Promise((resolve) => {
            ConnectionServer.sendRequest('tests/insertTimeline','POST',formData,resolve,true,true)
        })
    }


}
