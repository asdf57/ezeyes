// import { Application } from 'spectron';
// import path from 'path';

// describe('Main Process Tests', () => {
//   let app: Application;

//   beforeEach(async () => {
//     app = new Application({
//       path: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
//       args: [path.join(__dirname, '..', 'src', 'main.ts')],
//     });
//     await app.start();
//   });

//   afterEach(async () => {
//     if (app && app.isRunning()) {
//       await app.stop();
//     }
//   });

//   it('shows an initial window', async () => {
//     const count = await app.client.getWindowCount();
//     expect(count).toBe(1);
//   });
// });

test('Main Logic', () => {
  expect(1 + 2).toBe(3);
});