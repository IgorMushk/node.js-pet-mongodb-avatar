const { Command } = require("commander");
const animalsService = require("./src/modules/animals/services/animalsService");
const program = new Command();

//console.log(process.argv);

program.name("pat-app").description("Amazing pet app").version("1.8.0");

program
  .command("get-animal")
  .description("Get one or many animals")
  .option("-i, --id <char>", "animal's id")
  .action(async({id}) => {  
    if(!id){
      const animals = await animalsService.getAll();
      console.table(animals);
    } else {
        const animal = await animalsService.getOneById(id)   ;
        console.log('Animal was found', animal);
    }
  });

  program
  .command("create-animal")
  .description("Create animal")
  .argument("<payload>")
  .action(async (payload) => {
    const animal = await animalsService.create(JSON.parse(payload));
    console.log('Animals was created', animal);
  });

  program
  .command("update-animal")
  .description("Update animal by id")
  .argument("<payload>")
  .requiredOption("-i, --id <id>", "animal's id")
  .action((payload,options) => {
    console.log('update animal', payload, options);
  });

program.parse(process.argv);

