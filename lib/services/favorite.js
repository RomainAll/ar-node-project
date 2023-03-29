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

    delete(movieId, userId) {

        const { Favorite } = this.server.models();

        return Favorite.query().delete().where({ userId, movieId }).throwIfNotFound();
    }

    async list(userId) {

        const { Favorite } = this.server.models();
        const { userService } = this.server.services();

        await userService.findById(userId);

        return await Favorite.query().where('userId', userId);
    }

    deleteAllForUser(userId) {

        const { Favorite } = this.server.models();

        return Favorite.query().delete().where('userId', userId);
    }

    deleteAllForMovie(movieId) {

        const { Favorite } = this.server.models();

        return Favorite.query().delete().where('movieId', movieId);
    }

};
