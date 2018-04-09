var customers = {

    getAll: function(req, res) {
        var allCustomers = [];
        res.json(allCustomers);
    },

    getDetails: function(req, res) {
        var id = req.params.id;
        var customer = '';
        res.json(customer);
    },

    create: function(req, res) {
        var newCustomer = req.body;
        res.json(newCustomer);
    },

    update: function(req, res) {
        var updateCustomer = req.body;
        var id = req.params.id;
        res.json(updateCustomer);
    },

    delete: function(req, res) {
        var id = req.params.id;
        data.splice(id, 1)
        res.json(true);
    }
};

module.exports = customers;