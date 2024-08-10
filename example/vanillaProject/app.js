import { convertKoreanToEnglish, convertEnglishToKorean, convertWithValidation } from './node_modules/typingchanger_easy/dist/esm/index.js';

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('convertKorToEng').addEventListener('click', () => {
        const input = document.getElementById('koreanToEnglishInput').value;
        document.getElementById('koreanToEnglishOutput').innerText = convertKoreanToEnglish(input);
    });

    document.getElementById('convertEngToKor').addEventListener('click', () => {
        const input = document.getElementById('englishToKoreanInput').value;
        document.getElementById('englishToKoreanOutput').innerText = convertEnglishToKorean(input);
    });

    document.getElementById('autoDetectAndConvert').addEventListener('click', () => {
        const input = document.getElementById('autoDetectInput').value;
        document.getElementById('autoDetectOutput').innerText = convertWithValidation(input, 'ko');
    });
});
