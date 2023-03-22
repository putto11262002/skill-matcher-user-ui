# Skill Matcher

___

## About Our Project

Our project is to develop an app that could assist members of the university to exchange skills and knowledge. The app
would match users based on their desired skills to learn and skills they possess. With this app, users could connect
with other users who possess the knowledge they seek to acquire, while also sharing their own skills with others.

## Stakeholders

- **User**: A university student or staff could sign up to use the application as a user. Within the application a user
  could be a learner and/or a tutor. It’s important to consider their needs as high priority when designing the user
  interface and features for the app.
    - **Learner**: a user that seeks to learn skills from other users tutors
    - **Tutor**: a user that offers to share their knowledge to other users.
- **University Staff**: They would be interested in using the application and providing input on security concerns and
  data privacy revolved around student information.
- **App administrator**: would be responsible for managing the app’s backend ensuring its smooth operation. They may
  handle tasks such as user management, maintenance, and troubleshooting.
- **Developers**: Would be responsible for building and maintaining the app. There may be a need for collaboration with
  other stakeholders to ensure the app meets their needs.

## Functional Requirements

- **Sign-up and log-in**: User shall be able to signup and login with username/email
- **Profile creation**: Users shall be able to create a profile with information about their skills, interests, and
  skills
  they hope to acquire.
- **Privacy settings**: Users shall be allowed to control what information is visible on their profile and who can
  contact
  them in their privacy or profile settings.
- **Search and filter options**: Learner shall be able to search/browse/filter tutors by skills, location etc..
- **Matching**: A User should be able to match with other users based on the skill they possess and the skill they want
  to
  acquire.
- **Skill verification**: Users shall be able to upload certificates, completing assessments, or indications related to
  their skills for verification purposes.
- **Messaging**: User shall be able to message each other when they are matched.
- **Contact details**: A user contact details shall only be visible to other matched users.
- **Unmatching**: Users should be able to unmatch with people they’ve matched with.
- **Match history**: Users should be able to view their match history and interact with those users.
- **Feedback system**: Allow users to rate and comment on their experiences/interactions with users they’ve
  matched with. It can help with improving the matching algorithm and ensure that users are matched with the most
  suitable partners.
- **Notification system**: The system shall send notification emails to users when they match with someone, receive a
  message, or if there’s a change to their profile.
- **Reporting system**: Allow users to report inappropriate behaviour or content. Also, we have to ensure that we have a
  plan in place to handle user reports and how we enforce community guidelines.
- **Scheduling meeting**:  Users shall be able to schedule sessions with their matches.
- **Matching suggestion**: The system shall provide users with matching recommendations. This recommendation should be
  done based on the skills the user possesses and the skills the user wants to learn.

## Non-Functional Requirement

- **Availability**: The system should be available 90% of the time, apart from scheduled system maintenance and updates.
- **Performance**: The system should be handle high traffic of up to 25k+
  users ([21000+ students and up to 25,000+](https://www.otago.ac.nz/about/quickstats.html#6)). Initial page loading
  times should be roughly two seconds.
- **Scalability**: The system should be designed to automatically scale as the user base grows. The current university
  student and staff population is roughly at 25,000+. The application should be able to handle a large number of
  concurrent users without compromising performance.
- **Usability**: The design of the user interface to be intuitive enough for user to navigate around without any
  previous training. The user interface should be responsive - being able to adjust to support laptop, tablet and mobile
  screen.
- **Security**: User personal information should be encrypted at rest and in transit.

## User Stories

1. **Creating an account**: As a user, I want to be able to easily create an account and sign in with my university email address or username so I can start teaching or learning a skill.
2. **Create Profile**: As a user, I want to be able to input my details and upload my profile image.
3. **Adding qualifications/skills**: As a tutor, I want to be able to add the skill/s and qualifications to my profile so that learners can find me based on my experience and expertise.
4. **Adding skills**: As a learner, I want to be able to add the skills that I want to learn on my profile so tutors can find me and also have an idea of my preferences, interests and needs.
5. **Matching**: As a user, I want to match with other users who possess the skills I want to learn and desire to learn the skills I possess.
6. **Search skills**: As a user, I want to be able to search and filter other users by their skills they want to learn and the skill they possess .
7. **Viewing Profile**: As a learner, I want to be able to see detailed information about each tutor I'm matched with, including their qualifications, experience, and reviews, so I can choose who's more suitable based on my needs.
8. **Messaging: As a learner**, I want to be able to message the tutor I have matched with so we can discuss goals, schedules, and questions and arrange meetings.
9. **Rating tutor**: As a learner, I want to be able to rate my tutor after each session so other students can benefit from my experience and make informed decisions with my matches.
10. **Rating learner**: As a tutor, I want to be able to rate my learner after each session so other tutors can make informed decisions about a match.
11. **Viewing reviews**: As a user, I want to be able to see the other users' ratings and reviews from other users so I can decide if I wish to accept a match.
12. **Matching history**: As a user, I want to be able to view a record of my past matches so I can keep track of my progress and plan future sessions more effectively.
13. **Abuse report**: As a user, I want to be able to report inappropriate behavior or violations of the app policies by other users so that it protects others and creates a safe space and community for users.  
14. **Monitor abuse report**: As an admin, I want to be able to review user reports for inappropriate behavior to make sure they are reasonable and take appropriate action if necessary so the app remains a trusted and reliable platform for learning and teaching.
15. **Accounts Suspension**: As an admin, I want to be able to suspend user accounts if they have violated the app rules so that the community stays safe and respectful.
16. **Activity monitor**: As an admin, I want to be able to monitor the app's usage and performance (e.g., number of users, server uptime, etc.) so that I can ensure the app is running smoothly.
17. **Unmatching**: As a user, I want to have the option to unmatch with a user I've matched with because I've changed my mind.
18. **Deleting account**: As a user, I want to be able to delete my account and all associated data so I can easily leave the app when I no longer need it.
19. **Updating skills**: As a user, I want to be able to update my skills and their proficiency levels on my profile at any time, so I can find suitable matches to improvise my learning or teaching experience.
20. **Scheduling and Calendar integrations**: As a learner/tutor I want to be able to schedule sessions with our matches.
21. **Matching suggestion**: As a user I want the system to recommend other users that have the skills I want to learn and want to learn the skills I possess.

## Feasibility Study

## High-level Class diagram

## Architecture Diagram
