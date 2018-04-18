import { CapitalizePipe } from './capitalize.pipe';
import { TestBed, inject, async } from '@angular/core/testing';

describe('CapitalizePipe', () => {
  let pipe;
  
  //setup
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ CapitalizePipe ]
  }));
  
  beforeEach(inject([CapitalizePipe], p => {
    pipe = p;
  }));
  
  //specs
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should work with empty string', () => {
    expect(pipe.transform('')).toEqual('');
  });
  
  it('should capitalise', () => {
    expect(pipe.transform('wow')).toEqual('WOW');
  });
  
  it('should throw with invalid values', () => {
    //must use arrow function for expect to capture exception
    expect(()=>pipe.transform(undefined)).toThrow();
    expect(()=>pipe.transform()).toThrow();
    expect(()=>pipe.transform()).toThrowError('Requires a String as input');
  });
});
