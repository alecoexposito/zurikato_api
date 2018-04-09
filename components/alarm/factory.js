const config = require('../../config');
var repository = require('./repository');
var factory = {

    _storeAlarms: function(Data) {
        try {
            let data = repository.storeAlarms(Data);
            return data;
        } catch (error) {

        }
        return '';
    }
};

module.exports = factory;