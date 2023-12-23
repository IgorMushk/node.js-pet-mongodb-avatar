// const path = require('node:path');
// const fs = require('node:fs/promises');
const Animal = require("../models/animal");

class AnimalRepository {
    // dbPath = path.join(process.cwd(), 'db.json')
    
    // async readDB(){
    //     const content = await fs.readFile(this.dbPath);
    //     const entries = JSON.parse(content.toString());
    //     return entries;
    // }

    // async writeDB(db){
    //     const content = JSON.stringify(db, null, 2);
    //     await fs.writeFile(this.dbPath,content);
    // }
    
    async findAll(config) {
      const {page, limit, isVaccinated, sortBy, order, minAge} = config;
      //console.log(minAge)
        const skip = (page - 1) * limit
        //console.log(config);

        const animalsQuery = Animal.find().where('deletedAt').equals(null).skip(skip).limit(limit);
        const countQuery = Animal.countDocuments().where('deletedAt').equals(null);
        if (isVaccinated) {
          animalsQuery.where('isVaccinated').equals(isVaccinated);
          countQuery.where('isVaccinated').equals(isVaccinated);
        }

        if (sortBy) {
          animalsQuery.sort({
            [sortBy]: order,
          })
        }

        if (minAge) {
          animalsQuery.where('age').gte(minAge);
          countQuery.where('age').gte(minAge);
        }

        const animals = await animalsQuery.exec();
        const count = await countQuery.exec();
        return {animals, count};    
    }

    async findOneById(animalId) {
      //console.log('animalId', animalId);
        const animal = await Animal.findById(animalId).where('deletedAt').equals(null);
        return animal;
    }

    async create(payload) {
        const animal = new Animal(payload);
        //console.log('animal : ', animal);
        await animal.save();
        return animal;
    }

    async updateById(animalId, payload) {
        const animal = await this.findOneById(animalId);
        // console.log(animal);
        if (!animal) {
          return;
        }
        const updatedAnimal = await Animal.findByIdAndUpdate(animalId, payload, {returnOriginal: false})
        return updatedAnimal;
      }
    
      async deleteById(animalId) {
        const animal = await this.findOneById(animalId);
        if (!animal) {
          return;
        }
        
        await Animal.findByIdAndUpdate(animalId, {
          $set: {
            deletedAt: new Date(),
          },
        });
        return animalId;
      }
    

}

const animalRepository = new AnimalRepository();

module.exports = animalRepository;
