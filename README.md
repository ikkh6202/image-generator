# 이미지생성기!!!!!!!!! 🖼️

<p align="center">
  <img src="assets/preview.gif" alt="이미지생성기 미리보기" width="600">
</p>

<p align="center">
  Pixabay API를 활용한 크롬 확장프로그램으로, 빠르고 쉽게 고품질 이미지를 검색하고 다운로드할 수 있습니다.
</p>

<p align="center">
  <a href="https://github.com/ikkh6202/image-generator">GitHub</a> •
  <a href="#설치-방법">설치 방법</a> •
  <a href="#사용-방법">사용 방법</a> •
  <a href="#기능">기능</a>
</p>

## ✨ 기능  

- 🔍 키워드 기반 이미지 검색
- 💾 이미지 다운로드
- 📋 이미지 URL 복사
- 📄 페이지네이션 (더 보기 기능)
- 🔐 API 키 저장 기능
- 🎨 모던한 UI/UX 디자인

## 🚀 설치 방법

1. 이 저장소를 클론합니다:

```bash
git clone https://github.com/ikkh6202/image-generator.git
```

2. Chrome 브라우저에서 `chrome://extensions`로 이동합니다.
3. 우측 상단의 "개발자 모드"를 활성화합니다.
4. "압축해제된 확장 프로그램을 로드합니다" 버튼을 클릭합니다.
5. 클론한 저장소의 `src` 폴더를 선택합니다.

## 📝 사용 방법

1. [Pixabay API 키](https://pixabay.com/api/docs/)를 발급받습니다.
2. 확장프로그램의 API 키 입력란에 발급받은 키를 입력하고 저장합니다.
3. 검색어를 입력하고 검색 버튼을 클릭합니다.
4. 원하는 이미지를 다운로드하거나 URL을 복사할 수 있습니다.
5. 더 많은 결과를 보려면 "더 보기" 버튼을 클릭합니다.

## 💻 기술 스택

- HTML5
- CSS3 (모던 애니메이션, Flexbox, Grid)
- JavaScript (ES6+)
- Chrome Extension API
- Pixabay API

## 📦 프로젝트 구조

```
image-generator/
├── src/
│   ├── popup.html      # 메인 UI
│   ├── popup.js        # 기능 구현
│   ├── styles.css      # 스타일링
│   ├── background.js   # API 요청 처리
│   └── manifest.json   # 확장프로그램 설정
├── assets/
│   └── icon.png        # 확장프로그램 아이콘
└── README.md
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 👨‍💻 제작자

**kimcoding** - [Website](https://kimcoding.co.kr)

## 📄 라이선스

이 프로젝트는 MIT 라이선스로 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- [Pixabay](https://pixabay.com/)
- [Chrome Extensions](https://developer.chrome.com/docs/extensions/)
- [Google Fonts](https://fonts.google.com/)