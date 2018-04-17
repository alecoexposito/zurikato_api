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
        },

        getDevicesLastData: async function() {
            let query = "select users.company_name as CompanyName, devices.route_name as RouteName, " +
                "peripheral_gps_data.createdAt as date, devices.economic_number as EconomicNumber, " +
                "devices.vehicle_plate, devices.auth_device as IMEI, peripheral_gps_data.lat as Latitude, " +
                "peripheral_gps_data.lng as Longitude, ' ' as Altitude, peripheral_gps_data.speed as Speed, " +
                "' ' as Direction, devices.panic_button as PanicButton, camera.url_camera as UrlCamera " +
                "from devices " +
                "inner join users on users.idUser = devices.user_id " +
                "inner join peripheral_gps_data on peripheral_gps_data.idDevice = " +
                "(select * " +
                "from peripheral_gps_data where peripheral_gps_data.idDevice = devices.idDevice order by peripheral_gps_data.createdAt desc limit 1) peripheral_gps_data " +
                "inner join camera on devices.idDevice = camera.device_id " +
                "order by peripheral_gps_data.createdAt";
                // "where (dgroup.user_id = " + id + " or dgroup.id is null) and devices.user_id = " + id;
            let data = await db.sequelize.query(query);
            return data[0];
        }
    };
    return deviceRepository;
};