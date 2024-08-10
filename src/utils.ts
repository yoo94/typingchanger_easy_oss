import { initialConsonants, vowels, finalConsonants } from './constants';

// 특수문자, 숫자 제외
function removeSpecialCharactersAndNumbers(str: string): string {
    // return str.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
    return str.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
}

// 한글자 -> 자모음 분리
function splitKoreanChar(koreanChar: string): string[] {
    const baseCode = koreanChar.charCodeAt(0) - 0xAC00;
    const initialIndex = Math.floor(baseCode / 588);
    const vowelIndex = Math.floor((baseCode % 588) / 28);
    const finalIndex = baseCode % 28;
    return [initialConsonants[initialIndex], vowels[vowelIndex], finalConsonants[finalIndex]];
}

// 한글 문자열 자모 분리 함수
function splitKoreanString(koreanString: string): string[] {
    let result: string[] = [];
    for (let i = 0; i < koreanString.length; i++) {
        const char = koreanString[i];
        if (char >= '가' && char <= '힣') {
            result = result.concat(splitKoreanChar(char));
        } else {
            result.push(char);
        }
    }
    return result;
}

// 자모 결합 함수
function joinKoreanString(chars: (string | undefined)[]): string {
    let result = '';
    let i = 0;

    while (i < chars.length) {
        if (chars[i] === ' ' || chars[i] === undefined) {
            result += ' ';
            i++;
            continue;
        }

        const initial = chars[i++]!;
        const vowel = chars[i++]!;
        let final = '';

        if (chars[i] !== undefined) {
            const hasFinalConsonant = finalConsonants.includes(chars[i]);
            const hasNextVowel = i + 1 < chars.length && vowels.includes(chars[i + 1]);

            if (i < chars.length && hasFinalConsonant && !hasNextVowel) {
                final = chars[i++]!;
            }
        }

        const initialIndex = initialConsonants.indexOf(initial);
        const vowelIndex = vowels.indexOf(vowel);
        const finalIndex = finalConsonants.indexOf(final);

        if (initialIndex >= 0 && vowelIndex >= 0) {
            const baseCode = 0xAC00 + (initialIndex * 588) + (vowelIndex * 28) + (finalIndex >= 0 ? finalIndex : 0);
            result += String.fromCharCode(baseCode);
        } else {
            result += initial + vowel + final;
        }
    }

    return result.replace(/undefined/g, '');
}

export { removeSpecialCharactersAndNumbers, splitKoreanString, joinKoreanString, splitKoreanChar };
