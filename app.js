/**
 * app.js — 朱砂印风格信封贺卡主应用逻辑
 *
 * 功能概览：
 * 1. 金粉粒子背景（tsParticles 替代原 Canvas 星空）
 * 2. 信封 3D 开启动画（参照 deltafrogtechnology/envelope-animation）
 *    - rotationY 0→180deg (800ms)
 *    - 翻盖 rotationX 0→-150deg (600ms)
 *    - 信纸 translateY -40px (500ms)
 * 3. 信件内容展示（打字机效果 + 段落逐段淡入）
 * 4. 背景音乐控制（淡入播放、暂停/恢复）
 *
 * 颜色约束（白名单）：
 * #101010（背景）#f5efe6（纸色）#b3241c（朱砂）#d4af37（金粉）
 *
 * 依赖：
 * - tsParticles v2.x CDN（全局变量 tsParticles）
 * - window.__LETTER__ 全局对象（动态加载的信件数据）
 *
 * 注意：
 * - 此脚本通过 index.html 中的 <script src="app.js"> 加载
 * - 执行时 __LETTER__ 数据已就绪
 */
(function () {
  'use strict';

  /* ===========================================================
     1. 信件数据引用
     从全局对象中取出信件内容，供后续打字动画和段落渲染使用
  =========================================================== */
  var LETTER = window.__LETTER__;

  /* ===========================================================
     2. 动画时间配置（毫秒）

     信封开启时序（参照 envelope-animation 基准）：
     步骤 1: 信封整体 rotationY 0→180deg     — 800ms
     步骤 2: 翻盖 rotationX 0→-150deg         — 600ms（与步骤1并行启动，延迟100ms）
     步骤 3: 信纸 translateY 0→-40px          — 500ms（步骤2完成后启动）
     步骤 4: 信封阶段淡出                      — 500ms
     步骤 5: 信件阶段淡入                      — 800ms
  =========================================================== */
  var TIMING = {
    envelopeRotate:    800,   // 信封整体 Y 轴旋转
    flapDelay:         100,   // 翻盖相对于信封旋转的启动延迟
    flapRotate:        600,   // 翻盖 X 轴旋转
    letterSlide:       500,   // 信纸上移动画
    envelopeFadeOut:   500,   // 信封阶段淡出
    crossfadeDelay:    300,   // 淡出后到淡入前的间隔
    letterFadeIn:      800,   // 信件阶段淡入
    typingSpeed:       100,   // 打字机每字符间隔
    paragraphStagger:  300,   // 段落依次出现的间隔
    closingDelay:      400    // 最后一个段落后到落款出现的延迟
  };

  /* ===========================================================
     3. 金粉粒子背景（tsParticles）

     替代原 Canvas 星空，使用 tsParticles 引擎。
     配置严格遵循基准：
     - 粒子数量: 60
     - 粒子颜色: #d4af37（金粉）
     - 透明度: 0.3
     - 移动速度: 0.2
     - 粒子大小: 1.2
  =========================================================== */

  /**
   * 初始化 tsParticles 金粉粒子效果
   * 在 #particles 容器中渲染缓慢漂浮的金色微粒，
   * 营造传统书信的典雅氛围。
   */
  function initParticles() {
    var container = document.getElementById('particles');
    if (typeof tsParticles === 'undefined' || !container) return;

    tsParticles.load('particles', {
      /* 基础配置 */
      fullScreen: false,
      background: {
        color: 'transparent'
      },

      /* 粒子参数（锁死值） */
      particles: {
        number: {
          value: 60,           // 粒子总数
          density: {
            enable: true
          }
        },
        color: {
          value: '#d4af37'     // 金粉色
        },
        opacity: {
          value: 0.3,          // 整体透明度
          random: true,        // 随机透明度变化，增加层次感
          anim: {
            enable: true,
            speed: 0.3,
            opacity_min: 0.1
          }
        },
        size: {
          value: 1.2,          // 基础大小
          random: true,
          anim: {
            enable: false
          }
        },

        /* 移动配置 */
        move: {
          enable: true,
          speed: 0.2,          // 缓慢漂浮
          direction: 'none',
          random: true,
          straight: false,
          out_modes: {
            default: 'out'
          }
        },

        /* 粒子连线（禁用，保持独立微粒效果） */
        links: {
          enable: false
        },

        /* 生命周期 */
        life: {
          duration: 20,
          count: 1
        }
      },

      /* 交互（禁用鼠标交互，纯装饰） */
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
          resize: true
        }
      },

      /* 检测模式：使用原生 JS 而非 WebGL/CSS，兼容性最佳 */
      detectRetina: true
    });
  }

  // 初始化粒子
  initParticles();


  /* ===========================================================
     4. DOM 元素引用
     集中获取所有需要操作的 DOM 元素，避免重复查询
  =========================================================== */
  var envelopePhase = document.getElementById('envelopePhase');  // 信封阶段容器
  var letterPhase   = document.getElementById('letterPhase');    // 信件阶段容器
  var envelopeEl    = document.getElementById('envelope');       // 信封可交互区域
  var envelope3d    = document.querySelector('.envelope');      // 3D 信封容器
  var flap          = document.getElementById('flap');           // 信封翻盖
  var letterInside  = document.getElementById('letterInside');   // 信封内信纸
  var letterPaper   = document.getElementById('letterPaper');    // 阅读区信纸
  var greetingEl    = document.getElementById('greeting');       // 称谓元素
  var paragraphsEl  = document.getElementById('paragraphs');     // 段落容器
  var closingEl     = document.getElementById('closing');        // 落款容器
  var bgmBtn        = document.getElementById('bgmBtn');         // 音乐按钮
  var bgmIcon       = document.getElementById('bgmIcon');        // 音乐图标
  var bgmAudio      = document.getElementById('bgmAudio');       // 音频元素

  /* ===========================================================
     5. 应用状态
  =========================================================== */
  var bgmPlaying = false;  // 背景音乐是否正在播放
  var opening = false;     // 是否正在执行开信封动画（防止重复触发）
  var bgmLoaded = false;   // 音频资源是否已加载


  /* ===========================================================
     6. 背景音乐模块

     包含三个功能：
     - startBGM(): 首次播放（带 3 秒淡入效果）
     - toggleBGM(): 切换播放/暂停状态
     - fadeVolume(): 平滑过渡音量
  =========================================================== */

  /**
   * 首次播放背景音乐
   * 音量从 0 开始，在 3 秒内平滑淡入到 0.5。
   * 使用 Promise 处理 play() 的异步结果。
   */
  function startBGM() {
    bgmAudio.volume = 0;
    if (!bgmLoaded) {
      bgmAudio.load();
      bgmLoaded = true;
    }
    var p = bgmAudio.play();
    if (p) {
      p.then(function () {
        bgmPlaying = true;
        bgmIcon.classList.add('playing');
        fadeVolume(0, 0.5, 3000);
      }).catch(function () {
        // 播放被浏览器策略阻止时静默处理
      });
    } else {
      bgmPlaying = true;
      bgmIcon.classList.add('playing');
      fadeVolume(0, 0.5, 3000);
    }
  }

  /**
   * 切换背景音乐播放/暂停
   * 根据当前播放状态决定是播放还是暂停，
   * 并同步更新图标样式。
   */
  function toggleBGM() {
    if (bgmAudio.paused) {
      if (!bgmLoaded) {
        bgmAudio.load();
        bgmLoaded = true;
      }
      var p = bgmAudio.play();
      if (p) {
        p.then(function () {
          bgmPlaying = true;
          bgmIcon.classList.add('playing');
        }).catch(function () {});
      } else {
        bgmPlaying = true;
        bgmIcon.classList.add('playing');
      }
    } else {
      bgmAudio.pause();
      bgmPlaying = false;
      bgmIcon.classList.remove('playing');
    }
  }

  /**
   * 音量平滑过渡
   * @param {number} from - 起始音量 (0 ~ 1)
   * @param {number} to   - 目标音量 (0 ~ 1)
   * @param {number} dur  - 过渡持续时间（毫秒）
   *
   * 使用三次缓出函数 (1 - (1-t)^3) 实现自然的音量变化曲线。
   */
  function fadeVolume(from, to, dur) {
    var start = performance.now();
    var diff = to - from;

    function tick(now) {
      var progress = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      bgmAudio.volume = from + diff * eased;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  /**
   * 音乐按钮点击事件
   * 使用捕获阶段注册，防止事件冒泡到信封触发重新打开。
   */
  bgmBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    toggleBGM();
  }, true);


  /* ===========================================================
     7. 信件内容动画模块

     包含三个功能：
     - typeGreeting(): 逐字打出称谓文本
     - showParagraphs(): 逐段淡入段落内容
     - startLetterAnimation(): 编排整个信件展示流程
  =========================================================== */

  /**
   * 打字机效果显示称谓
   * @param {string}   text  - 要逐字显示的称谓文本
   * @param {Function} cb    - 打字完成后的回调函数
   */
  function typeGreeting(text, cb) {
    var i = 0;

    // 创建闪烁光标
    var cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    greetingEl.appendChild(cursor);

    var iv = setInterval(function () {
      if (i < text.length) {
        greetingEl.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
      } else {
        clearInterval(iv);
        greetingEl.removeChild(cursor);
        cb();
      }
    }, TIMING.typingSpeed);
  }

  /**
   * 逐段淡入信件段落
   * @param {Function} cb - 所有段落显示完成后的回调函数
   */
  function showParagraphs(cb) {
    for (var i = 0; i < LETTER.paragraphs.length; i++) {
      (function (idx) {
        var p = document.createElement('p');
        p.className = 'letter-paragraph';
        p.textContent = LETTER.paragraphs[idx];
        paragraphsEl.appendChild(p);

        setTimeout(function () {
          p.classList.add('vis');
        }, (idx + 1) * TIMING.paragraphStagger);
      })(i);
    }

    setTimeout(
      cb,
      (LETTER.paragraphs.length + 1) * TIMING.paragraphStagger + TIMING.closingDelay
    );
  }

  /**
   * 启动信件内容展示的完整流程
   *
   * 时间线：
   * 0ms     ─ 等待 400ms 后开始
   * 400ms   ─ 开始打字机效果显示称谓
   * 打字完成 ─ 展开信纸（解除 max-height 限制）
   * 展开后 350ms ─ 逐段显示段落
   * 所有段落后 ─ 淡入落款
   * 1200ms  ─ 显示音乐按钮（与打字动画并行）
   */
  function startLetterAnimation() {
    setTimeout(function () {
      typeGreeting(LETTER.greeting, function () {
        letterPaper.classList.add('expanded');
        setTimeout(function () {
          showParagraphs(function () {
            closingEl.classList.add('vis');
          });
        }, 350);
      });
    }, 400);

    setTimeout(function () {
      bgmBtn.classList.add('vis');
    }, 1200);
  }


  /* ===========================================================
     8. 信封开启流程（3D 动画）

     参照 deltafrogtechnology/envelope-animation 的信封开启逻辑。

     动画时序：
     ┌─────────────────────────────────────────────────────┐
     │ 0ms          开始播放背景音乐                        │
     │ 0ms          信封整体 rotationY 0→180deg (800ms)     │
     │ 100ms        翻盖 rotationX 0→-150deg (600ms)       │
     │              （翻盖动画与信封旋转并行）               │
     │ 700ms        翻盖完成 (100+600)                      │
     │ 700ms        信纸 translateY 0→-40px (500ms)         │
     │ 800ms        信封旋转完成                            │
     │ 1200ms       信纸滑出完成 (700+500)                   │
     │ 1200ms       信封阶段开始淡出 (500ms)                 │
     │ 2000ms       淡出完成 + 间隔 300ms                    │
     │ 2000ms       切换到信件阶段（淡入 800ms）             │
     └─────────────────────────────────────────────────────┘

     使用 opening 状态锁防止重复触发。
  =========================================================== */

  function openEnvelope() {
    if (opening) return;
    opening = true;

    // 步骤 1：开始播放背景音乐
    startBGM();

    // 步骤 2：信封整体旋转 — rotationY 0→180deg
    envelope3d.classList.add('opened');

    // 步骤 3：翻盖旋转 — rotationX 0→-150deg（延迟 100ms 启动）
    setTimeout(function () {
      flap.classList.add('open');
    }, TIMING.flapDelay);

    // 步骤 4：信纸从信封中向上滑出（翻盖完成后启动）
    // 翻盖完成时间 = flapDelay + flapRotate = 100 + 600 = 700ms
    setTimeout(function () {
      letterInside.classList.add('reveal');
    }, TIMING.flapDelay + TIMING.flapRotate);

    // 步骤 5：信纸滑出后，执行阶段切换
    // 信纸完成时间 = 700 + letterSlide = 700 + 500 = 1200ms
    setTimeout(function () {
      // 信封阶段淡出
      envelopePhase.classList.add('ple');

      setTimeout(function () {
        // 隐藏信封阶段
        envelopePhase.classList.add('ph');
        envelopePhase.style.display = 'none';

        // 显示信件阶段（移除隐藏类，触发淡入动画）
        letterPhase.classList.remove('ph');
        letterPhase.style.display = '';
        letterPhase.classList.add('pen');

        // 启动信件内容动画
        startLetterAnimation();
      }, TIMING.envelopeFadeOut + TIMING.crossfadeDelay);
    },
      TIMING.flapDelay + TIMING.flapRotate + TIMING.letterSlide
    );
  }


  /* ===========================================================
     9. 事件绑定

     - 点击信封 → 打开信封
     - 键盘 Enter/Space → 无障碍支持
  =========================================================== */
  envelopeEl.addEventListener('click', openEnvelope);

  envelopeEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

})();
