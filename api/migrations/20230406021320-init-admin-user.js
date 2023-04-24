const bcrypt = require("bcryptjs")
module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    try{
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(process.env.ROOT_USER_PASSWORD, salt)
      await db.collection("users").insertOne({username: process.env.ROOT_USER_USERNAME, password: hashed, role: "admin", status: "active", createdAt: Date.UTC, updatedAt: Date.UTC})
    
     }catch{
      console.log("Cannot insert admin user")
     }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    console.log(`Deleting ${process.env.ROOT_USER_USERNAME}`)
    await db.collection("users").deleteOne({username: process.env.ROOT_USER_USERNAME})
  }
};
