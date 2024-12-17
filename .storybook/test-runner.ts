import { TestRunnerConfig, waitForPageReady } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
 
const customSnapshotsDir = `${process.cwd()}/__snapshots__`;
/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async preVisit(page) {
    await page.setViewportSize({ width: 1440, height: 900 })
    await injectAxe(page);
  },
  async postVisit(page, context) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
    const image = await page.screenshot()
    
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: `${context.id}-lg`,
    });

    await page.setViewportSize({ width: 375, height: 700 })
    const mobileImage = await page.screenshot()
    
    expect(mobileImage).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: `${context.id}-xs`,
    });
  },
};
 
export default config;