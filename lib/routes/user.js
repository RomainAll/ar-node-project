'use strict';

const Joi = require('joi');
const UserModel = require('../models/user');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().min(3).example('John').description('Firstname of the user').required(),
                    lastName: Joi.string().min(3).example('Doe').description('Lastname of the user').required(),
                    password: Joi.string().min(8).example('secretpassword').description('Password of the user').required(),
                    mail: Joi.string().min(8).email().example('John.Doe@gmail.com').description('Mail of the user').required(),
                    username: Joi.string().min(3).example('JohnD').description('Username of the user').required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService, mailService } = request.services();

            const response = await userService.create(request.payload);

            await mailService.sendMail(request.payload.mail, 'Welcome', 'Welcome' + request.payload.firstName + ' ' + request.payload.lastName + '! , you are now registered.');

            return response;
        }
    }, {
        method: 'get',
        path: '/users',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api']
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.list();
        }
    }, {
        method: 'delete',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                })
            },
            handler: async (request, h) => {

                const { userService } = request.services();

                return await userService.deleteById(request.params.id);
            }
        }
    }, {
        method: 'patch',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                }),
                payload: Joi.object({
                    firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().min(8).example('secretpassword').description('Password of the user'),
                    mail: Joi.string().min(8).email().example('John.Doe@gmail.com').description('Mail of the user'),
                    username: Joi.string().min(3).example('JohnD').description('Username of the user'),
                    role: Joi.string().valid('admin', 'user').description('Role of the user')
                })
            },
            handler: async (request, h) => {

                const { userService } = request.services();

                return await userService.update(request.params.id, request.payload);
            }
        }
    }, {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    mail: Joi.string().min(8).email().example('John.Doe@gmail.com').description('Mail of the user').required(),
                    password: Joi.string().min(8).example('secretpassword').description('Password of the user').required()
                })
            },
            handler: async (request, h) => {

                const { userService } = request.services();

                return await userService.login(request.payload);
            }
        }
    }
];
