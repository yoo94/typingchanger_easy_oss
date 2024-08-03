/**
 * typingChanger_easy.js
 *
 * Copyright 2024, yoo94
 * under the MIT license.
 */
const fs = require('fs');
const path = require('path');

// 한국어 초성, 모음, 종성 리스트 정의
const initialConsonants = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const vowels = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
const finalConsonants = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

// 한국어 문자와 영어 문자의 매핑 정의
const koreanToEnglishMap = {
    'ㄱ': 'r', 'ㄲ': 'R', 'ㄴ': 's', 'ㄷ': 'e', 'ㄸ': 'E', 'ㄹ': 'f', 'ㅁ': 'a', 'ㅂ': 'q', 'ㅃ': 'Q', 'ㅅ': 't', 'ㅆ': 'T',
    'ㅇ': 'd', 'ㅈ': 'w', 'ㅉ': 'W', 'ㅊ': 'c', 'ㅋ': 'z', 'ㅌ': 'x', 'ㅍ': 'v', 'ㅎ': 'g',
    'ㅏ': 'k', 'ㅐ': 'o', 'ㅑ': 'i', 'ㅒ': 'O', 'ㅓ': 'j', 'ㅔ': 'p', 'ㅕ': 'u', 'ㅖ': 'P', 'ㅗ': 'h', 'ㅘ': 'hk', 'ㅙ': 'ho', 'ㅚ': 'hl',
    'ㅛ': 'y', 'ㅜ': 'n', 'ㅝ': 'nj', 'ㅞ': 'np', 'ㅟ': 'nl', 'ㅠ': 'b', 'ㅡ': 'm', 'ㅢ': 'ml', 'ㅣ': 'l',
    'ㄳ': 'rt', 'ㄵ': 'sw', 'ㄶ': 'sg', 'ㄺ': 'fr', 'ㄻ': 'fa', 'ㄼ': 'fq', 'ㄽ': 'ft',
    'ㄾ': 'fx', 'ㄿ': 'fv', 'ㅀ': 'fg', 'ㅄ': 'qt'
};

// 영어 문자와 한국어 문자의 매핑 정의
const englishToKoreanMap = {};
for (const koreanChar in koreanToEnglishMap) {
    const englishChar = koreanToEnglishMap[koreanChar];
    englishToKoreanMap[englishChar] = koreanChar;
}

// 사전 데이터 로드
const englishDictionary = new Set();

function loadDictionary() {
    const filePath = path.join(__dirname, 'dict', 'en-US.txt');
    const text = fs.readFileSync(filePath, 'utf-8');
    const words = text.split('\n').map(word => word.trim().toLowerCase());
    words.forEach(word => englishDictionary.add(word));
}
loadDictionary();

// 올바른 영단어인지 사전 데이터로 확인하는 함수
function isValidEnglishWord(word) {
    return englishDictionary.has(word.toLowerCase());
}

// 한글 자모 분리 함수
function splitKoreanChar(koreanChar) {
    // baseCode: 유니코드 값에서 한글 시작 코드(0xAC00)를 뺀 값
    const baseCode = koreanChar.charCodeAt(0) - 0xAC00;
    // initialIndex: 초성의 인덱스 계산
    const initialIndex = Math.floor(baseCode / 588);
    // vowelIndex: 중성의 인덱스 계산
    const vowelIndex = Math.floor((baseCode % 588) / 28);
    // finalIndex: 종성의 인덱스 계산
    const finalIndex = baseCode % 28;

    // 초성, 중성, 종성을 배열로 반환
    return [
        initialConsonants[initialIndex],
        vowels[vowelIndex],
        finalConsonants[finalIndex]
    ];
}

// 한글 문자열 자모 분리 함수
function splitKoreanString(koreanString) {
    let result = [];
    for (let i = 0; i < koreanString.length; i++) {
        const char = koreanString[i];
        // 한글 문자인 경우 자모 분리
        if (char >= '가' && char <= '힣') {
            result = result.concat(splitKoreanChar(char));
        } else {
            // 한글이 아닌 문자는 그대로 추가
            result.push(char);
        }
    }
    return result;
}

