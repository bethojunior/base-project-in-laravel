class EnterpriseController extends ConnectionServer{

    /**
     *
     * @returns {Promise<resolve>}
     */
    static getStates()
    {
        return new Promise(resolve => {
            ConnectionServer.simpleRequest('https://servicodados.ibge.gov.br/api/v1/localidades/estados','GET',resolve)
        })
    }

    /**
     *
     * @param state
     * @returns {Promise<resolve>}
     */
    static getCityByState(state)
    {
        return new Promise(resolve => {
            ConnectionServer.simpleRequest(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,'GET',resolve)
        })
    }

    /**
     *
     * @param data
     * @returns {Promise<unknown>}
     */
    static insertImplementation(data)
    {
        return new Promise(resolve => {
            ConnectionServer.sendRequest('implementation/insert','POST',data,resolve,false,true)
        })
    }

}
