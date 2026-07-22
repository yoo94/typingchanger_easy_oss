const {
    convertKoreanToEnglish,
    convertEnglishToKorean,
    isCorrectKoreanString,
    isCorrectEnglishWord,
} = require('../src/index');

describe('typingchanger_easy', () => {
    test('isCorrectKoreanString: 완성형 한글 문자열을 올바르게 판단한다', () => {
        expect(isCorrectKoreanString('안녕하세요')).toBe(true);
    });

    test('isCorrectKoreanString: 숫자나 분리 자모가 섞이면 올바르지 않게 판단한다', () => {
        expect(isCorrectKoreanString('안1녕')).toBe(false);
        expect(isCorrectKoreanString('ㅇㅏㄴ하')).toBe(false);
    });

    test('isCorrectEnglishWord: 알파벳과 공백만 허용한다', () => {
        expect(isCorrectEnglishWord('campus note')).toBe(true);
        expect(isCorrectEnglishWord('campus!')).toBe(false);
    });

    test('convertKoreanToEnglish: 완성형 한글과 겹받침을 영어 키 입력으로 변환한다', () => {
        expect(convertKoreanToEnglish('안녕하세요')).toBe('dkssudgktpdy');
        expect(convertKoreanToEnglish('ㄻㄴㅅ')).toBe('fast');
    });

    test('convertEnglishToKorean: 영어 키 입력을 완성형 한글로 조합한다', () => {
        expect(convertEnglishToKorean('dkssudgktpdy')).toBe('안녕하세요');
        expect(convertEnglishToKorean('RlfRlfQkQk')).toBe('낄낄빠빠');
    });

    test('convertEnglishToKorean: 복합 모음과 겹받침을 처리한다', () => {
        expect(convertEnglishToKorean('dho')).toBe('왜');
        expect(convertEnglishToKorean('djqtj')).toBe('업서');
        expect(convertEnglishToKorean('djqtq')).toBe('없ㅂ');
    });

    test('convertEnglishToKorean: 문장부호와 숫자를 보존한다', () => {
        expect(convertEnglishToKorean('dkssudgktpdy! 2026')).toBe('안녕하세요! 2026');
    });
});
