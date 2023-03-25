'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorite', (table) => {

            table.string('userId').notNull();
            table.string('movieId').notNull();
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorite');
    }
};
