export const USER_SKILL_ROLE = {
    LEARNER: 'learner',
    TUTOR: 'tutor'
}

export const NOT_ALLOW_UPDATE_FIELDS = ['skill', 'userId', '_id']

export const NOT_ALLOW_SELF_UPDATE_FIELDS = []

export const USER_SKILL_LIMIT = 10

export const USER_SKILL_EVENT = {
    ADDED: 'user-skill.added',
    UPDATED: 'user-skill.updated',
    REMOVED: 'user-skill.removed'
}