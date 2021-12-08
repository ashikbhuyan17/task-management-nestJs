import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User) // for User repository
export class UserRepository extends Repository<User> {}
