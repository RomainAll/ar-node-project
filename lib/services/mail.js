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

        for (const user of users) {

            await this.sendMail(user.mail, 'New movie', `The movie ${movie.title} has been added to catalog`);
        }
    }

    async updateMovieMail(movie) {

        const { Favorite, User } = this.server.models();

        const favorites = await Favorite.query().where('movieId', movie.id);

        for (const favorite of favorites) {

            const user = await User.query().findById(favorite.userId);
            if (user) {

                await this.sendMail(user.mail, 'Favorite movie edited', `Your favorite movie ${movie.title} has been updated`);
            }
        }
    }


};
