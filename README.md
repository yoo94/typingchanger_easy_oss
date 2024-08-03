# typingchanger_easy

한영키를 잊었을때를 위한 한글=>영어, 영어=>한글 자동 변환 모듈입니다. 2벌식 기준으로 작동합니다.

추가 기능:
- 잘못된 한글 입력 감지: 한글 자음과 모음의 조합이 아닌 경우를 감지합니다.
- 잘못된 영어 입력 감지: 영어사전 무료 API 또는 무료 영단어 zip파일을 사용하여 감지합니다.
- 변환 안내 또는 자동 변환 설정 기능.

## 설치 방법

```sh
npm install typingchanger_easy
```

## 사용 방법

commonJS
```js
const typingChanger = require('typingchanger_easy');

const convertedText = typingChanger.processText('dkssudgktpdy'); // '안녕하세요'로 변환
console.log(convertedText);
```
module
```js
import { processText } from 'typingchanger_easy';

const convertedText = processText('dkssudgktpdy'); // '안녕하세요'로 변환
console.log(convertedText);
```

## 라이선스

MIT 라이선스
