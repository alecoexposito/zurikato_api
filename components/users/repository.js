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
    getDevices: async function(id) {
        console.log("---------------------- GET DEVICES -------------------------");
         try {
            // var devices = await db.devices.findAll({
            // where: {
            //     $and: [
            //         { user_id: id },
            //     ]
            // },
            // include: [{
            //     model: db.deviceModel
            // }, {
            //     model: db.gpsData,order: [['createdAt','DESC']],limit:1
            // }, {
            //     model: db.vehicle
            // }, {
            //     model: db.users
            // }]
            //
            // });

             var devices = await db.sequelize.query("SELECT `devices`.`idDevice`, `devices`.`auth_device`, `devices`.`auth_password`, `devices`.`idDeviceModel`, `devices`.`label`, `devices`.`sim`, `devices`.`autoSync`, `devices`.`license_plate`, `devices`.`contact`, `devices`.`remark`, `devices`.`activation_date`, `devices`.`expiration_date`, `devices`.`panic_button`, `devices`.`trashed`, `devices`.`mdvr_number`, `devices`.`createdAt`, `devices`.`updatedAt`, `device_model`.`idDeviceModel` AS `device_model.idDeviceModel`, `device_model`.`label` AS `device_model.label`, `device_model`.`peripheral_gps` AS `device_model.peripheral_gps`, `device_model`.`peripheral_ticketsseller` AS `device_model.peripheral_ticketsseller`, `device_model`.`peripheral_cam1` AS `device_model.peripheral_cam1`, `device_model`.`peripheral_cam2` AS `device_model.peripheral_cam2`, `device_model`.`peripheral_cam3` AS `device_model.peripheral_cam3`, `device_model`.`peripheral_cam4` AS `device_model.peripheral_cam4`, `device_model`.`createdAt` AS `device_model.createdAt`, `device_model`.`updatedAt` AS `device_model.updatedAt`, `vehicle`.`id` AS `vehicle.id`, `vehicle`.`device_id` AS `vehicle.device_id`, `vehicle`.`client_id` AS `vehicle.client_id`, `vehicle`.`name` AS `vehicle.name`, `vehicle`.`plate_number` AS `vehicle.plate_number`, `vehicle`.`brand` AS `vehicle.brand`, `vehicle`.`model` AS `vehicle.model`, `vehicle`.`type` AS `vehicle.type`, `vehicle`.`year` AS `vehicle.year`, `vehicle`.`route` AS `vehicle.route`, `vehicle`.`odometer` AS `vehicle.odometer`, `vehicle`.`createdAt` AS `vehicle.createdAt`, `vehicle`.`updatedAt` AS `vehicle.updatedAt`, `users`.`idUser` AS `users.idUser`, `users`.`email` AS `users.email`, `users`.`label` AS `users.label`, `users`.`telephone` AS `users.telephone`, `users`.`pass` AS `users.pass`, `users`.`salt` AS `users.salt`, `users`.`userType` AS `users.userType`, `users`.`parent` AS `users.parent`, `users`.`active` AS `users.active`, `users`.`auth_token` AS `users.auth_token`, `users`.`token` AS `users.token`, `users`.`username` AS `users.username`, `users`.`automatic_imeis` AS `users.automatic_imeis`, `users`.`company_name` AS `users.company_name`, `users`.`fences` AS `users.fences`, `users`.`createdAt` AS `users.createdAt`, `users`.`updatedAt` AS `users.updatedAt`, `users->user_devices`.`idUserDevice` AS `users.user_devices.idUserDevice`, `users->user_devices`.`idUser` AS `users.user_devices.idUser`, `users->user_devices`.`idDevice` AS `users.user_devices.idDevice`, `users->user_devices`.`label` AS `users.user_devices.label`, `users->user_devices`.`createdAt` AS `users.user_devices.createdAt`, `users->user_devices`.`updatedAt` AS `users.user_devices.updatedAt` FROM `devices` AS `devices` LEFT OUTER JOIN `device_models` AS `device_model` ON `devices`.`idDeviceModel` = `device_model`.`idDeviceModel` LEFT OUTER JOIN `vehicle` AS `vehicle` ON `devices`.`idDevice` = `vehicle`.`device_id` LEFT OUTER JOIN ( `user_devices` AS `users->user_devices` INNER JOIN `users` AS `users` ON `users`.`idUser` = `users->user_devices`.`idUser`) ON `devices`.`idDevice` = `users->user_devices`.`idDevice` WHERE (`devices`.`user_id` = " + id + ")");
            console.log("------------- ANTES DE PEDIR LOS DISPOSITIVOS -------------------------");
            var result = devices;
            console.log("-------------- DESPUES DE PEDIR LOS DISPOSITIVOS ----------------------");
            // for(var i = 0; i < result.length; i++) {
            //     result[i].company_name = result[i].users.company_name;
            // }
            console.log("result:  ", result);
            return result;
         }catch(error){console.log(error);}
    },

    getGroups: async function(id) {
        // let query = "SELECT `peripheral_gps_data`.`lat`,`peripheral_gps_data`.`lng`,`peripheral_gps_data`.`createdAt` FROM `peripheral_gps_data` AS `peripheral_gps_data` INNER JOIN `devices` AS `device` ON `peripheral_gps_data`.`idDevice` = `device`.`idDevice` WHERE date_format(`peripheral_gps_data`.`createdAt`, '%Y-%m-%d')=date_format('" + date + "', '%Y-%m-%d')AND `peripheral_gps_data`.`idDevice`=" + id + " order by `peripheral_gps_data`.`createdAt` ASC;";
        let query = "select distinct dgroup.id as group_id, dgroup.label as group_label, devices.label as device_label, devices.idDevice as device_id, devices.auth_device as auth_device" +
            " from dgroup " +
            "inner join device_group on group_id = dgroup.id " +
            "right join devices on devices.idDevice = device_group.device_id " +
            "inner join peripheral_gps_data on devices.idDevice = peripheral_gps_data.idDevice " +
            "where (dgroup.user_id = " + id + " or dgroup.id is null) and devices.user_id = " + id  + " and (devices.trashed is null or devices.trashed = 0)";
        let data = await db.sequelize.query(query);
        return data[0];
        // try{
        //     var user = await db.users.findOne({
        //         where: { idUser: id },
        //
        //         include: [{
        //             model: db.devicesGroup,
        //             as: "groups"
        //             // include: [{
        //             //     model: db.deviceModel
        //             // }, {
        //             //     model: db.gpsData,order: [['createdAt','DESC']],limit:1
        //             // }
        //             // ]
        //         }]
        //
        //     });
        //     return user.groups;
        // }catch(error){console.log(error);}
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