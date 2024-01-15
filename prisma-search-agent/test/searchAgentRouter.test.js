import searchAgentService from '../services/searchAgentService';

describe('createSearchAgent', () => {
  it('creates a search agent', async () => {
    const createdSearchAgent = await searchAgentService.createSearchAgent(
      'testPhone',
      'testEmail',
      'testName',
      'testFilter'
    );

    // Assert
    expect(createdSearchAgent).toEqual(expect.objectContaining({
      id: expect.any(Number),
      phone: 'testPhone',
      email: 'testEmail',
      name: 'testName',
      filter: 'testFilter',
    }));
  });

});


describe('createSearchAgent', () => {
  it('handles a failure scenario', async () => {
    jest.mock('../services/searchAgentService', () => ({
      __esModule: true,
      default: {
        async createSearchAgent(phone, email, name, filter) {
          throw new Error('Simulated failure');
        },
      },
    }));

    await expect(async () =>
      searchAgentService.createSearchAgent('testPhone', 'testEmail', 'testName', 'testFilter')
    ).rejects.toThrow('Simulated failure');
  });

});