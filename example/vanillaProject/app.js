import { convertKoreanToEnglish, convertEnglishToKorean,optionProvider } from '../../dist/esm/index';

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('convertKorToEng').addEventListener('click', () => {
        const input = document.getElementById('koreanToEnglishInput').value;
        document.getElementById('koreanToEnglishOutput').innerText = convertKoreanToEnglish(input);
    });

    document.getElementById('convertEngToKor').addEventListener('click', () => {
        const input = document.getElementById('englishToKoreanInput').value;
        document.getElementById('englishToKoreanOutput').innerText = convertEnglishToKorean(input);
    });
    const inputElement = document.getElementById('search');
    inputElement.addEventListener('input', (event) => optionProvider(event, 'search'));

    const inputElement2 = document.getElementById('searchArea');
    inputElement2.addEventListener('input', (event) => optionProvider(event, 'searchArea', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        backgroundColor: '#6ecdff',
        color: '#333', // 텍스트 색상
        border: '2px solid #000', // 더 굵은 테두리
    }));

});
