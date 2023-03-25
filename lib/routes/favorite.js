'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = [
    {
        method: 'post',
        path: '/movie/{id}/favorite',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                })
            }
        },
        handler: async (request, h) => {

            const { favoriteService } = request.services();

            return await favoriteService.create(request.params.id, request.auth.credentials.id);
        }
    },
    {
        method: 'delete',
        path: '/movie/{id}/favorite',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                })
            }
        },
        handler: async (request, h) => {

            const { favoriteService } = request.services();

            return await favoriteService.delete(request.params.id, request.auth.credentials.id);
        }
    },

    {
        method: 'get',
        path: '/user/{id}/favorites',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).required()
                })
            }
        },
        handler: async (request, h) => {

            const { favoriteService } = request.services();

            if (request.auth.credentials.id !== request.params.id && request.auth.credentials.scope !== 'admin') {
                return Boom.unauthorized('You are not allowed to access this resource');
            }

            return await favoriteService.list(request.params.id);
        }
    }
];
