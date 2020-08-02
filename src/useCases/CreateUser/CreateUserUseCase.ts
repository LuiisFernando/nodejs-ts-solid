import { IUsersReposiroty } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUsecase {
    constructor(
        private usersRepository: IUsersReposiroty,
        private mailProvider: IMailProvider
    ) {

    }

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExist = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExist) {
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe',
                email: 'equipe@equipe.com'
            },
            subject: 'Welcome to the app',
            body: '<p>You can loggin at app.</p>'
        });
    }
}