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

  get resumeDownloadName() {
    const year = new Date().getFullYear();
    const ext = this.resumeUrl.split('.').pop() || 'pdf';
    return `${this.firstName}_${this.lastName}_Resume_${year}.${ext}`;
  },
};
