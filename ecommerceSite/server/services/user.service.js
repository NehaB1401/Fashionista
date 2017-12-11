var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
//service.delete = _delete;
service.updateUser = _delete;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            let userCart = user.cart;
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret),
                cart : userCart
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(productsParam , userParam ) {
    var deferred = Q.defer();
    console.log("Inside server service");
    console.log(productsParam);
   // console.log(productParam._id);
    console.log(userParam._id);
   
    db.users.findById(userParam._id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            console.log(user.firstName);
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    updateUser();

                    
                });
        } 
    });

    function updateUser() {
      
        // fields to update
        var set = {
            
            username: userParam.username 
        };
        var push = {
           cart:{
            productName : productsParam.productName,
            productPrice : productsParam.price,
            cartQuantity : productsParam.totalAvailability
                }
    };
       
       
        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }
        let userTestCart = userParam.cart;
        
       // console.log(userParam.cart);
        db.users.update(
           { _id: mongo.helper.toObjectID(userParam._id) },
           
          { $set : set,  $push : push},
          
        
           

           
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
 

function _delete(productName , userParam ) {
    var deferred = Q.defer();
    
   console.log("Inside final service"+userParam._id+""+productName);
    db.users.findById(userParam._id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            console.log(user.firstName);
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                    
                    removeObject();
                });
        } else {
            removeObject();
        }
    });

    function removeObject() {
       
        var set = {
            
            username: userParam.username    
        };
       var pull = {
           cart :{
              
           }
       }

       
        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }
        let userTestCart = userParam.cart;
        
       // console.log(userParam.cart);
        db.users.update(
           { _id: mongo.helper.toObjectID(userParam._id) },
           
          { $set : set,  $set : pull},
           
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });

            console.log(JSON.stringify(userParam));
    }
  return deferred.promise;
}