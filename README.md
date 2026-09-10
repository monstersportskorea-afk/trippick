# TripPick Referral Travel V1

## 지금 완성된 것
- 반응형 일본여행 레퍼럴 랜딩페이지
- eSIM / 숙소 / 관광·티켓 3개 수익 카테고리
- 구매의도형 SEO 가이드 10개
- 제휴링크 중앙관리 (`config.js`)
- GA4 연결 슬롯
- 제휴 클릭 이벤트 추적
- 제휴 고지 문구
- robots.txt / sitemap.xml 기본 파일

## 1. 제휴링크 연결
`config.js`를 열고 아래 3개 항목에 **승인받은 실제 제휴 링크**를 넣습니다.

```js
affiliateLinks: {
  airalo: "여기에 Airalo 또는 Travelpayouts eSIM 제휴링크",
  hotel: "여기에 숙소 제휴링크",
  activities: "여기에 관광/티켓 제휴링크"
}
```

파트너 ID를 임의로 만들면 추적이 안 되므로 반드시 계정에서 생성된 링크를 사용하세요.

## 2. 무료 배포
### GitHub Pages
1. GitHub에서 새 저장소 생성
2. 이 폴더의 파일 전체 업로드
3. Settings → Pages
4. Deploy from a branch
5. main / root 선택 후 저장

### Cloudflare Pages
1. Cloudflare Pages → Create project
2. GitHub 저장소 연결 또는 Direct Upload
3. 정적 사이트이므로 빌드 명령 없음
4. 루트 디렉터리 그대로 배포

## 3. GA4
`config.js`의 `ga4MeasurementId`에 `G-XXXXXXXXXX` 값을 넣으면 됩니다.
클릭 이벤트명은 `affiliate_click`이고 partner / placement 파라미터가 함께 기록됩니다.

## 4. 다음 확장 순서
1. 제휴 승인 및 실제 링크 입력
2. 도메인 연결
3. Search Console 등록
4. 실제 상품/가격 데이터 또는 공식 위젯 연결
5. 클릭 데이터가 발생한 콘텐츠만 확대
6. 일본 → 베트남 → 태국 → 대만 순으로 복제 검증

## 운영 원칙
- 첫 수익 전까지 유료 광고 사용 금지
- 사실이 확인되지 않은 가격/할인율 자동 생성 금지
- 제휴 수수료가 높은 상품보다 사용자 구매의도와 전환 데이터를 우선
- AI 생성 콘텐츠는 게시 전 사실/가격/조건 검증