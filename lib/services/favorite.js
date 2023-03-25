'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {

    async create(movieId, userId) {

        const { Movie, User, Favorite } = this.server.models();

        const movie = await Movie.query().findById(movieId);
        if (!movie) {
            return Boom.badRequest('Movie not found');
        }

        const user = await User.query().findById(userId);
        if (!user) {
            return Boom.badRequest('User not found');
        }

        const favorite = await Favorite.query().findOne({ userId, movieId });
        if (favorite) {
            return Boom.badRequest('Movie already added to favorites');
        }

        // return Favorite.query().insertAndFetch({ userId, movieId });

        return await Favorite.query().insert({ userId, movieId });
    }

    async delete(movieId, userId) {

        const { Movie, User, Favorite } = this.server.models();

        const movie = await Movie.query().findById(movieId);
        if (!movie) {
            return Boom.badRequest('Movie not found');
        }

        const user = await User.query().findById(userId);
        if (!user) {
            return Boom.badRequest('User not found');
        }

        const favorite = await Favorite.query().findOne({ userId, movieId });
        if (!favorite) {
            return Boom.badRequest('Movie not found in favorites');
        }

        return Favorite.query().delete().where({ userId, movieId });
    }

    async list(userId) {

        const { User, Favorite } = this.server.models();

        const user = await User.query().findById(userId);
        if (!user) {
            return Boom.badRequest('User not found');
        }

        return await Favorite.query().where('userId', userId);
    }

};
