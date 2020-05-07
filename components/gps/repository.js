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

        if(deviceModel == "BB") {
            // console.log("################ BUSCADO POR ESTE IMEI: ", gpsData.device_id);
            // console.log("################ RESULTADO DE DATA DESPUES DE BUSCAR ################################", data);
        }
        if (data == null) {
            let device = { 'idDeviceModel': modelId, 'label': deviceLabel, 'auth_device': gpsData.device_id, 'mdvr_number': mdvrNumber };
            data = await db.devices.create(device);
            // await db.userDevices.create({ 'idUser': 2, 'idDevice': data.idDevice });
        }


        let gps = { 'idDevice': data.idDevice, 'lat': gpsData.latitude, 'lng': gpsData.longitude, 'speed': gpsData.speed, 'orientation_plain': gpsData.track, 'gps_status': gpsData.gps_status };
        console.log("gpsdata: ", gpsData);
        if(gpsData.createdAt) {
            console.log("createdAt is in the data");
        }
        if(gpsData.offline_id) {
            gps.createdAt = gpsData.createdAt;
        }

        let query = "delete from peripheral_gps_data where idDevice = " + gps.idDevice + " and createdAt = " + gps.createdAt;
        db.sequelize.query(query);
        // console.log("gps before create: ", gps);
        data = await db.gpsData.create(gps);


    }
};
module.exports = repository;
