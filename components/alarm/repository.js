var db = require('./db');
const repository = {
    storeAlarms: async function(Data) {
        let alarmData = Data.alarmData;
        let code = await db.alarm_code.findOne({ where: { code: alarmData.device_info } });
        let device = await db.devices.findOne({ where: { auth_device: alarmData.device_id } });
        if (code == null) {
            let alarm = { 'code': alarmData.device_info, 'readable': alarmData.device_info };
            code = await db.alarm_code.create(alarm);
        }
        let alarm = { 'device': device.idDevice, 'lat': alarmData.latitude, 'lng': alarmData.longitude, 'speed': alarmData.speed,'code': code.id };
        await db.alarm.create(alarm);
        console.log("creando la alarma", alarm);
    }
};
module.exports = repository;