// 한글 -> 영어 변환 함수
function convertKoreanToEnglish(text) {
    // 한글 문자열을 자모 단위로 분리
    const splitText = splitKoreanString(text);
    // 각 자모를 영어로 변환하거나 그대로 반환하여 문자열로 결합
    return splitText.map(function(char) {
        return koreanToEnglishMap[char] || char;
    }).join('');
}

// 영어 -> 한글 변환 함수
function convertEnglishToKorean(text) {
    let result;

    // 알파벳들을 한글 자모로 변환
    let buffer = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (englishToKoreanMap[char]) {
            buffer += englishToKoreanMap[char];
        } else {
            buffer += char;
        }
    }

    // 특정 모음 조합을 결합
    buffer = buffer.replace(/ㅗㅏ/g, 'ㅘ')
        .replace(/ㅗㅐ/g, 'ㅙ')
        .replace(/ㅗㅣ/g, 'ㅚ')
        .replace(/ㅜㅓ/g, 'ㅝ')
        .replace(/ㅜㅔ/g, 'ㅞ')
        .replace(/ㅜㅣ/g, 'ㅟ')
        .replace(/ㅡㅣ/g, 'ㅢ');

    // 결과를 joinKoreanString으로 보냄
    result = joinKoreanString(buffer.split(''));

    return result;
}

// 자모 결합 함수
function joinKoreanString(chars) {
    let result = '';
    let i = 0;

    while (i < chars.length) {
        if (chars[i] === ' ') {
            result += ' ';
            i++;
            continue;
        }

        // 초성, 중성, 종성 추출
        const initial = chars[i++];
        const vowel = chars[i++];
        let final = '';

        // 종성이 있는지 확인하고 설정
        const hasFinalConsonant = finalConsonants.includes(chars[i]);
        const hasNextVowel = i + 1 < chars.length && vowels.includes(chars[i + 1]);

        if (i < chars.length && hasFinalConsonant && !hasNextVowel) {
            final = chars[i++];
        }

        const initialIndex = initialConsonants.indexOf(initial);
        const vowelIndex = vowels.indexOf(vowel);
        const finalIndex = finalConsonants.indexOf(final);

        // 초성, 중성 인덱스가 유효한 경우 한글 문자로 결합
        if (initialIndex >= 0 && vowelIndex >= 0) {
            const baseCode = 0xAC00 + (initialIndex * 588) + (vowelIndex * 28) + (finalIndex >= 0 ? finalIndex : 0);
            result += String.fromCharCode(baseCode);
        } else {
            result += initial + vowel + final;
        }
    }

    return result;
}

function isCorrectKoreanString(str) {
    for (const char of str) {
        if (char >= '가' && char <= '힣') {
            const [initial, vowel, final] = splitKoreanChar(char);
            if (!initialConsonants.includes(initial) || !vowels.includes(vowel) || !finalConsonants.includes(final)) {
                return false;
            }
        } else if (initialConsonants.includes(char) || vowels.includes(char) || finalConsonants.includes(char)) {
            return false;
        } else if (char !== ' ') {
            return false;
        }
    }
    return true;
}

// 변환 및 검증 함수
function convert(text, priority = 'ko') {
    // 한글 또는 한글 자모로 이루어진 경우
    if (/^[가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/.test(text)) {
        // 올바른 한국어 문자열인지 확인
        if (isCorrectKoreanString(text)) {
            return text;
        }
        const convertedText = convertKoreanToEnglish(text);
        // 유효한 영어 단어인지 확인
        if (isValidEnglishWord(convertedText)) {
            return convertedText;
        }
        // 우선순위에 따라 반환
        return priority === 'ko' ? text : convertedText;
    }

    // 영어 알파벳으로만 이루어진 경우
    if (/^[a-zA-Z\s]+$/.test(text)) {
        // 유효한 영어 단어인지 확인
        if (isValidEnglishWord(text)) {
            return text;
        }
        const convertedText = convertEnglishToKorean(text);
        // 올바른 한국어 문자열인지 확인
        if (isCorrectKoreanString(convertedText)) {
            return convertedText;
        }
        // 우선순위에 따라 반환
        return priority === 'ko' ? convertedText : text;
    }
    // 위의 조건에 해당하지 않는 경우 원본 텍스트 반환
    return text;
}

// 모듈 내보내기
module.exports = { convertKoreanToEnglish, convertEnglishToKorean, isCorrectKoreanString, isValidEnglishWord, convert };
