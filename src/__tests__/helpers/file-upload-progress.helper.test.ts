import { updateFileUploadProgress } from 'helpers/file-upload-progress.helper';

const setState = jest.fn();

describe('test for file-upload-progress helper', () => {
  it('should return file progress', () => {
    updateFileUploadProgress({ total: 100, loaded: 10 } as ProgressEvent, setState);

    expect(setState).toHaveBeenCalledWith(10);
  });
});
