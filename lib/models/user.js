'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            password: Joi.string().min(8).example('secretpassword').description('Password of the user'),
            mail: Joi.string().min(8).email().example('John.Doe@gmail.com').description('Mail of the user'),
            username: Joi.string().min(3).example('JohnD').description('Username of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            role: Joi.string().valid('admin', 'user').description('Role of the user')
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.role = 'user';
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

    static get jsonAttributes() {

        return ['scope'];
    }

};
