export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy' 
  },

  reporters: [
    'default', 
    ['jest-html-reporter', { 
      pageTitle: 'Test Report', 
      outputPath: './test-report.html', 
    }],
  ],
};