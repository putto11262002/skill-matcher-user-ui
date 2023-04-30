import { Db } from 'mongodb'
import { MigrationInterface } from 'mongo-migrate-ts';
const skills = require('./data/skill-data.json');
export class populateSkills1682823347830 implements MigrationInterface {
  public async up(db: Db): Promise<any> {
    await db.collection('skills').insertMany(skills)
  }

  public async down(db: Db): Promise<any> {
    await db.collection('skills').deleteMany({name: {$in: skills.map(skill => skill.name)}})
  }
}
