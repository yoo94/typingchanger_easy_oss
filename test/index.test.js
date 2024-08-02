const { convertKoreanToEnglish, convertEnglishToKorean } = require('../typingChanger_easy');

describe('typingChanger_easy.js 테스트', () => {

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
});
