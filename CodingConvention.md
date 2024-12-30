2024. 12. 25 

F(x).com 맞춤형 환율 조회 프로젝트 Convention Guide 
(Javascript 쪽에서 제일 유명한 Airbnb Javascript Style Guide 기반) 


### Coding Style  
  
1. 들여쓰기 규칙  
   들여쓰기: 탭 (2칸 공백으로 설정)  
   VS Code 확장인 Prettier로 설정  
  
2. 변수 선언  
   ※ var 대신 let과 const를 사용합니다.  
  
   const: 값을 변경하지 않는 변수  
   let: 값이 변경되는 변수  
  
   ※ let 사용 최소화: 되도록이면 const를 사용하여 불변성 유지  
  
3. 화살표 함수 사용  
   화살표 함수(() => {})는 간결하고 this 바인딩 문제를 피할 수 있기 때문에 추천  
   일반 함수 선언 대신 화살표 함수를 사용합니다.  
  
```
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}
// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```
  
4. template literals 사용  
   (문자열이 여러 줄로 이뤄졌거나, 변수를 포함할 때. 한 줄 짜리 단순 문자열은 외따옴표)  
  
   문자열을 **+**로 연결하기보다는 템플릿 리터럴(`)을 사용합니다.  
   가독성을 높이고, 코드가 간결해집니다.  

```
  const apiUrl = `https://api.exchangerate-api.com/v4/latest/${selectedCurrency}`;
  string = 'F(X)'
```  

5. 클래스와 객체 리터럴  
   클래스는 큰 규모의 애플리케이션에서만 사용하고, 객체 리터럴을 주로 사용합니다.
   예를 들어, 환율 정보를 다룰 때는 객체 리터럴로 데이터 구조를 정의하는 것이 간편합니다.  
  
   객체 리터럴 축약 구문을 사용하여, 코드의 길이를 줄이고 가독성을 높입니다.  
```
 = [];
 = {};
```
  
6. 불필요한 코드 줄이기  
   코드에서 불필요한 변수 및 중복된 로직 등을 제거하여 가독성을 높이고, 유지보수성을 강화합니다.  
   불필요한 주석은 피하고, 코드 자체로 의도를 명확히 전달합니다.
   주석은 꼭 필요한 부분에만 달고, **"왜 이 코드를 썼는지"**를 설명합니다.  

   주석 표기방식:  
   범위 (여러 줄): <* *>, <!-- --> 등 (VS Code 에서 범위를 드래그 후 Shift + Alt + A 단축키)  
   (HTML과 같은 환경에서는 복수줄 형식만을 따른다)  
  
   한 줄 : // (VS Code에서 Ctrl + / 단축키)  
  
7. ESLint와 Prettier 설정  
   ESLint를 사용하여 코드 품질을 유지하고, Prettier를 사용하여 포맷팅을 자동화합니다.  
   기본 규칙만 적용하되, 스타일 규칙에 대한 충돌을 방지하기 위해 **eslint-config-prettier**와 **eslint-plugin-prettier**를 함께 사용합니다.  
   
8. 프론트엔드에서의 컴포넌트화  
   React 컴포넌트는 가능한 한 작고 재사용 가능하게 작성합니다. 한 파일에 너무 많은 로직을 넣지 않도록 합니다.  
   컴포넌트 간 책임 분리를 명확히 하고, 기능별로 폴더 구조를 나누어 관리합니다.  
  
9. 비동기 처리  
   **async/await**를 사용하여 비동기 처리를 간결하게 작성합니다.  
   **try/catch**로 에러 처리를 제대로 해주는 것이 좋습니다.  
  
10. 모듈 불러오기  
   import를 사용하여 모듈을 불러오고, 상시로 디스트럭쳐링이 적용될 수 있도록 1개의 모듈이라도 {}로 처리합니다.
  
```
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```
  
11. 명명규칙  
   폴더, 파일 네이밍  
   파일은 소문자와 언더바(_)로 구성  
   ex) exchange_calculator.js  
  
   Object, Instance, 그리고 함수는 camel**C**ase 사용  
   Class, constructor(생성자)는 **P**ascal**C**ase 사용  
  
   상수는 대문자 + 언더스코어  
   ex) DEFAULT_TIMEOUT  
  
12. 커밋규칙  
  
   커밋 메시지  
   형식  
   '[타입] 내용'  
  
   타입  
   Feature: 기능 구현  
   Bug: 버그 발견/수정  
   Style: 디자인  
   Refactor: 코드 리팩토링  
  
   예시  
   git commit - '[Feature] 게시판 기능 구현'  
  
13. 폴더구조  
   back/front 나누기???  
  
   /assets: 사용할 아이콘이나 이미지 파일  
   /components: 사용할 컴포넌트(회원가입 창, 차트 등등)  
   /hooks: 상태 관리를 위해 만들어 놓은 hook 저장  
   /pages: main부터 웹페이지  
   /styles: css 파일같은 디자인 관련 코드(bootstrap이나 tailwind로 할듯함)  
   /utils: 정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치하는 폴더  
   (DB로부터 데이터 불러오는 함수나 인증을 위한 함수가 주로 들어갈 예정)  
  
14. Git flow  
   git flow init // 처음에 한 번만 하면 됨  
   git checkout develop  
   git pull // develop을 최신 버전으로 만듦. "Alreadt up to Date" 확인하기!  
   git flow feature start 피쳐이름  
   git rebase develop // 내 피쳐에 develop 브랜치의 소스코드를 전부 옮겨옴  
  
   작업 후  
   git add .  
   git commit -m '메세지'  
   git rebase develop // 혹시 모르니까 다시 rebase하기  
   git push // develop 브랜치에 잘 올라갔는지 확인!  
   git flow feature finish // 피쳐 없애기  
   
