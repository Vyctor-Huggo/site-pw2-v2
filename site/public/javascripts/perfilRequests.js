var dbUserRequests = require('./db_configs/User')

async function updateUser(id, image, album, cep) {
        try {
                await dbUserRequests.updateUserFavAlbumbyID(album, id);
                await dbUserRequests.updateUserImgbyID(image, id);
                await dbUserRequests.updateUserCepbyID(cep, id)

                const user = await dbUserRequests.getUserbyID(id);
                console.log("Usuario atualizado: ", user);
                return user;


                
        } catch (error) {
            console.error('Erro ao fazer update do perfil:', error.message);
        }
}

module.exports = { updateUser };