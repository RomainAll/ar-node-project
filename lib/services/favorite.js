'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {

    async create(movieId, userId) {

        const { Favorite } = this.server.models();
        const { userService, movieService } = this.server.services();

        await userService.findById(userId);
        await movieService.findById(movieId);

        const favorite = await Favorite.query().findOne({ userId, movieId });
        if (favorite) {
            return Boom.badRequest('Movie already added to favorites');
        }

        return await Favorite.query().insert({ userId, movieId });
    }

    async delete(movieId, userId) {

        const { Favorite } = this.server.models();

        const { userService, movieService } = this.server.services();

        await userService.findById(userId);
        await movieService.findById(movieId);

        return Favorite.query().delete().where({ userId, movieId }).throwIfNotFound();
    }

    async list(userId) {

        const { Favorite } = this.server.models();
        const { userService } = this.server.services();

        await userService.findById(userId);

        return await Favorite.query().where('userId', userId);
    }

};
