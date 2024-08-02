/**
 * typingChanger_easy.js
 *
 * Copyright 2024, yoo94
 * under the MIT license.
 */

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
var englishToKoreanMap = {};
for (var koreanChar in koreanToEnglishMap) {
    var englishChar = koreanToEnglishMap[koreanChar];
    englishToKoreanMap[englishChar] = koreanChar;
}

// 한글 자모 분리 함수
function splitKoreanChar(koreanChar) {
    // baseCode: 유니코드 값에서 한글 시작 코드(0xAC00)를 뺀 값
    var baseCode = koreanChar.charCodeAt(0) - 0xAC00;
    // initialIndex: 초성의 인덱스 계산
    var initialIndex = Math.floor(baseCode / 588);
    // vowelIndex: 중성의 인덱스 계산
    var vowelIndex = Math.floor((baseCode % 588) / 28);
    // finalIndex: 종성의 인덱스 계산
    var finalIndex = baseCode % 28;

    // 초성, 중성, 종성을 배열로 반환
    return [
        initialConsonants[initialIndex],
        vowels[vowelIndex],
        finalConsonants[finalIndex]
    ];
}

// 한글 문자열 자모 분리 함수
function splitKoreanString(koreanString) {
    var result = [];
    for (var i = 0; i < koreanString.length; i++) {
        var char = koreanString[i];
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
    var splitText = splitKoreanString(text);
    // 각 자모를 영어로 변환하거나 그대로 반환하여 문자열로 결합
    return splitText.map(function(char) {
        return koreanToEnglishMap[char] || char;
    }).join('');
}

// 영어 -> 한글 변환 함수
function convertEnglishToKorean(text) {
    var result = '';
    var buffer = '';

    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        buffer += char;
        if (englishToKoreanMap[buffer]) {
            result += englishToKoreanMap[buffer];
            buffer = '';
        } else if (buffer.length > 1) {
            result += buffer[0];
            buffer = buffer.slice(1);
        }
    }

    // 남은 버퍼가 있으면 결과에 추가
    if (buffer.length) {
        result += buffer;
    }

    return joinKoreanString(result.split(''));
}

// 자모 결합 함수
function joinKoreanString(chars) {
    var result = '';
    var i = 0;

    while (i < chars.length) {
        if (chars[i] === ' ') {
            result += ' ';
            i++;
            continue;
        }

        // 초성, 중성, 종성 추출
        var initial = chars[i++];
        var vowel = chars[i++];
        var final = '';

        // 종성이 있는지 확인하고 설정
        var hasFinalConsonant = finalConsonants.includes(chars[i]);
        var hasNextVowel = i + 1 < chars.length && vowels.includes(chars[i + 1]);

        if (i < chars.length && hasFinalConsonant && !hasNextVowel) {
            final = chars[i++];
        }

        var initialIndex = initialConsonants.indexOf(initial);
        var vowelIndex = vowels.indexOf(vowel);
        var finalIndex = finalConsonants.indexOf(final);

        // 초성, 중성 인덱스가 유효한 경우 한글 문자로 결합
        if (initialIndex >= 0 && vowelIndex >= 0) {
            var baseCode = 0xAC00 + (initialIndex * 588) + (vowelIndex * 28) + (finalIndex >= 0 ? finalIndex : 0);
            result += String.fromCharCode(baseCode);
        } else {
            result += initial + vowel + final;
        }
    }

    return result;
}

// 모듈 내보내기
module.exports = { convertKoreanToEnglish, convertEnglishToKorean };
