export const site = {
  firstName: 'Trisha',
  lastName: 'Agarwal',
  title: 'UX/UI Designer',
  email: 'designwithtrisha@gmail.com',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/heytrisha',
    linkedin: 'https://www.linkedin.com/in/trishaaga',
    behance: 'https://www.behance.net/trishaagarwal4',
  },

  get fullName() { return `${this.firstName} ${this.lastName}`; },
};
