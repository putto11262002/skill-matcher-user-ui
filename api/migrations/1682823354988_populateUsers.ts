import { Db } from 'mongodb'
import { MigrationInterface } from 'mongo-migrate-ts';
import { CreateUserDto } from '../src/modules/user/dtos/requests/create-user.dto';
import * as bcrypt from 'bcryptjs';
const users  = require('./data/user-data.json') as Array<CreateUserDto>
export class populateUsers1682823354988 implements MigrationInterface {
  public async up(db: Db): Promise<any> {
    
    const processedUsers =  await Promise.all(users.map(async user => {
      const salt = await bcrypt.genSalt();
      const hashed =  await bcrypt.hash(user.password, salt);
      
      return {...user, password: hashed}
    }))

    await db.collection('users').insertMany(processedUsers);
  }

  public async down(db: Db): Promise<any> {
    await db.collection('users').deleteMany({username: {$in: users.map(user => user.username)}});
  }
}
