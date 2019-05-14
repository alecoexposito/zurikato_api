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
            var user = await db.users.findOne({
            where: {
                $and: [
                    { idUser: id },
                ]
            },
            include: [{
                model: db.devices,
                where: { trashed: 0 },
                include: [{
                    model: db.deviceModel
                }, {
                    model: db.gpsData,order: [['createdAt','DESC']],limit:1
                }, {
                    model: db.vehicle
                }
                ]
            }]
            
            });
            console.log("------------- ANTES DE PEDIR LOS DISPOSITIVOS -------------------------");
            var result = user.devices;
            console.log("-------------- DESPUES DE PEDIR LOS DISPOSITIVOS ----------------------");
            for(var i = 0; i < result.length; i++) {
                result[i].company_name = user.company_name;
            }
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