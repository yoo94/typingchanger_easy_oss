"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSpecialCharactersAndNumbers = removeSpecialCharactersAndNumbers;
exports.splitKoreanString = splitKoreanString;
exports.joinKoreanString = joinKoreanString;
exports.splitKoreanChar = splitKoreanChar;
exports.joinKoreanJamo = joinKoreanJamo;
const constants_js_1 = require("./constants.js");
// 특수문자, 숫자 제외
function removeSpecialCharactersAndNumbers(str) {
    // return str.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
    return str.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
}
// 한글자 -> 자모음 분리
function splitKoreanChar(koreanChar) {
    const baseCode = koreanChar.charCodeAt(0) - 0xAC00;
    const initialIndex = Math.floor(baseCode / 588);
    const vowelIndex = Math.floor((baseCode % 588) / 28);
    const finalIndex = baseCode % 28;
    return [constants_js_1.initialConsonants[initialIndex], constants_js_1.vowels[vowelIndex], constants_js_1.finalConsonants[finalIndex]];
}
// 한글 문자열 자모 분리 함수
function splitKoreanString(koreanString) {
    let result = [];
    for (let i = 0; i < koreanString.length; i++) {
        const char = koreanString[i];
        if (char >= '가' && char <= '힣') {
            result = result.concat(splitKoreanChar(char));
        }
        else {
            result.push(char);
        }
    }
    return result;
}
// 자모 결합 함수
function joinKoreanString(chars) {
    let result = '';
    let i = 0;
    while (i < chars.length) {
        if (chars[i] === ' ' || chars[i] === undefined) {
            result += ' ';
            i++;
            continue;
        }
        const initial = chars[i++];
        const vowel = chars[i++];
        let final = '';
        if (chars[i] !== undefined) {
            const hasFinalConsonant = constants_js_1.finalConsonants.includes(chars[i]);
            const hasNextVowel = i + 1 < chars.length && constants_js_1.vowels.includes(chars[i + 1]);
            if (i < chars.length && hasFinalConsonant && !hasNextVowel) {
                final = chars[i++];
            }
        }
        const initialIndex = constants_js_1.initialConsonants.indexOf(initial);
        const vowelIndex = constants_js_1.vowels.indexOf(vowel);
        const finalIndex = constants_js_1.finalConsonants.indexOf(final);
        if (initialIndex >= 0 && vowelIndex >= 0) {
            const baseCode = 0xAC00 + (initialIndex * 588) + (vowelIndex * 28) + (finalIndex >= 0 ? finalIndex : 0);
            result += String.fromCharCode(baseCode);
        }
        else {
            result += initial + vowel + final;
        }
    }
    return result.replace(/undefined/g, '');
}
function isConsonant(char) {
    return constants_js_1.initialConsonants.includes(char);
}
function isVowel(char) {
    return constants_js_1.vowels.includes(char);
}
function composeKoreanChar(initial, vowel, final = '') {
    const initialIndex = constants_js_1.initialConsonants.indexOf(initial);
    const vowelIndex = constants_js_1.vowels.indexOf(vowel);
    const finalIndex = constants_js_1.finalConsonants.indexOf(final);
    if (initialIndex < 0 || vowelIndex < 0 || finalIndex < 0) {
        return `${initial}${vowel}${final}`;
    }
    return String.fromCharCode(0xAC00 + (initialIndex * 588) + (vowelIndex * 28) + finalIndex);
}
function joinKoreanJamo(chars) {
    let result = '';
    let initial = '';
    let vowel = '';
    let final = '';
    const flush = () => {
        if (initial && vowel) {
            result += composeKoreanChar(initial, vowel, final);
        }
        else {
            result += initial + vowel + final;
        }
        initial = '';
        vowel = '';
        final = '';
    };
    chars.forEach((char) => {
        if (!isConsonant(char) && !isVowel(char)) {
            flush();
            result += char;
            return;
        }
        if (isVowel(char)) {
            if (!initial && !vowel) {
                initial = 'ㅇ';
                vowel = char;
                return;
            }
            if (initial && !vowel) {
                vowel = char;
                return;
            }
            if (initial && vowel && !final) {
                const compoundVowel = constants_js_1.compoundVowels[`${vowel}${char}`];
                if (compoundVowel) {
                    vowel = compoundVowel;
                    return;
                }
                flush();
                initial = 'ㅇ';
                vowel = char;
                return;
            }
            if (initial && vowel && final) {
                const decomposedFinal = constants_js_1.decomposedFinalConsonants[final];
                if (decomposedFinal) {
                    final = decomposedFinal[0];
                    flush();
                    initial = decomposedFinal[1];
                    vowel = char;
                    return;
                }
                const nextInitial = final;
                final = '';
                flush();
                initial = nextInitial;
                vowel = char;
                return;
            }
        }
        if (!initial) {
            initial = char;
            return;
        }
        if (initial && !vowel) {
            result += initial;
            initial = char;
            return;
        }
        if (!final) {
            final = char;
            return;
        }
        const compoundFinal = constants_js_1.compoundFinalConsonants[`${final}${char}`];
        if (compoundFinal) {
            final = compoundFinal;
            return;
        }
        flush();
        initial = char;
    });
    flush();
    return result;
}
