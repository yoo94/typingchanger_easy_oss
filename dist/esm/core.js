import { koreanToEnglishMap, initialConsonants, vowels, finalConsonants, singleEnglishToKoreanMap } from './constants.js';
import { splitKoreanString, splitKoreanChar, joinKoreanJamo } from './utils.js';
// 한글 -> 영어
function convertKoreanToEnglish(text) {
    const splitText = splitKoreanString(text);
    return splitText.map(char => koreanToEnglishMap[char] || char).join('');
}
// 영어 -> 한글
function convertEnglishToKorean(text) {
    return joinKoreanJamo(text.split('').map(char => singleEnglishToKoreanMap[char] || char));
}
// 올바른 한글 자모음인지
function isCorrectKoreanString(str) {
    for (const char of str) {
        if (char >= '가' && char <= '힣') {
            const [initial, vowel, final] = splitKoreanChar(char);
            if (!initialConsonants.includes(initial) || !vowels.includes(vowel) || !finalConsonants.includes(final)) {
                return false;
            }
        }
        else if (initialConsonants.includes(char) || vowels.includes(char) || finalConsonants.includes(char)) {
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
export { convertKoreanToEnglish, convertEnglishToKorean, isCorrectKoreanString, isCorrectEnglishWord };
