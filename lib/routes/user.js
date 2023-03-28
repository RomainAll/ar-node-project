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
                    firstName: UserModel.field('firstName').required(),
                    lastName: UserModel.field('lastName').required(),
                    password: UserModel.field('password').required(),
                    mail: UserModel.field('mail').required(),
                    username: UserModel.field('username').required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.create(request.payload);
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
                    id: UserModel.field('id').required()
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
                    id: UserModel.field('id').required()
                }),
                payload: Joi.object({
                    firstName: UserModel.field('firstName'),
                    lastName: UserModel.field('lastName'),
                    password: UserModel.field('password'),
                    mail: UserModel.field('mail'),
                    username: UserModel.field('username'),
                    role: UserModel.field('role')
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
                    mail: UserModel.field('mail').required(),
                    password: UserModel.field('password').required()
                })
            },
            handler: async (request, h) => {

                const { userService } = request.services();

                return await userService.login(request.payload);
            }
        }
    },
    {
        method: 'get',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: UserModel.field('id').required()
                })
            },
            handler: async (request, h) => {

                const { userService } = request.services();

                return await userService.findById(request.params.id);
            }
        }
    }
];
