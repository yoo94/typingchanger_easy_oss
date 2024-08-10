import { convertKoreanToEnglish, convertEnglishToKorean } from './core';

interface DropdownStyles {
    position?: string;
    backgroundColor?: string;
    border?: string;
    listStyle?: string;
    padding?: string;
    margin?: string;
    width?: string;
    zIndex?: string;
    [key: string]: string | undefined; // 추가적인 스타일도 허용
}

export function optionProvider(
    event: Event,
    inputId: string,
    customStyles: DropdownStyles = {} // 기본값을 빈 객체로 설정
): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    const value = inputElement.value;

    const convertedToEnglish = convertKoreanToEnglish(value);
    const convertedToKorean = convertEnglishToKorean(value);

    const recommendations = [];
    if (value !== convertedToEnglish) {
        recommendations.push(convertedToEnglish);
    }
    if (value !== convertedToKorean) {
        recommendations.push(convertedToKorean);
    }

    // 기존 추천 목록 삭제
    const existingDropdown = document.getElementById('recommendation-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    // 추천 목록 표시
    if (recommendations.length > 0) {
        const dropdown = document.createElement('ul');
        dropdown.id = 'recommendation-dropdown';

        // 기본 스타일 설정
        const defaultStyles: DropdownStyles = {
            position: 'absolute',
            backgroundColor: '#fff',
            border: '1px solid black',
            listStyle: 'none',
            padding: '0',
            margin: '0',
            width: `${inputElement.offsetWidth}px`,
            zIndex: '1000',
        };

        // 스타일 적용 (기본 스타일과 커스텀 스타일 병합)
        const styles = { ...defaultStyles, ...customStyles };
        Object.assign(dropdown.style, styles);

        let currentIndex = -1;

        recommendations.forEach((recommendation) => {
            const listItem = document.createElement('li');
            listItem.textContent = recommendation;
            listItem.style.padding = '8px';
            listItem.style.cursor = 'pointer';

            listItem.addEventListener('click', () => {
                inputElement.value = recommendation;
                dropdown.remove();
            });

            dropdown.appendChild(listItem);
        });

        inputElement.parentNode?.appendChild(dropdown);

        // Tab 키로 추천 항목 순환, Enter로 선택
        inputElement.addEventListener('keydown', function onKeydown(event: KeyboardEvent) {
            const items = dropdown.querySelectorAll('li');
            if (event.key === 'Tab') {
                event.preventDefault(); // 기본 Tab 동작을 방지
                if (currentIndex >= 0) {
                    items[currentIndex].style.backgroundColor = ''; // 이전 항목의 색상 초기화
                }
                currentIndex = (currentIndex + 1) % items.length; // 다음 항목으로 이동
                items[currentIndex].style.backgroundColor = '#b3d4fc'; // 현재 선택된 항목의 색상 변경
            } else if (event.key === 'Enter' && currentIndex >= 0) {
                event.preventDefault(); // 기본 Enter 동작을 방지
                inputElement.value = items[currentIndex].textContent || '';
                dropdown.remove();
                inputElement.removeEventListener('keydown', onKeydown);
            }
        });
    }
}
