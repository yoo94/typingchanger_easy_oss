const { convertKoreanToEnglish, convertEnglishToKorean, isCorrectKoreanString, isValidEnglishWord, processText } = require('../typingChanger_easy');

describe('typingChanger_easy.js 테스트', () => {
    beforeAll(async () => {
        // 사전 데이터를 로드하기 위해 약간의 시간이 필요할 수 있습니다.
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    test('convertKoreanToEnglish: 한글을 영어로 변환', () => {
        const input = '안녕하세요';
        const output = convertKoreanToEnglish(input);
        expect(output).toBe('dkssudgktpdy');
    });

    test('convertEnglishToKorean: 영어를 한글로 변환', () => {
        const input = 'dkssudgktpdy';
        const output = convertEnglishToKorean(input);
        expect(output).toBe('안녕하세요');
    });

    test('isCorrectKoreanString: 올바른 한글 문자열', () => {
        expect(isCorrectKoreanString('안녕하세요')).toBe(true);
    });

    test('isCorrectKoreanString: 잘못된 한글 문자열', () => {
        expect(isCorrectKoreanString('ㅇㅏㄴ하')).toBe(false);
    });

    test('isValidEnglishWord: 올바른 영어 단어', () => {
        expect(isValidEnglishWord('campus')).toBe(true);
    });

    test('isValidEnglishWord: 잘못된 영어 단어', () => {
        expect(isValidEnglishWord('facamp')).toBe(false);
    });

    test('processText: 한글 텍스트 변환', () => {
        const input = 'dkssudgktpdy';
        const output = processText(input);
        expect(output).toBe('안녕하세요');
    });

    test('processText: 영어 텍스트 변환', () => {
        const input = 'ㄻㄴㅅ';
        const output = processText(input);
        expect(output).toBe('fast');
    });

});
