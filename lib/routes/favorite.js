'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');
const UserModel = require('../models/user');
const MovieModel = require('../models/movie');

module.exports = [
    {
        method: 'post',
        path: '/movie/{movieId}/favorite',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    movieId: MovieModel.field('id').required()
                })
            }
        },
        handler: async (request, h) => {

            const { favoriteService } = request.services();

            return await favoriteService.create(request.params.movieId, request.auth.credentials.id);
        }
    },
    {
        method: 'delete',
        path: '/movie/{movieId}/favorite',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    movieId: MovieModel.field('id').required()
                })
            }
        },
        handler: async (request, h) => {

            const { favoriteService } = request.services();

            return await favoriteService.delete(request.params.movieId, request.auth.credentials.id);
        }
    },

    {
        method: 'get',
        path: '/user/{userId}/favorites',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    userId: UserModel.field('id').required()
                })
            }
        },
        handler: async (request, h) => {

            const { favoriteService } = request.services();

            if (request.auth.credentials.id !== request.params.userId && request.auth.credentials.scope !== 'admin') {
                return Boom.unauthorized('You are not allowed to access this resource');
            }

            return await favoriteService.list(request.params.userId);
        }
    }
];
