'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    async create(movie) {

        const { Movie } = this.server.models();
        const { mailService } = this.server.services();

        const movieCreated = await Movie.query().insertAndFetch(movie);

        if (movieCreated) {
            await mailService.newMovieMail(movieCreated);
        }

        return movieCreated;
    }

    list() {

        const { Movie } = this.server.models();

        return Movie.query();
    }

    deleteById(id) {

        const { Movie } = this.server.models();

        return Movie.query().deleteById(id).throwIfNotFound();
    }

    async update(id, movie) {

        const { Movie } = this.server.models();
        const { mailService } = this.server.services();

        const movieUpdated = await Movie.query().patchAndFetchById(id, movie).throwIfNotFound();
        if (movieUpdated) {
            await mailService.updateMovieMail(movieUpdated);
        }

        return movieUpdated;
    }

    findById(id) {

        const { Movie } = this.server.models();

        return Movie.query().findById(id).throwIfNotFound();
    }
};
