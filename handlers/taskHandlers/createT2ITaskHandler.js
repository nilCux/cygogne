const BaseHandler = require('../baseHandler');
const AIGC_API = require('../../static/aigc_api.json')
const AIGC_CONF = require('../../static/aigc_conf.json')
const axios = require('axios');
const _ = require('lodash')
const crypto = require('crypto');
const BODY_TEMPLATE = require('../../static/body_template.json')
const serviceContainer = require('../../di/service_container')

const API_URL = AIGC_API.root_api+'text2img'
// const API_URL = AIGC_API.mock_root_api



class CreateT2ITaskHandler extends BaseHandler {

    async handle(request, context) {
        // For each model or different prompts, we need to load suggested Lora, Embedding and parameters
        if (this.Models_Cache == undefined) {
            this.Models_Cache = JSON.parse(await serviceContainer.resolve("modelDao").getAllModels())
        }
        let header_content = _.cloneDeep(AIGC_API.HeaderTemplate)
        let nonce = crypto.randomBytes(16).toString('hex');
        header_content.Nonce = nonce
        // header_content.Timestamp = new Date().toISOString();
        header_content.Timestamp = Math.floor(Date.now() / 1000).toString();
        header_content.SecretID = AIGC_CONF.Secret_ID
        let dataToHash = header_content.Timestamp + AIGC_CONF.Secret_key + header_content.Nonce;
        header_content.Token = this.sha256(dataToHash);

        let body_content = _.cloneDeep(BODY_TEMPLATE)
        body_content.prompt = this.Models_Cache[0].prompts[0].initial_positive_template

        let response = {}
        try {
                response = await axios.post(API_URL, body_content, {
                headers: header_content
            }, {
                timeout: 60000,  // Timeout of 5 seconds
            });
        
            console.log(response.data);
            console.log(response)
            console.lon(response.status)
          } catch (error) {
            if (error.code === 'ECONNABORTED') {
                console.error('Request timed out');
            } else {
                console.error(error);
            }
          }

          return response
    }

    sha256(data) {
        console.log("Hash input: %s", data)
        const hash = crypto.createHash('sha256');
        hash.update(data);
        return hash.digest('hex');
    }
}

c = new CreateT2ITaskHandler()

c.handle()
module.exports = CreateT2ITaskHandler
