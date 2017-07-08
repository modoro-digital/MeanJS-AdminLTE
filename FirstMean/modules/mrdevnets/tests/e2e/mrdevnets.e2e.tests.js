'use strict';

describe('Mrdevnets E2E Tests:', function () {
  describe('Test Mrdevnets page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/mrdevnets');
      expect(element.all(by.repeater('mrdevnet in mrdevnets')).count()).toEqual(0);
    });
  });
});
