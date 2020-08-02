import nodemailer from 'nodemailer';
import { IMailProvider, IMessage } from "../IMailProvider";
import Mail from 'nodemailer/lib/mailer';

export class MailTrapMailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'host',
            port: 2525,
            auth: {
                user: 'user',
                pass: 'pass'
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