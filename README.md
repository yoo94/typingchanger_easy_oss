# typingchanger_easy
## npm 주소
https://www.npmjs.com/package/typingchanger_easy

typingchanger_easy는 한영 키를 잊고 타이핑했을 때 한글을 영어로, 영어를 한글로 자동 변환해주는 모듈입니다.
2벌식 키보드 배열을 기준으로 작동합니다.

주요 기능
- 한글 ⇄ 영어 변환: 한영 키를 바꾸지 않고 입력한 텍스트를 2벌식 키보드 배열 기준으로 변환합니다.
- 문장부호와 숫자 보존: 영어 입력을 한글로 바꿀 때 `!`, `2026` 같은 주변 문자를 유지합니다.
- 추천 UI 제공: 입력값 기준으로 한글/영어 변환 후보를 보여주고 키보드 또는 마우스로 선택할 수 있습니다.
  <br>*esm에서만 제공합니다*
  <br>(옵션 선택은 click, tab, 방향키, enter, esc를 이용할 수 있습니다.)

## 설치 방법

```sh
# with npm
npm i typingchanger_easy

# with yarn
yarn add typingchanger_easy
```

## 사용 방법

### commonJS
```js
const { convertKoreanToEnglish, convertEnglishToKorean, convertWithValidation } = require('typingchanger_easy');

// 한글을 영어로 변환
const koreanToEnglish = convertKoreanToEnglish('안녕하세요');
console.log(koreanToEnglish); // 'dkssudgktpdy'

// 영어를 한글로 변환
const englishToKorean = convertEnglishToKorean('dkssudgktpdy');
console.log(englishToKorean); // '안녕하세요'

```

### module
```js
import { convertKoreanToEnglish, convertEnglishToKorean, optionProvider } from 'typingchanger_easy';

// 한글을 영어로 변환
const koreanToEnglish = convertKoreanToEnglish('안녕하세요');
console.log(koreanToEnglish); // 'dkssudgktpdy'

// 영어를 한글로 변환
const englishToKorean = convertEnglishToKorean('dkssudgktpdy');
console.log(englishToKorean); // '안녕하세요';

// 추천 제공 기능 예시
document.getElementById('search').addEventListener('input', (event) => {
    optionProvider(event, 'search', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        backgroundColor: '#f0f8ff'
    });
});

document.getElementById('search').addEventListener('input', (event) => {
    optionProvider(event, 'searchArea', {
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      activeItemBackgroundColor: '#ffcc00', // 활성화된 항목의 배경색을 노란색으로 설정
      itemHoverBackgroundColor: '#fff3bf',
      itemPadding: '10px 12px',
    });
});
```

## 예제 실행

```sh
npm run build
cd example/vanillaProject
npm start
```

브라우저에서 `http://127.0.0.1:8080/example/vanillaProject/`로 확인할 수 있습니다.

## 예제 이미지

### `convertKoreanToEnglish(text)` / `convertEnglishToKorean(text)`

한글을 영어 키 입력값으로 바꾸는 `convertKoreanToEnglish`와, 영어 키 입력값을 한글로 조합하는 `convertEnglishToKorean` 사용 예시입니다.

![convertKoreanToEnglish, convertEnglishToKorean 예제](https://github.com/yoo94/typingchanger_easy_oss/blob/main/img.png)

### `optionProvider(event, inputId)`

기본 스타일로 입력값에 대한 변환 추천 목록을 보여주는 예시입니다.

![optionProvider 기본 스타일 예제](https://github.com/yoo94/typingchanger_easy_oss/blob/main/staticImg/img_1.png)

### `optionProvider(event, inputId, customStyles)`

세 번째 인자로 CSS 스타일 객체를 전달해 추천 목록의 배경색, 글자색, 테두리 등을 바꾼 예시입니다.

![optionProvider customStyles 예제](https://github.com/yoo94/typingchanger_easy_oss/blob/main/staticImg/img_2.png)

### `optionProvider(event, inputId, { activeItemBackgroundColor })`

Tab 또는 방향키로 추천 항목을 이동할 때 선택된 항목의 배경색을 `activeItemBackgroundColor`로 커스터마이징한 예시입니다.

![optionProvider activeItemBackgroundColor 예제](https://github.com/yoo94/typingchanger_easy_oss/blob/main/staticImg/img_3.png)


<h2>Methods</h2>

모든 메서드는 독립적으로 사용할 수 있으며, 텍스트 변환 및 추천 기능을 제공합니다.

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
      <td>영문 키보드 설정으로 입력된 한글 텍스트를 올바른 영어로 변환합니다.</td>
    </tr>
    <tr>
      <td>convertEnglishToKorean</td>
      <td>text: string</td>
      <td>한글 키보드 설정으로 입력된 영문 텍스트를 올바른 한글로 변환합니다.</td>
    </tr>
    <tr>
      <td>optionProvider</td>
      <td>event: Event, inputId: string, customStyles?: DropdownStyles</td>
      <td>입력된 텍스트에 따라 추천 목록을 제공하고, 사용자가 선택할 수 있도록 도와줍니다.</td>
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
      <td>customStyles</td>
      <td>DropdownStyles</td>
      <td>기본 스타일</td>
      <td><code>optionProvider</code> 함수에서 추천 목록의 스타일을 사용자 정의할 수 있습니다. 예를 들어 글꼴, 크기, 색상, 활성 항목 배경색, hover 배경색, 항목 padding 등을 설정할 수 있습니다.</td>
    </tr>
  </tbody>
</table>

* 커스텀 style은 일반 css 선택자와 동일하나 탭으로 선택한 옵션의 백그라운드 컬러는
  activeItemBackgroundColor로 조작 가능합니다. 항목 hover는 itemHoverBackgroundColor, 항목 padding은 itemPadding으로 조작할 수 있습니다.

# 라이선스
MIT 라이선스
