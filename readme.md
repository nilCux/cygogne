## Lolal execution:
* Using dev configuration
> sls offline start sls --stage dev


## Mongo DB
* Installlation: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
* Launch
> sudo systemctl start mongod
* Check status
> sudo systemctl status mongod
* Stop
> sudo systemctl stop mongod
* Restart
> sudo systemctl restart mongod

## API description 🚀
* POST | http://localhost:3000/dev/tasks/text2img   
> Creation of task by offering model_ID, prompt_ID, prompt's arguments (probably indexes for each selection).
* GET   http://localhost:3000/dev/models
> It returns all models with their associated prompt templates.
 
* GET   http://localhost:3000/dev/models/{id}
> It returns the model that we request by ID ans its associated prompt templates.
