var dbUserRequests = require('./db_configs/User')

async function updateUser(id, image, album) {
    return new Promise((resolve, reject) => {
        try {
            if(!image) {
                if(album) {
                    dbUserRequests.updateUserFavAlbumbyID(album, id);
                }
            } else {
                dbUserRequests.updateUserImgbyID(image, id);
    
                if(album) {
                    dbUserRequests.updateUserFavAlbumbyID(album, id);
                }
            }
            
            dbUserRequests.getUserbyID(id).then(user => {
                resolve(user);
            });
        } catch (error) {
            console.error('Erro ao fazer update do perfil:', error.message);
            reject(error);
        }
    })
    
}

module.exports = { updateUser }