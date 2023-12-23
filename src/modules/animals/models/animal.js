//const {nanoid} = require('nanoid');
const {Schema, default: mongoose} = require("mongoose");

// class AnimalOld {
//     constructor(payload) {
//         this.id = nanoid();
//         this.createdAt = new Date().toISOString();
//         this.updateAt = new Date().toISOString();
//         this.name = payload.name;
//         this.age = payload.age;
//         this.isVaccinated = payload.isVaccinated;
//         this.gender = payload.gender;
//         this.species = payload.species;
//     }
// }

// module.exports = AnimalOld;

const animalSchema = new Schema({
  name: { type: String, require: true} ,
  age: { type: Number, require: true},
  isVaccinated: {type: Boolean, default: false},
  gender: {type: String, enum: ["male", "famaile"], require: true},
  species: {type: String, require: true},
  deletedAt: {type: Date, default: null},
}, {versionKey: false, timestamps: true},)

const Animal = mongoose.model("animals", animalSchema);

module.exports = Animal;

