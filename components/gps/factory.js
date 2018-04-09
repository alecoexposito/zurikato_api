const config = require('../../config');
var repository = require('./repository');
var factory = {

    _storeCoords: async function(Data) {
        try {
            let data = await repository.storeCoords(Data);
            return data;
        } catch (error) {

        }
        return '';
    }
};

module.exports = factory;