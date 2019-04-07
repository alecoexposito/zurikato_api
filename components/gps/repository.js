var db = require('../../lib/db/db');
const repository = {
    storeCoords: async function(Data) {
        // console.log("en el store coords", Data);
	    console.log(new Date());
	    console.log(" --------------------- ");
        let gpsData = Data.gpsData;
        let deviceModel = Data.deviceModel;
        let data = null;
        let modelId = 2;
        let mdvrNumber = null;
        console.log("STORE COORDS: ", Data);
        if(deviceModel == 'MDVR') {
            modelId = 3;
            mdvrNumber = gpsData.idDevice;
        } else if(deviceModel == 'BB') {
            modelId = 1;
        }

        if(deviceModel == 'MDVR') {
            data = await db.devices.findOne({ where: { mdvr_number: gpsData.idDevice } });
        } else {
            data = await db.devices.findOne({ where: { auth_device: gpsData.device_id } });
        }
        if (data == null) {
            let device = { 'idDeviceModel': modelId, 'label': deviceModel, 'auth_device': gpsData.device_id, 'mdvr_number': mdvrNumber };
            console.log("CREANDO EL DEVICE: ", device);
            data = await db.devices.create(device);
            // await db.userDevices.create({ 'idUser': 2, 'idDevice': data.idDevice });
        }

        console.log("id from database: ", data.idDevice);
        let gps = { 'idDevice': data.idDevice, 'lat': gpsData.latitude, 'lng': gpsData.longitude, 'speed': gpsData.speed, 'orientation_plain': gpsData.orientation_plain, 'gps_status': gpsData.gps_status };
        console.log("gpsdata: ", gpsData);
        if(gpsData.createdAt) {
            console.log("createdAt is in the data");
            gps.createdAt = gpsData.createdAt;
        }
        console.log("gps before create: ", gps);
        data = await db.gpsData.create(gps);
    }
};
module.exports = repository;
