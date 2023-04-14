
const skillsData = [  {    name: "communication",    description: "The ability to convey information to others clearly and effectively.",    status: "approved",    relatedSkills: ["active listening", "public speaking"]
},
{
  name: "leadership",
  description: "The ability to inspire and guide others towards a common goal.",
  status: "approved",
  relatedSkills: ["team management", "empathy"]
},
{
  name: "problem solving",
  description: "The ability to identify and overcome obstacles in order to achieve a goal.",
  status: "approved",
  relatedSkills: ["creativity", "analytical thinking"]
},
{
  name: "time management",
  description: "The ability to prioritize tasks and use time effectively.",
  status: "approved",
  relatedSkills: ["goal setting", "focus"]
},
{
  name: "adaptability",
  description: "The ability to adjust to changing circumstances and environments.",
  status: "approved",
  relatedSkills: ["resilience", "flexibility"]
},
{
  name: "empathy",
  description: "The ability to understand and share the feelings of others.",
  status: "approved",
  relatedSkills: ["active listening", "compassion"]
},
{
  name: "critical thinking",
  description: "The ability to evaluate information and make judgements based on evidence.",
  status: "approved",
  relatedSkills: ["problem solving", "analytical thinking"]
},
{
  name: "creativity",
  description: "The ability to generate original and innovative ideas.",
  status: "approved",
  relatedSkills: ["problem solving", "open-mindedness"]
},
{
  name: "teamwork",
  description: "The ability to work collaboratively with others towards a shared goal.",
  status: "approved",
  relatedSkills: ["communication", "leadership"]
},
{
  name: "flexibility",
  description: "The ability to adapt and adjust to changing circumstances.",
  status: "approved",
  relatedSkills: ["adaptability", "resilience"]
},
{
  name: "analytical thinking",
  description: "The ability to examine and break down information in order to understand it.",
  status: "approved",
  relatedSkills: ["critical thinking", "problem solving"]
},
{
  name: "focus",
  description: "The ability to concentrate on a task and avoid distractions.",
  status: "approved",
  relatedSkills: ["time management", "productivity"]
},
{
  name: "resilience",
  description: "The ability to bounce back from setbacks and overcome challenges.",
  status: "approved",
  relatedSkills: ["adaptability", "perseverance"]
},
{
  name: "active listening",
  description: "The ability to fully focus on and comprehend what someone is saying.",
  status: "approved",
  relatedSkills: ["communication", "empathy"]
},
{
  name: "goal setting",
  description: "The ability to set and achieve specific objectives.",
  status: "approved",
  relatedSkills: ["time management", "planning"]
},
{
  name: "planning",
  description: "The ability to devise a strategy and organize resources in order to achieve a goal.",
  status: "approved",
  relatedSkills: ["goal setting", "time management"]
}]
module.exports = {

  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});


  db.collection('skills').insertMany(skillsData)

  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    db.collection('skills').deleteMany({name: {$in: skillsData.map(skill => skill.name)}})
  }
};
