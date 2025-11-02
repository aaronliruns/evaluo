// In-memory data store for Vercel deployment
import { TestData } from '@/types'

export const testData: TestData = {
  id: 1,
  name: "XPath Knowledge Assessment",
  description: "Evaluating XPath concepts, HTML element location, and Playwright integration",
  questions: [
    {
      id: 1,
      text: "What does XPath stand for?",
      type: "SINGLE_CHOICE",
      order: 1,
      score: 1,
      options: [
        { id: 1, text: "XML Path Language", isCorrect: true, order: 1 },
        { id: 2, text: "External Path Language", isCorrect: false, order: 2 },
        { id: 3, text: "Extensible Path Locator", isCorrect: false, order: 3 },
        { id: 4, text: "XML Programming Language", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 2,
      text: "Which XPath expression selects all div elements in the document?",
      type: "SINGLE_CHOICE",
      order: 2,
      score: 1,
      options: [
        { id: 5, text: "//div", isCorrect: true, order: 1 },
        { id: 6, text: "/div", isCorrect: false, order: 2 },
        { id: 7, text: "//div[*]", isCorrect: false, order: 3 },
        { id: 8, text: "./div", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 3,
      text: "Which of the following are valid XPath axes? (Multiple Choice)",
      type: "MULTIPLE_CHOICE",
      order: 3,
      score: 1,
      options: [
        { id: 9, text: "child", isCorrect: true, order: 1 },
        { id: 10, text: "parent", isCorrect: true, order: 2 },
        { id: 11, text: "ancestor", isCorrect: true, order: 3 },
        { id: 12, text: "sibling", isCorrect: false, order: 4 },
        { id: 13, text: "following-sibling", isCorrect: true, order: 5 }
      ]
    },
    {
      id: 4,
      text: "What is the correct XPath to select an element with id='submit-btn'?",
      type: "SINGLE_CHOICE",
      order: 4,
      score: 1,
      options: [
        { id: 14, text: "//*[@id='submit-btn']", isCorrect: true, order: 1 },
        { id: 15, text: "//[@id='submit-btn']", isCorrect: false, order: 2 },
        { id: 16, text: "//*[id='submit-btn']", isCorrect: false, order: 3 },
        { id: 17, text: "//id='submit-btn'", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 5,
      text: "How do you select an element with class name 'error-message' using XPath?",
      type: "SINGLE_CHOICE",
      order: 5,
      score: 1,
      options: [
        { id: 18, text: "//*[@class='error-message']", isCorrect: true, order: 1 },
        { id: 19, text: "//class='error-message'", isCorrect: false, order: 2 },
        { id: 20, text: "//*[class='error-message']", isCorrect: false, order: 3 },
        { id: 21, text: "//error-message", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 6,
      text: "Which XPath functions can be used to locate elements by text? (Multiple Choice)",
      type: "MULTIPLE_CHOICE",
      order: 6,
      score: 1,
      options: [
        { id: 22, text: "text()", isCorrect: true, order: 1 },
        { id: 23, text: "contains()", isCorrect: true, order: 2 },
        { id: 24, text: "normalize-space()", isCorrect: true, order: 3 },
        { id: 25, text: "get-text()", isCorrect: false, order: 4 },
        { id: 26, text: "starts-with()", isCorrect: true, order: 5 }
      ]
    },
    {
      id: 7,
      text: "What does the XPath expression '//button[1]' select?",
      type: "SINGLE_CHOICE",
      order: 7,
      score: 1,
      options: [
        { id: 27, text: "The first button element in each parent context", isCorrect: true, order: 1 },
        { id: 28, text: "All button elements in the document", isCorrect: false, order: 2 },
        { id: 29, text: "Only the first button in the entire document", isCorrect: false, order: 3 },
        { id: 30, text: "The button with id='1'", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 8,
      text: "Which XPath expression selects all anchor tags with an href attribute?",
      type: "SINGLE_CHOICE",
      order: 8,
      score: 1,
      options: [
        { id: 31, text: "//a[@href]", isCorrect: true, order: 1 },
        { id: 32, text: "//a[href]", isCorrect: false, order: 2 },
        { id: 33, text: "//a/href", isCorrect: false, order: 3 },
        { id: 34, text: "//a[@href='*']", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 9,
      text: "Given nested structure: <div><ul><li><span>Item</span></li></ul></div>, which XPath selects the span inside the third li? (Multiple Choice)",
      type: "MULTIPLE_CHOICE",
      order: 9,
      score: 2,
      options: [
        { id: 35, text: "//div/ul/li[3]/span", isCorrect: true, order: 1 },
        { id: 36, text: "//div/ul/li/span[3]", isCorrect: false, order: 2 },
        { id: 37, text: "//span[3]", isCorrect: false, order: 3 },
        { id: 38, text: "//li[3]//span", isCorrect: true, order: 4 }
      ]
    },
    {
      id: 10,
      text: "How do you select all visible elements with class 'item' (not hidden by CSS)?",
      type: "SINGLE_CHOICE",
      order: 10,
      score: 2,
      options: [
        { id: 39, text: "//*[@class='item' and not(contains(@style, 'display:none') or contains(@style, 'display: none'))]", isCorrect: true, order: 1 },
        { id: 40, text: "//*[@class='item' and @visible='true']", isCorrect: false, order: 2 },
        { id: 41, text: "//*[@class='item'][@visible]", isCorrect: false, order: 3 },
        { id: 42, text: "//*[@class='item' and @style!='display:none']", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 11,
      text: "Which XPath techniques can help locate elements with dynamic or partial class names? (Multiple Choice)",
      type: "MULTIPLE_CHOICE",
      order: 11,
      score: 2,
      options: [
        { id: 43, text: "contains(@class, 'partial-name')", isCorrect: true, order: 1 },
        { id: 44, text: "starts-with(@class, 'prefix')", isCorrect: true, order: 2 },
        { id: 45, text: "ends-with(@class, 'suffix')", isCorrect: true, order: 3 },
        { id: 46, text: "@class='*partial*'", isCorrect: false, order: 4 },
        { id: 47, text: "matches(@class, 'pattern')", isCorrect: false, order: 5 }
      ]
    },
    {
      id: 12,
      text: "For HTML: <table><tr><td>A</td><td>B</td></tr><tr><td>C</td><td>D</td></tr></table>, which XPath selects 'D'? (Multiple Choice)",
      type: "MULTIPLE_CHOICE",
      order: 12,
      score: 2,
      options: [
        { id: 48, text: "//table/tr[2]/td[2]", isCorrect: true, order: 1 },
        { id: 49, text: "//table/tr/td[4]", isCorrect: false, order: 2 },
        { id: 50, text: "//td[text()='D']", isCorrect: true, order: 3 },
        { id: 51, text: "//table//td[last()]", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 13,
      text: "How do you select an element that contains specific text but also has nested elements? Example: <div>Hello <span>World</span></div>",
      type: "SINGLE_CHOICE",
      order: 13,
      score: 2,
      options: [
        { id: 52, text: "//div[contains(., 'Hello') and contains(., 'World')]", isCorrect: true, order: 1 },
        { id: 53, text: "//div[text()='Hello World']", isCorrect: false, order: 2 },
        { id: 54, text: "//div[contains(text(), 'Hello World')]", isCorrect: false, order: 3 },
        { id: 55, text: "//div[.='Hello World']", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 14,
      text: "Which XPath approaches can select the parent of a known element? (Multiple Choice)",
      type: "MULTIPLE_CHOICE",
      order: 14,
      score: 2,
      options: [
        { id: 56, text: "//span[@id='child']/..", isCorrect: true, order: 1 },
        { id: 57, text: "//span[@id='child']/parent::*", isCorrect: true, order: 2 },
        { id: 58, text: "//span[@id='child']/ancestor::*[1]", isCorrect: true, order: 3 },
        { id: 59, text: "//span[@id='child']/up", isCorrect: false, order: 4 },
        { id: 60, text: "parent(//span[@id='child'])", isCorrect: false, order: 5 }
      ]
    },
    {
      id: 15,
      text: "For HTML with multiple elements having the same class, how do you select the last one?",
      type: "SINGLE_CHOICE",
      order: 15,
      score: 2,
      options: [
        { id: 61, text: "(//div[@class='item'])[last()]", isCorrect: true, order: 1 },
        { id: 62, text: "//div[@class='item'][last()]", isCorrect: false, order: 2 },
        { id: 63, text: "//div[@class='item' and position()=last()]", isCorrect: false, order: 3 },
        { id: 64, text: "//div[@class='item'][-1]", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 16,
      text: "How can you locate a button by its text content 'Submit' regardless of extra whitespace?",
      type: "SINGLE_CHOICE",
      order: 16,
      score: 2,
      options: [
        { id: 65, text: "//button[normalize-space(text())='Submit']", isCorrect: true, order: 1 },
        { id: 66, text: "//button[text()='Submit']", isCorrect: false, order: 2 },
        { id: 67, text: "//button[trim(text())='Submit']", isCorrect: false, order: 3 },
        { id: 68, text: "//button[contains(text(), 'Submit')]", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 17,
      text: "In Playwright, which methods can be used to wait for an element located by XPath before interacting with it? (Multiple Choice)",
      type: "MULTIPLE_CHOICE",
      order: 17,
      score: 3,
      options: [
        { id: 69, text: "page.waitForSelector('xpath=//button[@id=\submit\]')", isCorrect: true, order: 1 },
        { id: 70, text: "page.locator('xpath=//button[@id=\submit\]').waitFor()", isCorrect: true, order: 2 },
        { id: 71, text: "page.waitForXPath('//button[@id=\submit\]')", isCorrect: false, order: 3 },
        { id: 72, text: "page.locator('//button[@id=\submit\]').waitFor({ state: 'visible' })", isCorrect: true, order: 4 },
        { id: 73, text: "page.wait_for_element('xpath=//button[@id=\submit\]')", isCorrect: false, order: 5 }
      ]
    },
    {
      id: 18,
      text: "How do you locate an element inside an iframe using Playwright and XPath?",
      type: "SINGLE_CHOICE",
      order: 18,
      score: 3,
      options: [
        { id: 74, text: "const frame = page.frame({ name: 'frameName' }); await frame.locator('//input[@id=\field\]').click();", isCorrect: true, order: 1 },
        { id: 75, text: "await page.locator('//iframe[@name=\frameName\]//input[@id=\field\]').click();", isCorrect: false, order: 2 },
        { id: 76, text: "await page.locator('xpath=//iframe//input[@id=\field\]').click();", isCorrect: false, order: 3 },
        { id: 77, text: "await page.switchFrame('frameName').locator('//input[@id=\field\]').click();", isCorrect: false, order: 4 }
      ]
    },
    {
      id: 19,
      text: "In Playwright, which wait strategies should you use when dealing with nested elements inside iframes that load dynamically? (Multiple Choice)",
      type: "MULTIPLE_CHOICE",
      order: 19,
      score: 3,
      options: [
        { id: 78, text: "Wait for the iframe to be attached: page.frameLocator('iframe').waitFor()", isCorrect: false, order: 1 },
        { id: 79, text: "Wait for the specific element inside iframe: page.frameLocator('iframe').locator('//div').waitFor()", isCorrect: true, order: 2 },
        { id: 80, text: "Use waitForLoadState on the frame: frame.waitForLoadState('domcontentloaded')", isCorrect: true, order: 3 },
        { id: 81, text: "Chain locators with automatic waiting: page.frameLocator('iframe').locator('//div').click()", isCorrect: true, order: 4 },
        { id: 82, text: "Use page.waitForTimeout() with fixed delay", isCorrect: false, order: 5 }
      ]
    },
    {
      id: 20,
      text: "Given nested iframes: <iframe id='outer'><iframe id='inner'><div class='target'>Text</div></iframe></iframe>, what is the correct Playwright code to interact with the target div?",
      type: "SINGLE_CHOICE",
      order: 20,
      score: 3,
      options: [
        { id: 83, text: "await page.frameLocator('#outer').frameLocator('#inner').locator('//div[@class=\target\]').click();", isCorrect: true, order: 1 },
        { id: 84, text: "await page.locator('xpath=//iframe[@id=\outer\]//iframe[@id=\inner\]//div[@class=\target\]').click();", isCorrect: false, order: 2 },
        { id: 85, text: "const frame = page.frame({ selector: '#outer' }).frame({ selector: '#inner' }); await frame.locator('//div[@class=\target\]').click();", isCorrect: false, order: 3 },
        { id: 86, text: "await page.frameLocator('xpath=//iframe[@id=\outer\]//iframe[@id=\inner\]').locator('//div[@class=\target\]').click();", isCorrect: false, order: 4 }
      ]
    }
  ]
}
