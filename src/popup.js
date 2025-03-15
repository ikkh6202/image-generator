// Pixabay API 관련 상수
const PIXABAY_API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 5;
let currentPage = 1;
let currentQuery = '';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 저장된 API 키 불러오기
    chrome.storage.local.get('pixabayApiKey', (data) => {
        if (data.pixabayApiKey) {
            document.getElementById('pixabayApiKey').value = data.pixabayApiKey;
        }
    });

    // API 키 저장 버튼
    document.querySelector('.api-key-save').addEventListener('click', () => {
        const apiKey = document.getElementById('pixabayApiKey').value.trim();
        if (apiKey) {
            chrome.storage.local.set({ pixabayApiKey: apiKey }, () => {
                alert('API 키가 저장되었습니다!');
            });
        }
    });

    // 검색 버튼
    document.querySelector('.search-button').addEventListener('click', () => {
        currentPage = 1;
        searchImages(true);
    });
    
    // 검색어 입력 필드 엔터 키
    document.getElementById('imageSearchQuery').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentPage = 1;
            searchImages(true);
        }
    });

    // 더 보기 버튼 이벤트 리스너
    document.querySelector('.load-more').addEventListener('click', () => {
        currentPage++;
        searchImages(false); // false는 결과를 초기화하지 않음을 의미
    });
});

// 이미지 검색
async function searchImages(resetResults = true) {
    const apiKey = document.getElementById('pixabayApiKey').value.trim();
    const query = document.getElementById('imageSearchQuery').value.trim();
    const resultsContainer = document.querySelector('.image-results');
    const loadMoreBtn = document.querySelector('.load-more');

    if (!apiKey || !query) {
        alert('API 키와 검색어를 모두 입력해주세요!');
        return;
    }

    if (resetResults) {
        currentPage = 1;
        currentQuery = query;
        resultsContainer.innerHTML = '<p>검색 중...</p>';
    }

    try {
        const url = `${PIXABAY_API_URL}?key=${apiKey}&q=${encodeURIComponent(currentQuery)}&page=${currentPage}&per_page=${PER_PAGE}&lang=ko&image_type=photo&safesearch=true`;

        // background script를 통해 API 호출
        const response = await chrome.runtime.sendMessage({
            type: 'PIXABAY_SEARCH',
            url: url
        });

        if (!response.success) {
            throw new Error(response.error);
        }

        const data = response.data;

        if (!data || !data.hits || data.hits.length === 0) {
            if (resetResults) {
                resultsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
            }
            loadMoreBtn.style.display = 'none';
            return;
        }

        const newResults = data.hits.map(image => `
            <div class="image-card">
                <img src="${image.webformatURL}" alt="${image.tags}" 
                    onerror="this.src='placeholder.jpg'">
                <div class="image-info">
                    <p>👤 ${image.user}</p>
                    <p>👍 ${image.likes} | 👁️ ${image.views}</p>
                    <div class="button-group">
                        <button onclick="downloadImage('${image.largeImageURL}', '${currentQuery}_${image.id}')">
                            💾 저장
                        </button>
                        <button onclick="copyImageUrl('${image.largeImageURL}')">
                            📋 URL 복사
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        if (resetResults) {
            resultsContainer.innerHTML = newResults;
        } else {
            resultsContainer.insertAdjacentHTML('beforeend', newResults);
        }

        // 더 보기 버튼 표시 여부 결정
        loadMoreBtn.style.display = data.totalHits > currentPage * PER_PAGE ? 'block' : 'none';

    } catch (error) {
        console.error('검색 오류:', error); // 디버깅용
        if (resetResults) {
            resultsContainer.innerHTML = `
                <p>검색 중 오류가 발생했습니다.</p>
                <p>API 키가 올바른지 확인해주세요.</p>
                <p>오류 내용: ${error.message}</p>
            `;
        }
        loadMoreBtn.style.display = 'none';
    }
}

// 이미지 다운로드
function downloadImage(url, filename) {
    chrome.downloads.download({
        url: url,
        filename: `${filename}.jpg`,
        saveAs: false
    });
}

// 이미지 URL 복사
function copyImageUrl(url) {
    navigator.clipboard.writeText(url)
        .then(() => alert('이미지 URL이 복사되었습니다!'))
        .catch(err => {
            console.error('URL 복사 오류:', err);
            alert('URL 복사에 실패했습니다.');
        });
}

// API 키 토글 기능
document.getElementById('togglePixabayKey').addEventListener('change', (e) => {
    const pixabayKeyInput = document.getElementById('pixabayApiKey');
    pixabayKeyInput.type = e.target.checked ? 'text' : 'password';
});

// 이미지를 에디터에 삽입하는 함수 추가
function insertImageToEditor(url, alt) {
    const blogContent = document.getElementById('blogContent');
    const imageHtml = `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto;">\n\n`;
    blogContent.value = blogContent.value + imageHtml;
    alert('이미지가 본문에 삽입되었습니다!');
} 