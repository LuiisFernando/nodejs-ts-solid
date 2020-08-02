import nodemailer from 'nodemailer';
import { IMailProvider, IMessage } from "../IMailProvider";
import Mail from 'nodemailer/lib/mailer';

export class MailTrapMailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '4d331371021f3e',
                pass: '3e856096bf5ed3'
            }
        });
    }

    async sendMail(message: IMessage): Promise<void> {
        this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body
        });
    }
}