var UserInterface = require('./interface');
var db = require('../../lib/db/db');
const repository = {

    parseUser: function(data) {
        UserInterface.email = data.email;
        UserInterface.label = data.label;
        UserInterface.pass = null;
        UserInterface.telephone = data.telephone;
        UserInterface.userType = data.userType;
        UserInterface.parent = data.parent;
        UserInterface.active = data.active;
        UserInterface.auth_token = null;
        UserInterface.token = null;
        UserInterface.id = data.idUser;
        return UserInterface;
    },
    findById: async function(id) {
        var user = await db.users.findById(id);
        return user;
    },
    create: async function(User) {
        var data = await db.users.create(User);
        return this.parseUser(data);
    },
    update: async function(User) {
        var data = await db.users.update(User, { where: { idUser: User.id } });
        return this.parseUser(data);
    },
    remove: async function(User) {
        var data = await db.users.destroy({ where: { idUser: User.id } });
        return this.parseUser(data);
    },
    findOneByEmail: async function(email) {
        var user = await db.users.findOne({ where: { email: email } });
        return user;
    },
    findOneByUsername: async function (username) {
        var user = await db.users.findOne({where: {username: username}});
        return user;
    },
    getDevices: async function(id, isAdmin = false) {
        console.log("---------------------- GET DEVICES ------------------------- isAdmin: ", isAdmin);
         try {
             var query = "";
            if(isAdmin == true || isAdmin == "true") {
                query = "SELECT `devices`.`idDevice` as idDevice, `devices`.`auth_device` as auth_device, `devices`.`auth_password` as auth_password, `devices`.`idDeviceModel` as idDeviceModel, `devices`.`label` as label, `devices`.`sim` as sim, `devices`.`autoSync` as autoSync, `devices`.`license_plate` as license_plate, `devices`.`contact` as contact, `devices`.`remark` as remark, `devices`.`activation_date` as activation_date, `devices`.`expiration_date` as expiration_date, `devices`.`panic_button` as panic_button, `devices`.`trashed` as trashed, `devices`.`mdvr_number` as mdvr_number, `devices`.`createdAt` as createdAt, `devices`.`updatedAt` as updatedAt, `device_model`.`idDeviceModel` AS `device_model.idDeviceModel`, `device_model`.`label` AS `device_model.label`, `device_model`.`peripheral_gps` AS `device_model.peripheral_gps`, `device_model`.`peripheral_ticketsseller` AS `device_model.peripheral_ticketsseller`, `device_model`.`peripheral_cam1` AS `device_model.peripheral_cam1`, `device_model`.`peripheral_cam2` AS `device_model.peripheral_cam2`, `device_model`.`peripheral_cam3` AS `device_model.peripheral_cam3`, `device_model`.`peripheral_cam4` AS `device_model.peripheral_cam4`, `device_model`.`createdAt` AS `device_model.createdAt`, `device_model`.`updatedAt` AS `device_model.updatedAt`, `vehicle`.`id` AS `vehicle.id`, `vehicle`.`device_id` AS `vehicle.device_id`, `vehicle`.`client_id` AS `vehicle.client_id`, `vehicle`.`name` AS `vehicle.name`, `vehicle`.`plate_number` AS `vehicle.plate_number`, `vehicle`.`brand` AS `vehicle.brand`, `vehicle`.`model` AS `vehicle.model`, `vehicle`.`type` AS `vehicle.type`, `vehicle`.`year` AS `vehicle.year`, `vehicle`.`route` AS `vehicle.route`, `vehicle`.`odometer` AS `vehicle.odometer`, `vehicle`.`createdAt` AS `vehicle.createdAt`, `vehicle`.`updatedAt` AS `vehicle.updatedAt`, `users`.`idUser` AS `users.idUser`, `users`.`email` AS `users.email`, `users`.`label` AS `users.label`, `users`.`telephone` AS `users.telephone`, `users`.`pass` AS `users.pass`, `users`.`salt` AS `users.salt`, `users`.`userType` AS `users.userType`, `users`.`parent` AS `users.parent`, `users`.`active` AS `users.active`, `users`.`auth_token` AS `users.auth_token`, `users`.`token` AS `users.token`, `users`.`username` AS `users.username`, `users`.`automatic_imeis` AS `users.automatic_imeis`, `users`.`company_name` AS `users.company_name`, `users`.`fences` AS `users.fences`, `users`.`createdAt` AS `users.createdAt`, `users`.`updatedAt` AS `users.updatedAt`, `users->user_devices`.`idUserDevice` AS `users.user_devices.idUserDevice`, `users->user_devices`.`idUser` AS `users.user_devices.idUser`, `users->user_devices`.`idDevice` AS `users.user_devices.idDevice`, `users->user_devices`.`label` AS `users.user_devices.label`, `users->user_devices`.`createdAt` AS `users.user_devices.createdAt`, `users->user_devices`.`updatedAt` AS `users.user_devices.updatedAt`, peripheral_gps_data.idPeripheralGps as `peripheral_gps_data.idPeripheralGps`, peripheral_gps_data.idDevice as `peripheral_gps_data.idDevice`, peripheral_gps_data.lat as `peripheral_gps_data.lat`, peripheral_gps_data.lng as `peripheral_gps_data.lng`, peripheral_gps_data.speed as `peripheral_gps_data.speed`, peripheral_gps_data.vDate as `peripheral_gps_data.vDate`, peripheral_gps_data.uuid as `peripheral_gps_data.uuid`, peripheral_gps_data.orientation_plain as `peripheral_gps_data.orientation_plain`, peripheral_gps_data.gps_status as `peripheral_gps_data.gps_status`, peripheral_gps_data.createdAt as `peripheral_gps_data.createdAt`, peripheral_gps_data.updatedAt as `peripheral_gps_data.updatedAt`, camera.url_camera, camera.name as camera_name, camera.id as id_camera, camera.in_autoplay as camera_in_autoplay, camera.autoplay_interval as camera_autoplay_interval " +
                    "FROM `devices` AS `devices` LEFT OUTER JOIN `device_models` AS `device_model` ON `devices`.`idDeviceModel` = `device_model`.`idDeviceModel` " +
                    "LEFT OUTER JOIN `vehicle` AS `vehicle` ON `devices`.`idDevice` = `vehicle`.`device_id` LEFT OUTER JOIN ( `user_devices` AS `users->user_devices` " +
                    "INNER JOIN `users` AS `users` ON `users`.`idUser` = `users->user_devices`.`idUser`) ON `devices`.`idDevice` = `users->user_devices`.`idDevice` " +
                    "inner join peripheral_gps_data_last as peripheral_gps_data on peripheral_gps_data.idDevice = devices.idDevice " +
                    "left outer join camera on camera.device_id = devices.idDevice " +
                    "where devices.trashed is null or devices.trashed = 0";
            } else {
                query = "SELECT `devices`.`idDevice` as idDevice, `devices`.`auth_device` as auth_device, `devices`.`auth_password` as auth_password, `devices`.`idDeviceModel` as idDeviceModel, `devices`.`label` as label, `devices`.`sim` as sim, `devices`.`autoSync` as autoSync, `devices`.`license_plate` as license_plate, `devices`.`contact` as contact, `devices`.`remark` as remark, `devices`.`activation_date` as activation_date, `devices`.`expiration_date` as expiration_date, `devices`.`panic_button` as panic_button, `devices`.`trashed` as trashed, `devices`.`mdvr_number` as mdvr_number, `devices`.`createdAt` as createdAt, `devices`.`updatedAt` as updatedAt, `device_model`.`idDeviceModel` AS `device_model.idDeviceModel`, `device_model`.`label` AS `device_model.label`, `device_model`.`peripheral_gps` AS `device_model.peripheral_gps`, `device_model`.`peripheral_ticketsseller` AS `device_model.peripheral_ticketsseller`, `device_model`.`peripheral_cam1` AS `device_model.peripheral_cam1`, `device_model`.`peripheral_cam2` AS `device_model.peripheral_cam2`, `device_model`.`peripheral_cam3` AS `device_model.peripheral_cam3`, `device_model`.`peripheral_cam4` AS `device_model.peripheral_cam4`, `device_model`.`createdAt` AS `device_model.createdAt`, `device_model`.`updatedAt` AS `device_model.updatedAt`, `vehicle`.`id` AS `vehicle.id`, `vehicle`.`device_id` AS `vehicle.device_id`, `vehicle`.`client_id` AS `vehicle.client_id`, `vehicle`.`name` AS `vehicle.name`, `vehicle`.`plate_number` AS `vehicle.plate_number`, `vehicle`.`brand` AS `vehicle.brand`, `vehicle`.`model` AS `vehicle.model`, `vehicle`.`type` AS `vehicle.type`, `vehicle`.`year` AS `vehicle.year`, `vehicle`.`route` AS `vehicle.route`, `vehicle`.`odometer` AS `vehicle.odometer`, `vehicle`.`createdAt` AS `vehicle.createdAt`, `vehicle`.`updatedAt` AS `vehicle.updatedAt`, `users`.`idUser` AS `users.idUser`, `users`.`email` AS `users.email`, `users`.`label` AS `users.label`, `users`.`telephone` AS `users.telephone`, `users`.`pass` AS `users.pass`, `users`.`salt` AS `users.salt`, `users`.`userType` AS `users.userType`, `users`.`parent` AS `users.parent`, `users`.`active` AS `users.active`, `users`.`auth_token` AS `users.auth_token`, `users`.`token` AS `users.token`, `users`.`username` AS `users.username`, `users`.`automatic_imeis` AS `users.automatic_imeis`, `users`.`company_name` AS `users.company_name`, `users`.`fences` AS `users.fences`, `users`.`createdAt` AS `users.createdAt`, `users`.`updatedAt` AS `users.updatedAt`, `users->user_devices`.`idUserDevice` AS `users.user_devices.idUserDevice`, `users->user_devices`.`idUser` AS `users.user_devices.idUser`, `users->user_devices`.`idDevice` AS `users.user_devices.idDevice`, `users->user_devices`.`label` AS `users.user_devices.label`, `users->user_devices`.`createdAt` AS `users.user_devices.createdAt`, `users->user_devices`.`updatedAt` AS `users.user_devices.updatedAt`, peripheral_gps_data.idPeripheralGps as `peripheral_gps_data.idPeripheralGps`, peripheral_gps_data.idDevice as `peripheral_gps_data.idDevice`, peripheral_gps_data.lat as `peripheral_gps_data.lat`, peripheral_gps_data.lng as `peripheral_gps_data.lng`, peripheral_gps_data.speed as `peripheral_gps_data.speed`, peripheral_gps_data.vDate as `peripheral_gps_data.vDate`, peripheral_gps_data.uuid as `peripheral_gps_data.uuid`, peripheral_gps_data.orientation_plain as `peripheral_gps_data.orientation_plain`, peripheral_gps_data.gps_status as `peripheral_gps_data.gps_status`, peripheral_gps_data.createdAt as `peripheral_gps_data.createdAt`, peripheral_gps_data.updatedAt as `peripheral_gps_data.updatedAt` " +
                    "FROM `devices` AS `devices` LEFT OUTER JOIN `device_models` AS `device_model` ON `devices`.`idDeviceModel` = `device_model`.`idDeviceModel` " +
                    "LEFT OUTER JOIN `vehicle` AS `vehicle` ON `devices`.`idDevice` = `vehicle`.`device_id` LEFT OUTER JOIN ( `user_devices` AS `users->user_devices` " +
                    "INNER JOIN `users` AS `users` ON `users`.`idUser` = `users->user_devices`.`idUser`) ON `devices`.`idDevice` = `users->user_devices`.`idDevice` " +
                    "inner join peripheral_gps_data_last as peripheral_gps_data on peripheral_gps_data.idDevice = devices.idDevice " +
                    "left outer join camera on camera.device_id = devices.idDevice " +
                    "WHERE (`devices`.`user_id` = " + id + ") and (devices.trashed is null or devices.trashed = 0)";
            }
            var devicesResult = await db.sequelize.query(query);

            console.log("------------- ANTES DE PEDIR LOS DISPOSITIVOS -------------------------");
            var results = [];
            var devices = devicesResult[0];
            // console.log("devices: ", devices);
            console.log("-------------- DESPUES DE PEDIR LOS DISPOSITIVOS ----------------------");
            var lastId = 0;
            for(var i = 0; i < devices.length; i++) {
                if(devices[i].idDevice == lastId) {
                    results[results.length - 1].cameras.push({
                        url_camera: devices[i].url_camera,
                        name: devices[i].camera_name,
                        in_autoplay: devices[i].camera_in_autoplay,
                        autoplay_interval: devices[i].camera_autoplay_interval,
                    });
                    lastId = devices[i].idDevice;
                    continue;
                }
                lastId = devices[i].idDevice;
                var result = {
                    idDevice: devices[i].idDevice,
                    auth_device: devices[i].auth_device,
                    idDeviceModel: devices[i].idDeviceModel,
                    label: devices[i].label,
                    sim: devices[i].sim,
                    autoSync: devices[i].autoSync,
                    license_plate: devices[i].license_plate,
                    contact: devices[i].contact,
                    remark: devices[i].remark,
                    activation_date: devices[i].activation_date,
                    expiration_date: devices[i].expiration_date,
                    panic_button: devices[i].panic_button,
                    trashed: devices[i].trashed,
                    mdvr_number: devices[i].mdvr_number,
                    createdAt: devices[i].createdAt,
                    updatedAt: devices[i].updatedAt,
                    device_model: {
                        idDeviceModel: devices[i]['device_model.idDeviceModel'],
                        label: devices[i]['device_model.label'],
                        peripheral_gps: devices[i]['device_model.peripheral_gps'],
                        peripheral_ticketsseller: devices[i]['device_model.peripheral_ticketsseller'],
                        peripheral_cam1: devices[i]['device_model.peripheral_cam1'],
                        peripheral_cam2: devices[i]['device_model.peripheral_cam2'],
                        peripheral_cam3: devices[i]['device_model.peripheral_cam3'],
                        peripheral_cam4: devices[i]['device_model.peripheral_cam4'],
                        createdAt: devices[i]['device_model.createdAt'],
                        updatedAt: devices[i]['device_model.updatedAt'],
                    },
                    vehicle: {
                        id: devices[i]['vehicle.id'],
                        device_id: devices[i]['vehicle.device_id'],
                        client_id: devices[i]['vehicle.client_id'],
                        name: devices[i]['vehicle.name'],
                        plate_number: devices[i]['vehicle.plate_number'],
                        brand: devices[i]['vehicle.brand'],
                        model: devices[i]['vehicle.model'],
                        type: devices[i]['vehicle.type'],
                        year: devices[i]['vehicle.year'],
                        route: devices[i]['vehicle.route'],
                        odometer: devices[i]['vehicle.odometer'],
                        createdAt: devices[i]['vehicle.createdAt'],
                        updatedAt: devices[i]['vehicle.updatedAt'],
                    },
                    users: {
                        idUser: devices[i]['users.idUser'],
                        email: devices[i]['users.email'],
                        label: devices[i]['users.label'],
                        telephone: devices[i]['users.telephone'],
                        pass: devices[i]['users.pass'],
                        salt: devices[i]['users.salt'],
                        userType: devices[i]['users.userType'],
                        parent: devices[i]['users.parent'],
                        active: devices[i]['users.active'],
                        auth_token: devices[i]['users.auth_token'],
                        token: devices[i]['users.token'],
                        username: devices[i]['users.username'],
                        automatic_imeis: devices[i]['users.automatic_imeis'],
                        company_name: devices[i]['users.company_name'],
                        fences: devices[i]['users.fences'],
                        createdAt: devices[i]['users.createdAt'],
                        updatedAt: devices[i]['users.updatedAt'],
                        user_devices: {
                            idUserDevice: devices[i]['users.user_devices.idUserDevice'],
                            idUser: devices[i]['users.user_devices.idUser'],
                            idDevice: devices[i]['users.user_devices.idDevice'],
                            label: devices[i]['users.user_devices.label'],
                            createdAt: devices[i]['users.user_devices.createdAt'],
                            updatedAt: devices[i]['users.user_devices.updatedAt'],
                        }
                    },
                    peripheral_gps_data: [{
                        idPeripheralGps: devices[i]['peripheral_gps_data.idPeripheralGps'],
                        idDevice: devices[i]['peripheral_gps_data.idDevice'],
                        lat: devices[i]['peripheral_gps_data.lat'],
                        lng: devices[i]['peripheral_gps_data.lng'],
                        speed: devices[i]['peripheral_gps_data.speed'],
                        orientation_plain: devices[i]['peripheral_gps_data.orientation_plain'],
                        vDate: devices[i]['peripheral_gps_data.vDate'],
                        uuid: devices[i]['peripheral_gps_data.uuid'],
                        gps_status: devices[i]['peripheral_gps_data.gps_status'],
                        createdAt: devices[i]['peripheral_gps_data.createdAt'],
                        updatedAt: devices[i]['peripheral_gps_data.updatedAt']
                    }],
                    cameras: []
                };
                if(devices[i].url_camera != null && devices[i].url_camera.startsWith("rtsp")) {
                    result.cameras.push({
                        url_camera: devices[i].url_camera,
                        name: devices[i].camera_name,
                        id: devices[i].id_camera,
                        in_autoplay: devices[i].camera_in_autoplay,
                        autoplay_interval: devices[i].camera_autoplay_interval,
                    });
                }
                result.company_name = result.users.company_name;
                results.push(result);
            }
            console.log("result:  ", results);
            return results;
         }catch(error){console.log(error);}
    },

    getGroups: async function(id, isAdmin) {

        let query = "";

        if(isAdmin == true || isAdmin == "true") {
            query = "select distinct users.idUser as group_id, users.username as group_label, " +
                "devices.label as device_label, devices.idDevice as device_id, devices.auth_device as auth_device, device_models.label as device_model, " +
                "camera.url_camera, camera.name as camera_name, camera.id as id_camera, camera.in_autoplay as camera_in_autoplay, camera.autoplay_interval as camera_autoplay_interval" +
                " from users " +
                "right join devices on devices.user_id = users.idUser " +
                "inner join device_models on devices.idDeviceModel = device_models.idDeviceModel " +
                "left join camera on devices.idDevice = camera.device_id " +
                "where devices.trashed is null or devices.trashed = 0";
        } else {
            query = "select distinct dgroup.id as group_id, dgroup.label as group_label, " +
                "devices.label as device_label, devices.idDevice as device_id, devices.auth_device as auth_device, device_models.label as device_model, " +
                "camera.url_camera, camera.name as camera_name, camera.id as id_camera, camera.in_autoplay as camera_in_autoplay, camera.autoplay_interval as camera_autoplay_interval" +
                " from dgroup " +
                "inner join device_group on group_id = dgroup.id " +
                "right join devices on devices.idDevice = device_group.device_id " +
                "inner join peripheral_gps_data on devices.idDevice = peripheral_gps_data.idDevice " +
                "inner join device_models on devices.idDeviceModel = device_models.idDeviceModel " +
                "left join camera on devices.idDevice = camera.device_id " +
                "where (dgroup.user_id = " + id + " or dgroup.id is null) and devices.user_id = " + id  + " and (devices.trashed is null or devices.trashed = 0)";
        }


        let data = await db.sequelize.query(query);
        return data[0];
    },

    getAll: async function() {
        var users = [];
        var result = await db.users.findAll({
            include: [{
                    model: db.devices
                },
                {
                    model: db.userRole
                }
            ]
        });
        if (result.length > 0) {

            for (let j = 0; j < result.length; j++) {
                let user = result[j];
                let total_devices = user.devices.length;
                let user_role = user.user_role.role;
                users.push({ 'id': user.idUser, 'email': user.email, 'label': user.label, 'telephone': user.telephone, 'active': user.active, 'devices': total_devices, 'role': user_role, 'parent': user.parent });
            }
        }
        return users;
    },
    validateToken: async function(token) {
        var userData = await db.users.findOne({
            where: { auth_token: token },
            include: [{
                model: db.userRole
            }]
        });
        return userData;
    }
};
module.exports = repository;
