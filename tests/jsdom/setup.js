// Configure Enzyme with adapter
// https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md#configuring-your-adapter

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({adapter: new EnzymeAdapter()});

// Setup JSDOM to work with Enzyme
// https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md

const {JSDOM} = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const {window} = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

global.HTMLElement = window.HTMLElement;

