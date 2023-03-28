'use strict';

const Joi = require('joi');
const MovieModel = require('../models/movie');

module.exports = [
    {
        method: 'post',
        path: '/movie',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: MovieModel.field('title').required(),
                    description: MovieModel.field('description').required(),
                    releaseDate: MovieModel.field('releaseDate').required(),
                    director: MovieModel.field('director').required()
                })
            }
        },
        handler: async (request, h) => {

            const { movieService } = request.services();

            return await movieService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/movies',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api']
        },
        handler: async (request, h) => {

            const { movieService } = request.services();

            return await movieService.list();
        }
    },
    {
        method: 'patch',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: MovieModel.field('id').required()
                }),
                payload: Joi.object({
                    title: MovieModel.field('title'),
                    description: MovieModel.field('description'),
                    releaseDate: MovieModel.field('releaseDate'),
                    director: MovieModel.field('director')
                })

            }
        },
        handler: async (request, h) => {

            const { movieService } = request.services();

            return await movieService.update(request.params.id, request.payload);
        }
    },
    {
        method: 'delete',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: MovieModel.field('id').required()
                })
            }
        },
        handler: async (request, h) => {

            const { movieService } = request.services();

            return await movieService.deleteById(request.params.id);
        }
    },
    {
        method: 'get',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: MovieModel.field('id').required()
                })
            }
        },
        handler: async (request, h) => {

            const { movieService } = request.services();

            return await movieService.findById(request.params.id);
        }
    }
];
