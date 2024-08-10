import { koreanToEnglishMap, englishToKoreanMap, initialConsonants, vowels, finalConsonants } from './constants';
import { removeSpecialCharactersAndNumbers, splitKoreanString, joinKoreanString, splitKoreanChar } from './utils';

// 한글 -> 영어
function convertKoreanToEnglish(text: string): string {
    text = removeSpecialCharactersAndNumbers(text);
    const splitText = splitKoreanString(text);
    return splitText.map(char => koreanToEnglishMap[char] || char).join('');
}

// 영어 -> 한글
function convertEnglishToKorean(text: string): string {
    text = removeSpecialCharactersAndNumbers(text);
    let result;
    let buffer = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (englishToKoreanMap[char]) {
            buffer += englishToKoreanMap[char];
        } else {
            buffer += char;
        }
    }

    buffer = buffer.replace(/ㅗㅏ/g, 'ㅘ')
        .replace(/ㅗㅐ/g, 'ㅙ')
        .replace(/ㅗㅣ/g, 'ㅚ')
        .replace(/ㅜㅓ/g, 'ㅝ')
        .replace(/ㅜㅔ/g, 'ㅞ')
        .replace(/ㅜㅣ/g, 'ㅟ')
        .replace(/ㅡㅣ/g, 'ㅢ');

    result = joinKoreanString(buffer.split(''));

    return result;
}

// 올바른 한글 자모음인지
function isCorrectKoreanString(str: string): boolean {
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

// 알파벳으로만 이루어 졌는지
function isCorrectEnglishWord(str: string): boolean {
    const convertedKorean = convertEnglishToKorean(str);
    return !isCorrectKoreanString(convertedKorean);
}

// 올바른 한글, 영어 검증 후 return
function convertWithValidation(text: string, priority: 'ko' | 'en' = 'ko'): string {
    text = removeSpecialCharactersAndNumbers(text);
    const words = text.split(' ');
    const convertedWords = words.map(word => {
        if (/^[가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/.test(word)) {
            const isKorean = isCorrectKoreanString(word);
            if (isKorean) return word;
            const convertedEng = convertKoreanToEnglish(word);
            const isEnglish = isCorrectEnglishWord(convertedEng);
            if (isEnglish) return convertedEng;
        }

        if (/^[a-zA-Z\s]+$/.test(word)) {
            const convertedKor = convertEnglishToKorean(word);
            const isKorean = isCorrectKoreanString(convertedKor);
            const isEnglish = isCorrectEnglishWord(word);
            if (isKorean && isEnglish) {
                return priority === 'ko' ? convertedKor : word;
            }
            return isKorean ? convertedKor : word;
        }

        return word;
    });

    return convertedWords.join(' ');
}
export { convertKoreanToEnglish, convertEnglishToKorean, isCorrectKoreanString, isCorrectEnglishWord, convertWithValidation };
