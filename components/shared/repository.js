var db = require('../../lib/db/db');
const repository = {
    // storeCoords: async function(Data) {
    //     console.log(Data);
	 //    console.log(new Date());
	 //    console.log(" --------------------- ");
    //     let gpsData = Data.gpsData;
    //     let deviceModel = Data.deviceModel;
    //     let data = await db.devices.findOne({ where: { auth_device: gpsData.device_id } });
    //     if (data == null) {
    //         let modelId = 2;
    //         if (deviceModel == 'BB') { modelId = 1; }
    //         let device = { 'idDeviceModel': modelId, 'label': deviceModel, 'auth_device': gpsData.device_id };
    //         data = await db.devices.create(device);
    //         await db.userDevices.create({ 'idUser': 2, 'idDevice': data.idDevice });
    //     }
    //     let gps = { 'idDevice': data.idDevice, 'lat': gpsData.latitude, 'lng': gpsData.longitude, 'speed': gpsData.speed, 'orientation_plain': gpsData.orientation_plain, 'gps_status': gpsData.gps_status };
    //     data = await db.gpsData.create(gps);
    // }
    getSharedScreen: async function(id) {
        let data = await db.shares.findOne({ where: { 'id': id }});
        console.log("data returned: ", data);
        return data;
    },
    saveShared: async function(body) {
        let expirationDate = body.expirationDate;
        let idsArray = body.ids;
        let share = {
            expiration_date: expirationDate,
            url_hash: '2134314314'
        };
        await db.shares.create(share).then(share => {
            return share;
        });
    }
};
module.exports = repository;
