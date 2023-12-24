const { message } = require("../../animals/validationSchemas/createAnimal");
const saveFileToCloudinary = require("../../common/utils/saveFileToCloudinary");
const saveFileToStorage = require("../../common/utils/saveFileToStorege");
const usersService = require("../services/users");

class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    updateMe = async (req, res, next) => {
        const userId = req.user._id;
        const { body } = req;
        console.log('updateMe - body', body);
        console.log('updateMe - req.file', req.file);
        //console.log('updateMe - this', this);
        //const user = await this.usersService.updateUserById(userId, body);
        //-1- To Storage
        //const avatarUrl = await saveFileToStorage(req.file);
        //-2-
        const avatarUrl = await saveFileToCloudinary(req.file);
        const user = await this.usersService.updateUserById(userId, {...body, avatarUrl});
        res.json({
            status: 200,
            message: "User updated successfully!",
            data: user,
        })
    }
}

const usersController = new UsersController(usersService);

module.exports = usersController 