var UserInterface = require('../../../interfaces/User');
module.exports = (db)=> {

    const deviceRepository = {

        parseDevice: function (data) {
            return data;
        },
        create: async function (Device) {
            var data = await db.devices.create(Device);
            return this.parseUser(data);
        },
        update: async function (Device) {
            var data = await db.devices.update(Device,{ where: { idDevice: Device.id }});
            return this.parseUser(data);
        },
        delete: async function (User) {
            var data = await db.devices.destroy({ where: { idDevice: Device.id }});
            return this.parseUser(data);
        },
        getAll: async function () {
            var devices = [];
            var result = await db.devices.findAll({
                include: [
                    {
                        model: db.deviceModel
                    },
                    {
                        model: db.users
                    }
                ]
            });
            if(result.length>0){
                console.log(result[1].users[0].email);
                for(let j = 0;j<result.length;j++){
                    let device = result[j];
                    let device_model = device.device_model.label;
                    let device_user = device.users[0];
                    let user = {};
                    if(device_user){
                        user = {'id':device_user.idUser,'email':device_user.email,'label':device_user.label};
                    }
                    devices.push({'id': device.idDevice,'IMEI':device.auth_device,'label':device.label,'model':device_model,'license_plate':device.license_plate,'contact':device.contact,'remark':device.remark,'activation_date':device.activation_date,'expiration_date':device.expiration_date,'user':user});
                }
            }
            return devices;
        },
        models: async function () {
            var models = [];
            var result = await db.deviceModel.findAll({

            });
            if(result.length>0){

                for(let j = 0;j<result.length;j++){
                    let model = result[j];

                    models.push({'id': model.idDeviceModel,'label':model.label});
                }
            }
            return models;
        }
    };
    return deviceRepository;
};