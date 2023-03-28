'use strict';

require('dotenv').config();
const Nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

module.exports = class MailService extends Service {
    async sendMail(to, subject, html) {

        const transporter = Nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            html
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to}`);
        }
        catch (error) {
            console.error(`Failed to send email to ${to}: ${error.message}`);
        }
    }

    async newMovieMail(movie) {

        const { userService } = this.server.services();
        const users = await userService.list();
        const toList = users.map((user) => user.mail);

        await this.sendMail(toList, 'New movie', `The movie ${movie.title} has been added to catalog`);
    }

    async updateMovieMail(movie) {

        const { Favorite } = this.server.models();
        const { userService } = this.server.services();

        const favorites = await Favorite.query().where('movieId', movie.id);
        const toList = [];

        for (const favorite of favorites) {

            const user = await userService.findById(favorite.userId);
            if (user) {

                toList.push(user.mail);
            }
        }

        if (toList.length > 0) {

            await this.sendMail(toList, 'Favorite movie edited', `Your favorite movie ${movie.title} has been updated`);
        }
    }
};
