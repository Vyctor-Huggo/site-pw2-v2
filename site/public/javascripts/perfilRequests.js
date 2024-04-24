var dbUserRequests = require('./db_configs/User')

async function updateUser(id, image, album, cep) {
        try {
                await dbUserRequests.updateUserFavAlbumbyID(album, id);
                await dbUserRequests.updateUserImgbyID(image, id);
                dbUserRequests.updateUserCepbyID(cep, id).then(() => {
                    console.log('porrrrrrrrrrrrrrrrrrrrrrrraaaaaaaaaaaa')

                    dbUserRequests.getUserbyID(id).then(user => {
                        return user;
                    });
                })

                
        } catch (error) {
            console.error('Erro ao fazer update do perfil:', error.message);
        }
}

module.exports = { updateUser };