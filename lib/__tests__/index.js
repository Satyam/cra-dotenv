jest.mock('fs');

const { pickReactApp, webpackDefine } = require('..');

describe('no NODE_ENV', () => {
  beforeEach(() => {
    delete process.env.NODE_ENV;
  });
  it('should ask for .env only', () => {
    pickReactApp();
  });
});
