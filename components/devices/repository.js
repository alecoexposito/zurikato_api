var db = require('../../lib/db/db');
const repository = {
    history: async function(id, startDate, endDate) {
        let query = "SELECT date_format(`peripheral_gps_data`.`createdAt`,'%Y-%m-%d %H:%i:%s') as day,`peripheral_gps_data`.`lat`,`peripheral_gps_data`.`lng`, peripheral_gps_data.speed as speed, peripheral_gps_data.orientation_plain as orientation_plain FROM `peripheral_gps_data` AS `peripheral_gps_data` INNER JOIN `devices` AS `device` ON `peripheral_gps_data`.`idDevice` = `device`.`idDevice` WHERE str_to_date(`peripheral_gps_data`.`createdAt`, '%Y-%m-%d %H:%i:%s') BETWEEN str_to_date('" + startDate + "', '%Y-%m-%d %H:%i:%s') AND str_to_date('" + endDate + "', '%Y-%m-%d %H:%i:%s') AND `peripheral_gps_data`.`idDevice`=" + id + " order by str_to_date(`peripheral_gps_data`.`createdAt`,'%Y-%m-%d %H:%i:%s') ASC;";
        let data = await db.sequelize.query(query);
        return data[0];
    },
    routes: async function(id, date) {
        let query = "SELECT `peripheral_gps_data`.`lat`,`peripheral_gps_data`.`lng`,`peripheral_gps_data`.`createdAt` FROM `peripheral_gps_data` AS `peripheral_gps_data` INNER JOIN `devices` AS `device` ON `peripheral_gps_data`.`idDevice` = `device`.`idDevice` WHERE date_format(`peripheral_gps_data`.`createdAt`, '%Y-%m-%d')=date_format('" + date + "', '%Y-%m-%d')AND `peripheral_gps_data`.`idDevice`=" + id + " order by `peripheral_gps_data`.`createdAt` ASC;";
        let data = await db.sequelize.query(query);
        return data[0];
    },
    speedAverage: async function(id, startDate, endDate) {
        let query = "SELECT sum(speed)/count(1) as data, date_format(createdAt, '%m/%d/%Y %H') as label " +
            " FROM `peripheral_gps_data` AS `peripheral_gps_data` " +
            " WHERE str_to_date(`peripheral_gps_data`.`createdAt`, '%Y-%m-%d %H:%i:%s') BETWEEN str_to_date('" + startDate + "', '%Y-%m-%d %H:%i:%s') AND str_to_date('" + endDate + "', '%Y-%m-%d %H:%i:%s') AND `peripheral_gps_data`.`idDevice`=" + id + " " +
            " group by date_format(createdAt, '%m/%d/%Y %H');";
        let data = await db.sequelize.query(query);
        return data[0];
    },
    alarmsByType: async function(id, startDate, endDate) {
        let query = "SELECT count(1) as data, alarm_code.readable as label " +
            " FROM alarm " +
            " inner join alarm_code on alarm.code = alarm_code.id " +
            " WHERE alarm_code.code in (100, '000') and str_to_date(`alarm`.`createdAt`, '%Y-%m-%d %H:%i:%s') BETWEEN str_to_date('" + startDate + "', '%Y-%m-%d %H:%i:%s') AND str_to_date('" + endDate + "', '%Y-%m-%d %H:%i:%s') AND `alarm`.`device`=" + id + " " +
            " group by alarm_code.readable;";
        let data = await db.sequelize.query(query);
        return data[0];
    },
    coordinatesByDates: async function(id, startDate, endDate) {
        let query = "SELECT date_format(`peripheral_gps_data`.`createdAt`,'%Y-%m-%d %H:%i:%s') as day,`peripheral_gps_data`.`lat`,`peripheral_gps_data`.`lng` FROM `peripheral_gps_data` AS `peripheral_gps_data` INNER JOIN `devices` AS `device` ON `peripheral_gps_data`.`idDevice` = `device`.`idDevice` WHERE str_to_date(`peripheral_gps_data`.`createdAt`, '%Y-%m-%d %H:%i:%s') BETWEEN str_to_date('" + startDate + "', '%Y-%m-%d %H:%i:%s') AND str_to_date('" + endDate + "', '%Y-%m-%d %H:%i:%s') AND `peripheral_gps_data`.`idDevice`=" + id + " order by str_to_date(`peripheral_gps_data`.`createdAt`,'%Y-%m-%d %H:%i:%s') ASC;";
        let data = await db.sequelize.query(query);
        return data[0];
    }
};
module.exports = repository;