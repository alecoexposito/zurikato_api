var db = require('../../lib/db/db');
var moment = require("moment");
const repository = {
    storeCoords: async function(Data) {
        // console.log("en el store coords", Data);
        let gpsData = Data.gpsData;
        let deviceModel = Data.deviceModel;
        let data = null;
        let modelId = 2;
        let mdvrNumber = null;
        // console.log("STORE COORDS: ", Data);
        let deviceLabel = deviceModel;
        if(deviceModel == 'MDVR') {
            modelId = 3;
            mdvrNumber = gpsData.idDevice;
            deviceLabel = gpsData.deviceLabel;
        } else if(deviceModel == 'BB') {
            modelId = 1;
        }

        if(deviceModel == 'MDVR') {
            data = await db.devices.findOne({ where: { mdvr_number: gpsData.idDevice } });
        } else {
            data = await db.devices.findOne({ where: { auth_device: gpsData.device_id } });
        }
        console.log("################ BUSCADO POR ESTE IMEI: ", gpsData.device_id);
        console.log("################ RESULTADO DE DATA DESPUES DE BUSCAR ################################", data);
        if (data == null) {
            let device = { 'idDeviceModel': modelId, 'label': deviceLabel, 'auth_device': gpsData.device_id, 'mdvr_number': mdvrNumber };
            data = await db.devices.create(device);
            // await db.userDevices.create({ 'idUser': 2, 'idDevice': data.idDevice });
        }

        // console.log("id from database: ", data.idDevice);
        let gps = { 'idDevice': data.idDevice, 'lat': gpsData.latitude, 'lng': gpsData.longitude, 'speed': gpsData.speed, 'orientation_plain': gpsData.orientation_plain, 'gps_status': gpsData.gps_status };
        // console.log("gpsdata: ", gpsData);
        if(gpsData.createdAt) {
            console.log("createdAt is in the data");
            gps.createdAt = gpsData.createdAt;
        }
        // console.log("gps before create: ", gps);
        data = await db.gpsData.create(gps);

        // console.log("voy a updatear");
        // let queryUpdate = "update peripheral_gps_data_last set " +
        //     "lat = " + gps.lat + ", " +
        //     "lng = " + gps.lng + ", " +
        //     "speed = " + gps.speed + ", " +
        //     "orientation_plain = " + gps.orientation_plain + ", " +
        //     "gps_status = " + data.gps_status + ", " +
        //     "updatedAt = \'" + moment(data.createdAt).utc().format('YYYY-MM-DD HH:mm:ss') + "\' " +
        //     "where idDevice = " + gps.idDevice
        // ;
        // let result = await db.sequelize.query(queryUpdate);
        //
        // console.log("Filas afectadas: ", result[0].affectedRows);
        // let affectedRows = result[0].affectedRows;
        // if(affectedRows < 1) {
        //     let queryDelete = "delete from peripheral_gps_data_last where idDevice = " + data.idDevice;
        //     let result = await db.sequelize.query(queryUpdate);
        //     let queryInsert = "insert into peripheral_gps_data_last (select * from peripheral_gps_data where idDevice = " + data.idDevice + " order by idPeripheralGps desc limit 1)";
        //     result = await db.sequelize.query(queryInsert);
        // }



    }
};
module.exports = repository;
