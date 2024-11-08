import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            secure: false,
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendMail(
        to: string,
        subject: string,
        template: string,
        data: object
    ) {
        try {
            const templatePath = join(
                __dirname,
                'templates',
                `${template}.ejs`
            );
            const tmplt = await fs.readFile(templatePath, 'utf-8');
            const html = ejs.render(tmplt, data);

            const info = await this.transporter.sendMail({
                from: process.env.EMAIL_SENDER,
                to,
                subject,
                html
            });
            console.log('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    }
}
