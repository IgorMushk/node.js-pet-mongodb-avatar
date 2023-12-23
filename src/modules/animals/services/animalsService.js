const HttpError = require("../../common/models/HttpError");
// const Animal = require("../models/animal");
const animalRepository = require("../repositories/animalsREpository");

class AnimalsService {
    constructor(animalRepositoty) {
        this.animalRepository = animalRepository;
    }

    // описываем интерфейс
    async getAll(config) {
       // a lot of logic 
       return await this.animalRepository.findAll(config);
    }

    async getOneById(id) {
        const animal = await this.animalRepository.findOneById(id);
        //console.log('animal',animal);
        if (!animal) {
          throw new HttpError(404, 'Animal is not found');
        }   
        return animal;
        }

    async create(payload) {
      //console.log('payload : ', payload);
      return await this.animalRepository.create(payload);
    }
    
    async updateById(id, payload) {
        const animal = await this.animalRepository.updateById(id, payload);
        if (!animal) {
          throw new HttpError(404, 'Animal is not found');
        }
        return animal;
      }
    

    async deleteById(id) {
        const animal = await this.animalRepository.deleteById(id);
        if (!animal) {
          throw new HttpError(404, 'Animal is not found');
        }
        return { id };
      }
    
}

const animalsService = new AnimalsService(animalRepository);

module.exports = animalsService;
// бизнесс логика