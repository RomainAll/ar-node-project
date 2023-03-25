'use strict';

const Joi = require('joi');

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
                    title: Joi.string().min(1).example('The Matrix').description('Title of the movie').required(),
                    description: Joi.string().min(10).example('A movie about a hacker').description('Description of the movie').required(),
                    releaseDate: Joi.date().example('1999-03-31').description('Release date of the movie').required(),
                    director: Joi.string().min(3).example('Spilberg').description('Director of the movie').required()
                })
            }
        },
        handler: async (request, h) => {

            const { movieService, mailService } = request.services();

            const movie = await movieService.create(request.payload);

            if (movie) {
                await mailService.newMovieMail(movie);
            }

            return movie;
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
                    id: Joi.number().integer().greater(0).required()
                }),
                payload: Joi.object({
                    title: Joi.string().min(1).example('The Matrix').description('Title of the movie'),
                    description: Joi.string().min(10).example('A movie about a hacker').description('Description of the movie'),
                    releaseDate: Joi.date().example('1999-03-31').description('Release date of the movie'),
                    director: Joi.string().min(3).example('Spilberg').description('Director of the movie')
                })

            }
        },
        handler: async (request, h) => {

            const { movieService, mailService } = request.services();

            const movie = await movieService.update(request.params.id, request.payload);

            if (movie) {
                await mailService.updateMovieMail(movie);
            }

            return movie;
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
                    id: Joi.number().integer().greater(0).required()
                })
            }
        },
        handler: async (request, h) => {

            const { movieService } = request.services();

            return await movieService.deleteById(request.params.id);
        }
    }
];
