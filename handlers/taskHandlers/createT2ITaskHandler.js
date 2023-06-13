const BaseHandler = require('../baseHandler')
const AIGC_API = require('../../static/aigc_api.json')
const AIGC_CONF = require('../../static/aigc_conf.json')
const axios = require('axios')
const _ = require('lodash')
const crypto = require('crypto')
const BODY_TEMPLATE = require('../../static/body_template.json')
const serviceContainer = require('../../di/service_container')
const fs = require("fs")


// const API_URL = AIGC_API.mock_root_api

const MOCK_ALL_MODELS = require('../../dao/mockDB/Models.json')

class CreateT2ITaskHandler extends BaseHandler {

    async handle(request, context) {
        if (this.Models_Cache == undefined) {
            this.Models_Cache = JSON.parse(await serviceContainer.resolve("modelDao").getAllModels())
        }

        let API_URL
        for (let model_param_index in MOCK_ALL_MODELS.SD_Model) {
            let model_param = MOCK_ALL_MODELS.SD_Model[model_param_index]

            if (model_param.model_id == parseInt(request['model_id']))
            API_URL = AIGC_API.root_api+model_param.model_api_id+model_param.t2i_keyword
        }
      

        let header_content = _.cloneDeep(AIGC_API.HeaderTemplate)
        let nonce = crypto.randomBytes(16).toString('hex')
        header_content.Nonce = nonce
        header_content.Timestamp = Math.floor(Date.now() / 1000).toString()
        header_content.SecretID = AIGC_CONF.Secret_ID
        let dataToHash = header_content.Timestamp + AIGC_CONF.Secret_key + header_content.Nonce
        header_content.Token = this.sha256(dataToHash)

        let body_content = _.cloneDeep(BODY_TEMPLATE)
        body_content.prompt = request['positive_prompt']

        try {
            const response = await axios.post(API_URL, body_content, {
                headers: header_content
            }, {
                timeout: 60000,  // Timeout of 60 seconds
            })
    
            if (response.status == 200) {
                const async_req_key = response.data["Aigcaas-Request-Id"]
    
                let async_response
                while (true) {
                    await this.sleep(5)
                    header_content.Nonce = crypto.randomBytes(16).toString('hex')
                    header_content.Timestamp = Math.floor(Date.now() / 1000).toString()
                    dataToHash = header_content.Timestamp + AIGC_CONF.Secret_key + header_content.Nonce
                    header_content.Token = this.sha256(dataToHash)
                    header_content.RequestID = async_req_key
    
                    async_response = await axios.get('https://api.aigcaas.cn/v2/async', { headers: header_content}, {timeout: 60000})

                    if (async_response.headers["aigcaas-status"]=="True") {
                        let base64Data = async_response.data["images"][0]
                        
                        // Decoding base64 image
                        let imageBuffer = Buffer.from(base64Data, 'base64')

                        // Generate a filename using current timestamp
                        let filename = `${Date.now()}.png`

                        // Saving decoded image to file
                        fs.writeFile(filename, imageBuffer, function(err) {
                            if (err) {
                                console.error('Error saving image: ', err)
                            } else {
                                console.log('Saved image as: ', filename)
                            }
                        })

                        break
                    }
                }

                return async_response.data["images"][0]
            }
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                console.error('Request timed out')
            }  else if (error.response) {
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else if (error.request) {
                console.log(error.request)
            } else {
                console.log('Error', error.message)
            }
            return error.response.data
        }
    }

    sha256(data) {
        const hash = crypto.createHash('sha256')
        hash.update(data)
        return hash.digest('hex')
    }

    async sleep(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms)
        })
    }
}

module.exports = CreateT2ITaskHandler

