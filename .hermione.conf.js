module.exports = {
  baseUrl: 'https://shri.yandex/hw/store',
  gridUrl: 'http://127.0.0.1:4444/wd/hub',

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
  // plugins: {
  //   'html-reporter/hermione': {
  //     path: 'hermione-html-reporter'
  //   }
  // }
}