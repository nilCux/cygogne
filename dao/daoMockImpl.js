const { ModelDAO, PromptTemplateDAO, UserDAO } = require('./daoInterface');


MODELS_SOURCE = require('./mockDB/Models.json');
PROMPTS_SOURCE = require('./mockDB/Prompts.json');

ALL_MODELS = {};

// Iterate over "SD_Model" and "Lora"
for (let modelIndex in MODELS_SOURCE.SD_Model) {
  let model = MODELS_SOURCE.SD_Model[modelIndex];
  let exposed_model = {
    model_id: model.model_id,
    model_name: model.model_name,
    prompts: [],
  };

  // Find matching prompts group for the current model
  for (let prompts_groupIndex in PROMPTS_SOURCE) {
    let prompts_group = PROMPTS_SOURCE[prompts_groupIndex];
    if (prompts_group.model_id === model.model_id) {
      exposed_model.prompts = prompts_group.prompts;
    }
  }

  ALL_MODELS[model.model_id] = exposed_model;
}


class MockModelDAO extends ModelDAO {
    async getModel(id) {
        id = id%(Object.keys(ALL_MODELS).length)
        return JSON.stringify(ALL_MODELS[id])
    }

    async saveModel(model) {
        return 0
    }

    async deleteModel(id) {
        return 0;
    }

    async getAllModels() {
        return JSON.stringify(ALL_MODELS)
    }

}

module.exports = MockModelDAO