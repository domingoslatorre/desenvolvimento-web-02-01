import { expect } from 'chai';
// import "chai/register-expect"

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      const numbers = [1, 2, 3];
      expect(numbers.indexOf(4)).to.equal(-1);
    });
  });
});
