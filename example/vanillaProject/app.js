import { convertKoreanToEnglish, convertEnglishToKorean, optionProvider } from '../../dist/esm/index.js';

const convertSamples = {
    koToEn: '한영키를 잊고 안녕하세요라고 입력했어요.',
    enToKo: 'dkssudgktpdy gksdudzl qksrkqtmqslek.',
};

const sourceInput = document.getElementById('sourceInput');
const convertedOutput = document.getElementById('convertedOutput');
const resultDirection = document.getElementById('resultDirection');
const modeButtons = Array.from(document.querySelectorAll('.mode-button'));
const smartSearch = document.getElementById('smartSearch');
const smartMemo = document.getElementById('smartMemo');

let mode = 'koToEn';

function convertValue(value) {
    return mode === 'koToEn' ? convertKoreanToEnglish(value) : convertEnglishToKorean(value);
}

function updateResult() {
    convertedOutput.value = convertValue(sourceInput.value);
    resultDirection.textContent = mode === 'koToEn' ? 'convertKoreanToEnglish' : 'convertEnglishToKorean';
}

function setMode(nextMode) {
    mode = nextMode;
    modeButtons.forEach((button) => {
        const isActive = button.dataset.mode === mode;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
    updateResult();
}

function wireRecommendationInput(element, styles) {
    const openProvider = (event) => optionProvider(event, element.id, styles);
    element.addEventListener('input', openProvider);
    element.addEventListener('focus', openProvider);
}

function applySample(button) {
    const target = document.getElementById(button.dataset.target);
    if (!target) {
        return;
    }

    target.value = button.dataset.value;
    target.focus();
    target.dispatchEvent(new Event('input', { bubbles: true }));
}

modeButtons.forEach((button) => {
    button.addEventListener('click', () => setMode(button.dataset.mode));
});

document.querySelectorAll('[data-convert-sample]').forEach((button) => {
    button.addEventListener('click', () => {
        const nextMode = button.dataset.convertSample;
        sourceInput.value = convertSamples[nextMode];
        setMode(nextMode);
        sourceInput.focus();
    });
});

document.getElementById('clearInput').addEventListener('click', () => {
    sourceInput.value = '';
    updateResult();
    sourceInput.focus();
});

document.getElementById('copyResult').addEventListener('click', async () => {
    if (!convertedOutput.value) {
        return;
    }

    try {
        await navigator.clipboard.writeText(convertedOutput.value);
    } catch {
        sourceInput.focus();
    }
});

sourceInput.addEventListener('input', updateResult);

wireRecommendationInput(smartSearch, {
    activeItemBackgroundColor: '#dff5f2',
    itemHoverBackgroundColor: '#edf8f7',
    border: '1px solid rgba(15, 139, 141, 0.28)',
});

wireRecommendationInput(smartMemo, {
    backgroundColor: '#172033',
    color: '#f8fafc',
    itemColor: '#f8fafc',
    activeItemBackgroundColor: '#0f8b8d',
    itemHoverBackgroundColor: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.16)',
});

document.querySelectorAll('.sample-button').forEach((button) => {
    button.addEventListener('click', () => applySample(button));
});

smartSearch.value = 'dkssudgktpdy';
smartMemo.value = 'gksdudzl';
setMode(mode);
