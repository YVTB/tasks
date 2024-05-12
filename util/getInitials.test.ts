import { getInitials } from './getInitials';

describe('getInitials', () => {
  it('should return the correct initials for a given name', () => {
    expect(getInitials('John Doe')).toEqual('JD');
  });

  it('should return the correct initials for a multi-word name', () => {
    expect(getInitials('John Michael Doe')).toEqual('JMD');
  });

  it('should handle single names correctly', () => {
    expect(getInitials('John')).toEqual('J');
  });

  it('should return an empty string if no name is provided', () => {
    expect(getInitials('')).toEqual('');
  });

  it('should handle names with extra spaces correctly', () => {
    expect(getInitials('  John  Doe ')).toEqual('JD');
  });

  it('should correctly interpret names with middle initials', () => {
    expect(getInitials('John Q. Doe')).toEqual('JQD');
  });
});

