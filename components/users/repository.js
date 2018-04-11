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
    getDevices: async function(id) {
         try{
            var user = await db.users.findOne({
            where: { idUser: id },
            //
            include: [{
                model: db.devices,
                include: [{
                        model: db.deviceModel
                    }, {
                        model: db.gpsData,order: [['createdAt','DESC']],limit:1
                    }
                ]
            }]
            
        });
        return user.devices;
         }catch(error){console.log(error);}
    },

    getGroups: async function(id) {
        try{
            var user = await db.users.findOne({
                where: { idUser: id },

                include: [{
                    model: db.devicesGroup,
                    as: groups
                    // include: [{
                    //     model: db.deviceModel
                    // }, {
                    //     model: db.gpsData,order: [['createdAt','DESC']],limit:1
                    // }
                    // ]
                }]

            });
            return user.groups;
        }catch(error){console.log(error);}
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