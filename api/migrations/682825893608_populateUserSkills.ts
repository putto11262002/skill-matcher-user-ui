import { Db } from 'mongodb'
import { MigrationInterface } from 'mongo-migrate-ts';
import { CreateSkillDto } from '../src/modules/skill/dtos/requests/create-skill.dto';
import { CreateUserDto } from '../src/modules/user/dtos/requests/create-user.dto';
const skills  = require('./data/skill-data.json') as Array<CreateSkillDto>
const users = require('./data/user-data.json') as Array<CreateUserDto>
export class populateUserSkills1682825893608 implements MigrationInterface {
  public async up(db: Db): Promise<any> {


    function generateRandomUniqueIndexes(array, count) {
      // Create an array to store the random indexes.
      const indexes = [];

      // Loop until the array has the desired number of indexes.
      while (indexes.length < count) {
        // Generate a random index.
        const index = Math.floor(Math.random() * array.length);

        // Check if the index is already in the array.
        if (!indexes.includes(index)) {
          // Add the index to the array.
          indexes.push(index);
        }
      }

      // Return the array of random indexes.
      return indexes;
    }


    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // const users = await db.collection('users').find();

    // const usersArr = await users.toArray();

    

    for(let user of users){
      const indexes = generateRandomUniqueIndexes(skills, 4)
      const selectedSkills = indexes.map(indexes => skills[indexes]);
      const existingUser = await db.collection('users').findOne({username: user.username});
      // existingUser.profile.skills = selectedSkills;
      await db.collection('users').updateOne({_id: existingUser._id}, {$push: {"profile.skills": {$each: selectedSkills.map(s => s.name)}}} )
      for(let selectedSkill of selectedSkills){
        await db.collection('userskills').insertOne({userId: existingUser._id, skill: selectedSkill.name, proficiency: getRandomNumber(0, 10), role: getRandomNumber(0, 1) === 1 ? 'tutor' : 'learner'})
      }
    }



  }

  public async down(db: Db): Promise<any> {
    await db.collection('userskills').deleteMany({});
  }
}


