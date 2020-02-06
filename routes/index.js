var express = require('express');
var router = express.Router();
const upload = multer();


var auth = require('../controllers/auth.js');
var devices = require('../controllers/devices.js');
var admin = require('../controllers/admin.js');
var shared = require('../controllers/shared.js');

router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/profile/:id', auth.profile);

router.get('/gov/vehicles-only-gps', devices.getDevicesLastData);
router.get('/mdvr/video-url/:imei', devices.getVideoUrl);
router.get('/shared-screen/:id', shared.getSharedScreen);
router.post('/save-share', shared.saveShared);
// router.post('/resend', admin.resend)


router.get('/devices', devices.getAll);
/*router.get('/device/:id', devices.getDetails);
router.post('/device/', devices.create);
router.put('/device/:id', devices.update);
router.delete('/device/:id', devices.delete);*/

router.get('/admin/customers', admin.getAllCustomers);
router.get('/admin/customer/:id', admin.getCustomerDetails);
router.post('/admin/customer/create', admin.createCustomer);
router.put('/admin/customer/:id', admin.updateCustomer);
router.delete('/admin/customer/:id', admin.deleteCustomer);

router.get('/admin/devices', devices.all);
router.get('/admin/device/:id', devices.getDetails);
router.post('/admin/device/create', devices.create);
router.put('/admin/device/:id', devices.update);
router.delete('/admin/device/:id', devices.delete);

router.get('/admin/device-models', devices.models);

require('../components/users/routes')(router);
require('../components/gps/routes')(router);
require('../components/devices/routes')(router);
require('../components/alarm/routes')(router);
// require('../components/shared/routes')(router);

router.post('/modem-query', admin.logModem);

router.post('/upload-ts-file', upload.none(),  admin.uploadFile);


module.exports = router;
