import { wordReader } from '../../../src/react/hooks/useFileManager';

declare global {
    interface Window {
      electron: any;
    }
  }

describe('wordReader', () => {
  beforeEach(() => {
        // Define the electron property on the window object
        Object.defineProperty(window, 'electron', {
            value: { invoke: jest.fn() },
            writable: true,
            configurable: true,
            enumerable: true
          });
        });

//     const originalElectronInvoke = jest.spyOn(window, 'electron', 'get'); // Spy on getter
//     originalElectronInvoke.mockReturnValue({ // Mock the returned value
//       invoke: jest.fn(),
//     });
//   });

  afterEach(() => {
    jest.restoreAllMocks(); // Clean mocks after each test
  });

  //Check if fake content is equal to the expected content with multiple lines
  it('parses lines from DOCX content correctly', async () => {
    const fakeHtmlContent = '<p>Hello World</p>This is second line<br/>This is third line<br/>';
    const expectedLines = ['Hello World', 'This is second line', 'This is third line'];

    // Mock the IPC call to return HTML content
    //(window.electron as any).invoke.mockResolvedValue(fakeHtmlContent); // Use type assertion for clarity
    window.electron.invoke.mockResolvedValue(fakeHtmlContent);
    

    // Call wordReader with a fake file path
    const filePath = 'path/to/fake.docx';
    const lines = await wordReader(filePath);

    // Check if the lines are parsed correctly
    expect(lines).toEqual(expectedLines);
  });

  it('handles errors correctly', async () => {
    const errorMessage = 'An error occurred';

    // Mock the IPC call to throw an error
    //(window.electron as any).invoke.mockRejectedValue(new Error(errorMessage));
    window.electron.invoke.mockRejectedValue(new Error(errorMessage));

    // Attempt to call wordReader with a fake file path
    const filePath = 'path/to/fake.docx';
    await expect(wordReader(filePath)).rejects.toThrow(errorMessage);
  });
});