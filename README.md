# typingchanger_easy

typingchanger_easy는 한영 키를 잊고 타이핑했을 때 한글을 영어로, 영어를 한글로 자동 변환해주는 모듈입니다. 
2벌식 키보드 배열을 기준으로 작동합니다.

주요 기능
- 한글 ⇄ 영어 변환: 잘못된 키보드 입력을 감지하여 한글을 영어로, 영어를 한글로 자동 변환합니다.
- 잘못된 한글 입력 감지: 한글 자음과 모음의 조합이 아닌 경우를 감지합니다.
- 잘못된 영어 입력 감지: 사전 API 또는 영단어 데이터베이스를 사용하여 영어 입력의 정확성을 확인합니다.
- 변환 안내 또는 자동 변환 기능: 사용자 설정에 따라 변환을 안내하거나 자동으로 변환합니다.

## 설치 방법

```sh
# with npm
npm i typingchanger_easy

# with yarn
yarn add typingchanger_easy
```

## 사용 방법

commonJS
```js
const { convertKoreanToEnglish, convertEnglishToKorean, convertWithValidation } = require('typingchanger_easy');

// 한글을 영어로 변환
const koreanToEnglish = convertKoreanToEnglish('안녕하세요');
console.log(koreanToEnglish); // 'dkssudgktpdy'

// 영어를 한글로 변환
const englishToKorean = convertEnglishToKorean('dkssudgktpdy');
console.log(englishToKorean); // '안녕하세요'

// 자동 감지 후 변환
const autoDetected = convertWithValidation('dkssudgktpdy');
console.log(autoDetected); // '안녕하세요'

```
module
```js
import { convertKoreanToEnglish, convertEnglishToKorean, convertWithValidation } from 'typingchanger_easy';

// 한글을 영어로 변환
const koreanToEnglish = convertKoreanToEnglish('안녕하세요');
console.log(koreanToEnglish); // 'dkssudgktpdy'

// 영어를 한글로 변환
const englishToKorean = convertEnglishToKorean('dkssudgktpdy');
console.log(englishToKorean); // '안녕하세요'

// 자동 감지 후 변환
const autoDetected = convertWithValidation('dkssudgktpdy');
console.log(autoDetected); // '안녕하세요'

```
<h2>Methods</h2>
<p>모든 메서드는 독립적으로 사용할 수 있으며, 텍스트 변환 및 검증을 수행합니다.</p>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Params</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>convertKoreanToEnglish</td>
      <td>text: string</td>
      <td>영문 키보드 설정으로 입력된 한글 텍스트를 올바른 한글로 변환합니다.</td>
    </tr>
    <tr>
      <td>convertEnglishToKorean</td>
      <td>text: string</td>
      <td>한글 키보드 설정으로 입력된 영문 텍스트를 올바른 영어로 변환합니다.</td>
    </tr>
    <tr>
      <td>isCorrectKoreanString</td>
      <td>str: string</td>
      <td>주어진 문자열이 올바른 한글로 구성되었는지 확인합니다.</td>
    </tr>
    <tr>
      <td>isCorrectEnglishWord</td>
      <td>str: string</td>
      <td>주어진 문자열이 올바른 영어 단어인지 확인합니다.</td>
    </tr>
    <tr>
      <td>convertWithValidation</td>
      <td>text: string, priority: 'ko' | 'en' = 'ko'</td>
      <td>텍스트를 변환하면서, 한글 또는 영어로 처리해야 할지를 검증합니다.영어,한글 둘다 올바른 형태일때 옵션을 주어서 처리합니다.</td>
    </tr>
  </tbody>
</table>

<h2>Options</h2>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>priority</td>
      <td>'ko' | 'en'</td>
      <td>'ko'</td>
      <td><code>convertWithValidation</code> 함수에서 우선 순위를 설정합니다. 'ko'로 설정하면 한글로 변환하고, 'en'으로 설정하면 영어로 변환합니다.</td>
    </tr>
  </tbody>
</table>


## 라이선스

MIT 라이선스
