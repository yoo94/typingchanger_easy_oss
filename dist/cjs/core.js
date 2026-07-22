"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertKoreanToEnglish = convertKoreanToEnglish;
exports.convertEnglishToKorean = convertEnglishToKorean;
exports.isCorrectKoreanString = isCorrectKoreanString;
exports.isCorrectEnglishWord = isCorrectEnglishWord;
const constants_js_1 = require("./constants.js");
const utils_js_1 = require("./utils.js");
// 한글 -> 영어
function convertKoreanToEnglish(text) {
    const splitText = (0, utils_js_1.splitKoreanString)(text);
    return splitText.map(char => constants_js_1.koreanToEnglishMap[char] || char).join('');
}
// 영어 -> 한글
function convertEnglishToKorean(text) {
    return (0, utils_js_1.joinKoreanJamo)(text.split('').map(char => constants_js_1.singleEnglishToKoreanMap[char] || char));
}
// 올바른 한글 자모음인지
function isCorrectKoreanString(str) {
    for (const char of str) {
        if (char >= '가' && char <= '힣') {
            const [initial, vowel, final] = (0, utils_js_1.splitKoreanChar)(char);
            if (!constants_js_1.initialConsonants.includes(initial) || !constants_js_1.vowels.includes(vowel) || !constants_js_1.finalConsonants.includes(final)) {
                return false;
            }
        }
        else if (constants_js_1.initialConsonants.includes(char) || constants_js_1.vowels.includes(char) || constants_js_1.finalConsonants.includes(char)) {
            return false;
        }
        else if (char !== ' ') {
            return false;
        }
    }
    return true;
}
// 알파벳으로만 이루어 졌는지
function isCorrectEnglishWord(str) {
    return /^[a-zA-Z\s]+$/.test(str);
}
