class ImplementationController extends ConnectionServer{
    /**
     *
     * @param data
     * @returns {Promise<resolve>}
     */
    static updateStatus(data)
    {
        return new Promise(resolve => {
            this.sendRequest('implementation','POST',data,resolve,true,true);
        })
    }

}
