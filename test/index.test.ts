const { convertKoreanToEnglish, convertEnglishToKorean, isCorrectKoreanString, isCorrectEnglishWord, convertWithValidation } = require('../src/index');

describe('typingChanger_easy.js 테스트', () => {
    test('isCorrectKoreanString: 올바른 한글 문자열', () => {
        expect(isCorrectKoreanString('안녕하세요')).toBe(true);
    });

    test('isCorrectKoreanString: 잘못된 한글 문자열', () => {
        expect(isCorrectKoreanString('안1녕')).toBe(false);
    });

    test('isCorrectKoreanString: 잘못된 한글 문자열2', () => {
        expect(isCorrectKoreanString('ㅇㅏㄴ하')).toBe(false);
    });

    test('isCorrectEnglishWord: 올바른 영어 단어', () => {
        expect(isCorrectEnglishWord('campus')).toBe(true);
    });

    test('isCorrectEnglishWord: 잘못된 영어 단어', () => {
        expect(isCorrectEnglishWord('victory')).toBe(false);
    });

    test('convert: 한글 텍스트 변환', () => {
        const input = 'dkssudgktpdy';
        const output = convertWithValidation(input, 'ko');
        expect(output).toBe('안녕하세요');
    });

    test('convert: 한글을 영어로 변환', () => {
        const input = 'ㄻㄴㅅ';
        const output = convertKoreanToEnglish(input);
        expect(output).toBe('fast');
    });

    test('convertEnglishToKorean: 모음이 연속으로 두 번 나올 때', () => {
        const input = 'dho';
        const output = convertEnglishToKorean(input);
        expect(output).toBe('왜');
    });

    test('convertEnglishToKorean: 자음이 연속으로 두 번 나올 때', () => {
        const input = 'RlfRlfQkQk';
        const output = convertEnglishToKorean(input);
        expect(output).toBe('낄낄빠빠');
    });
});
