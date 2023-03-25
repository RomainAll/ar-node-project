'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class MovieService extends Service {

    create(movie) {

        const { Movie } = this.server.models();

        return Movie.query().insertAndFetch(movie);
    }

    list() {

        const { Movie } = this.server.models();

        return Movie.query();
    }

    deleteById(id) {

        const { Movie } = this.server.models();

        return Movie.query().deleteById(id);
    }

    update(id, movie) {

        const { Movie } = this.server.models();

        return Movie.query().patchAndFetchById(id, movie);
    }
};
