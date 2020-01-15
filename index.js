const axios = require('axios')
const urlJoin = require('url-join')

const endpoints = [
    ['language/phrase/analyze', 'analyze'],
    ['language/phrase/context', 'context'],
    ['language/phrase/context/business', 'businessContext'],
    ['language/phrase/entities', 'entities'],
    ['language/phrase/entities/business', 'businessEntities'],
    ['language/phrase/similar', 'similar'],
]

class Graphene {
    constructor(apiKey, options = {}) {
        this.apiKey = apiKey
        this.hostname = options.hostname || "https://graphene.indigoresearch.xyz/"
        endpoints.forEach(([path, method]) => {
            this[method] = (function (session_id, payload) {
                return this.request(path, session_id, payload)
            }).bind(this)
        })
    }

    async request(path, session_id, payload) {
        const {data} = await axios.get(urlJoin(this.hostname, 'api/v1', path), {
            params: { api_key: this.apiKey, session_id, payload},
        })
        if (data.errors && data.errors.length) throw data.errors[0]
        return data.payload
    }
}

module.exports = Graphene