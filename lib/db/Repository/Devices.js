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
                    devices.push({'id': device.idDevice,'IMEI':device.auth_device,'label':device.label,'model':device_model,'license_plate':device.license_plate,'contact':device.contact,'remark':device.remark,'activation_date':device.activation_date,'expiration_date':device.expiration_date, economic_number: device.economic_number, 'user':user});
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

            let queryDevices = "select idDevice from devices where panic_button = 1";
            let devicesData = await db.sequelize.query(queryDevices);
            console.log("------------------- DEVICES SOLITOS -----------------------------", devicesData[0])
            var result = [];
            // devicesData[0].forEach(function(value) {
            //     console.log("-------------------- VALUE EN FOR: ---------------", value.idDevice);
            // });

            for(var i = 0; i < devicesData[0].length; i++) {
                let device = devicesData[0][i];
                let query = "select devices.idDevice as idDevice, " +
                    "' ' as Provider, " +
                    "' ' as IDCompany, " +
                    "users.company_name as CompanyName, " +
                    "vehicle.route as RouteName, " +
                    "DATE_FORMAT(peripheral_gps_data.createdAt, '%d/%m/%Y') as Date, " +
                    "DATE_FORMAT(peripheral_gps_data.createdAt, '%H:%i:%s') as Time, " +
                    "vehicle.vin as VIN, " +
                    "vehicle.name as EconomicNumber, " +
                    "vehicle.plate_number as VehiculePlate, devices.auth_device as IMEI, peripheral_gps_data.lat as Latitude, " +
                    "peripheral_gps_data.lng as Longitude, ' ' as Altitude, peripheral_gps_data.speed as Speed, " +
                    "peripheral_gps_data.orientation_plain as Direction, " +
                    "if(alarm.id is not null, 'true', 'false') as PanicButton, ' ' as UrlCamera " +
                    "from devices " +
                    "inner join users on users.idUser = devices.user_id " +
                    "inner join vehicle on vehicle.device_id = devices.idDevice " +
                    "inner join peripheral_gps_data on peripheral_gps_data.idPeripheralGps = " +
                    "(select MAX(peripheral_gps_data.idPeripheralGps) " +
                    "from peripheral_gps_data where peripheral_gps_data.idDevice = devices.idDevice) " +
                    // "left join camera on devices.idDevice = camera.device_id " +
                    "left join alarm on alarm.id = " +
                    "(select max(alarm.id) from alarm where devices.idDevice = alarm.device and alarm.createdAt > CONVERT_TZ( NOW(), @@session.time_zone, '+00:00' ) - INTERVAL 1 MINUTE) " +
                    "where devices.idDevice = " + device.idDevice;
                let data = await db.sequelize.query(query);
                result = result.concat(data[0]);
            }


            return result;
        },

        saveSemovLog: function(json_data) {
            try {
                let insertQuery = 'insert into semov_log(data_json, created_at, updated_at) values(\'' + json_data + '\', now(), UTC_TIMESTAMP())';
                db.sequelize.query(insertQuery);
            } catch (e) {
                console.log("error inserting in semov_log", e);
            }
        }
    };
    return deviceRepository;
};
