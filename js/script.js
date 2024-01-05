$(function () {
  const $btnTop = $('.btn-top');
  const $header = $('#header');

  const $window = $(window);
  const $cursor = $('.cursor');
  const $spark = $('.spark');
  const $denWrap = $('.dendalien');
  const $den1 = $denWrap.find('.dendalien01');
  const $den2 = $denWrap.find('.dendalien02');
  const $den3 = $denWrap.find('.dendalien03');

  const $menu1 = $('.menu li:nth-child(1) a');
  const $menu2 = $('.menu li:nth-child(2) a');
  const $menu3 = $('.menu li:nth-child(3) a');
  const $menu4 = $('.menu li:nth-child(5) a');
  const portLink = $('.port li');
  const slideInfo = $('.slide-info li');

  let x = 0;
  let y = 0;

  // 보정되는 마우스 좌표값
  let mx = 0;
  let my = 0;
  let speed = 0.008;

  // 반복되는 동작(moving)을 변수에 저장(취소시키려고)
  let movingObj;

  // 함수를 3개 만들기
  // 1. 마우스 좌표값 받아오는 함수
  function getOffset() {
    $window.on('mousemove', function (e) {
      //마우스 좌표의 시작지점을 화면의 정중앙으로 이동
      x = e.pageX - $window.outerWidth() / 2;
      y = e.pageY - $window.outerHeight() / 2;
    });
  }
  // 2. 오브젝트를 움직이게 하는 함수
  //마우스의 기본 좌표값을 기준으로 어떤 값을 만들어 내자
  function moving() {
    mx += (x - mx) * speed;
    my += (y - my) * speed;

    // 오브젝트에 좌표값 적용
    $den1.css({
      transform: `translate(${-mx * 0.2}px,${my * 0.3}px) rotate(${my}deg)`,
    });
    $den2.css({
      transform: `translate3d(${mx * 0.5}px,${-my * 0.2}px,${mx}px)`,
    });
    $den3.css({
      transform: `translate3d(${mx * 0.2}px,${my * 0.7}px,${mx * 0.05}px) rotate(${mx}deg)`,
    });
    // 부드럽게 반복
    movingObj = requestAnimationFrame(moving);
  }
  // 3. 1번과 2번을 실행시키는 함수
  function initMoving() {
    getOffset();
    moving();
  }

  // cuser
  $window.on('mousemove', function (e) {
    // console.log(e);
    let mouseX = e.pageX;
    let mouseY = e.pageY;

    $cursor.add($spark).css({
      left: mouseX,
      top: mouseY,
    });
  });

  $window.on('mousedown', function () {
    $cursor.addClass('click');
  });
  $window.on('mouseup', function () {
    $cursor.removeClass('click');
  });

  $window.on('click', function () {
    $spark.addClass('click');
    setTimeout(function () {
      $spark.removeClass('click');
    }, 450);
  });

  // 메인 애니메이션 바뀌는 모습
  const mainTL = gsap.timeline();

  mainTL.from('.spore-wrap', { autoAlpha: 0, y: 100 });
  mainTL.from('.planet', { autoAlpha: 0, y: 100, duration: 0.3, ease: 'power1.in' });
  mainTL.from('.prince', { autoAlpha: 0, duration: 0.1, ease: 'power1.in' });
  mainTL.from('.fox', { autoAlpha: 0, duration: 0.1, ease: 'power1.in' });
  mainTL.from('.dendalien-missing', { autoAlpha: 0, duration: 0.1 });

  mainTL.to('.prince-wrap', { opacity: 0, delay: 5, duration: 1 });
  mainTL.from('.text h1', { autoAlpha: 0, y: -100, duration: 0.5 });
  mainTL.from('.text strong', { autoAlpha: 0, y: -50 });
  mainTL.from('.text p', { autoAlpha: 0, y: -50 });
  mainTL.from('.btn-menu', { autoAlpha: 0, y: -100, duration: 1 });
  mainTL.from($den1, { autoAlpha: 0, duration: 0.1, ease: 'power1.in' });
  mainTL.from($den2, { autoAlpha: 0, duration: 0.1, ease: 'power1.in' });
  mainTL.from($den3, { autoAlpha: 0, duration: 0.1, ease: 'power1.in' });
  mainTL.from('#myMenu', {
    autoAlpha: 0,
    ease: 'power1.in',
    // onComplete: () => initMoving(),
  });
  mainTL.from('.story1', {
    y: -20 /* translateY의 약자이다. */,
    /* repeat: 2 */ /* 원래동작 + 2 ,*/ repeat: -1 /* infinite */,
    yoyo: true /* alternate */,
    duration: 2,
  });

  // dandelien 홀씨 날리는 모습
  const sporeWrap = document.querySelector('.spore-wrap');

  // all-menu 클릭했을때
  $menu1.on('click', function (e) {
    e.preventDefault();
    // fullpage 메서드 :원하는 영역이름 탑버튼을 위해 사용
    $.fn.fullpage.moveTo(2);
  });
  $menu2.on('click', function (e) {
    e.preventDefault();
    // fullpage 메서드 :원하는 영역이름 탑버튼을 위해 사용
    $.fn.fullpage.moveTo(3);
  });
  $menu3.on('click', function (e) {
    e.preventDefault();
    // fullpage 메서드 :원하는 영역이름 탑버튼을 위해 사용
    $.fn.fullpage.moveTo(4);
  });
  $menu4.on('click', function (e) {
    e.preventDefault();
    // fullpage 메서드 :원하는 영역이름 탑버튼을 위해 사용
    $.fn.fullpage.moveTo(5);
  });

  // 동작을 함수로 정의
  function fluttering() {
    sporeWrap.classList.add('active');
  }

  // 원할때 동작을 실행
  setTimeout(fluttering, 1200); /* 초를 조절해야 한다. */
  // fullpage 초기화

  $('#fullpage').fullpage({
    // 1. 앵커 설정
    anchors: ['sec1', 'sec2', 'sec3', 'sec4', 'sec5'],
    // navigation: true,
    // 2. menu적용(인디케이터 커스텀)
    menu: '#myMenu',
    // 3.필요 옵션 적용
    // 스크롤링 기본값 700
    scrollingSpeed: 1400,
    // 고정시킬 요소
    fixedElements: '#header',
    // 영역 콘텐츠의 세로 정렬
    verticalCentered: false,

    // 스크롤바 생성되게
    scrollBar: true,

    // 큰 영역으로 이동할때 상단에 철컥 붙게
    bigSectionsDestination: 'top',

    // 영역의 로딩이 되고 나서
    afterLoad: function (anchorLink, index) {
      if (anchorLink === 'sec5') {
        $btnTop.fadeIn();
      }

      if (anchorLink === 'sec3') {
        runMatterAnimation();
      }

      // 두번째 영역에서는 자동 스크롤 취소 걸고나서 풀어준다
      if (anchorLink === 'sec2') {
        $.fn.fullpage.setAutoScrolling(false);
      } else {
        $.fn.fullpage.setAutoScrolling(true);
      }

      if (anchorLink === 'sec1') {
        initMoving();
      }
    },

    // 영역에서 떠날때
    onLeave: function (index, nextIndex, direction) {
      if (index === 5 && direction === 'up') {
        $btnTop.fadeOut();
      }

      if (index === 1 && direction === 'down') {
        cancelAnimationFrame(movingObj);
      }
    },
  });
  // 처음에는 숨기고
  $btnTop.hide();
  // go-top 버튼을 클릭했을 때
  $btnTop.on('click', function (e) {
    e.preventDefault();
    // fullpage 메서드 :원하는 영역이름 탑버튼을 위해 사용
    $.fn.fullpage.moveTo(1);
  });

  // swiper
  const slider1 = new Swiper('.slider1', {
    autoplay: true,
    loop: true,

    on: {
      slideChange: function () {
        const sIdx = this.realIndex;
        // console.log(this);

        // 활성화 표시 : css 확인
        portLink.removeClass('on');
        portLink.eq(sIdx).addClass('on');

        // slide-info 활성화
        slideInfo.removeClass('active');
        slideInfo.eq(sIdx).addClass('active');
      },
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.porfolio-button-prev',
      prevEl: '.porfolio-button-next',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  portLink.on('click', function (e) {
    e.preventDefault();

    const portLinkIdx = $(this).index();
    // console.log(portLinkIdx);

    // 활성화 표시 : css 확인
    portLink.removeClass('on');
    portLink.eq(portLinkIdx).addClass('on');

    //  swiper에서 메서드 중에서 슬라이드로 이동하는 메서드
    slider1.slideTo(portLinkIdx); /* 인덱스를 적어준 것이다. */
  });

  // 메뉴
  const $allMenu = $('.all-menu');
  const $btnMenu = $('.btn-menu');

  $btnMenu.on('click', function (e) {
    e.preventDefault();
    $(this).add($allMenu).toggleClass('active');
  });

  AOS.init();
});
