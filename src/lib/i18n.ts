export const locales = ["en", "ja", "ko", "zh-Hant", "zh-Hans"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ja: "JA",
  ko: "KO",
  "zh-Hant": "繁",
  "zh-Hans": "简",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

type Dict = {
  nav: {
    home: string;
    freeChart: string;
    samples: string;
    report: string;
    pricing: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    imageAlt: string;
  };
  value: {
    title: string;
    body: string;
    items: { title: string; body: string }[];
  };
  samples: {
    title: string;
    preview: string;
    cards: { lang: string; title: string; body: string }[];
  };
  pricing: {
    title: string;
    body: string;
    plans: { name: string; price: string; body: string }[];
    pay: string;
  };
  footer: {
    body: string;
  };
  freeChart: {
    title: string;
    body: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    placePlaceholder: string;
    gender: string;
    genderOptions: string[];
    submit: string;
    loading: string;
    error: string;
    resultTitle: string;
    unlock: string;
    pillars: string[];
    elementTitle: string;
    summaryTitle: string;
    tipsTitle: string;
    elementNames: Record<string, string>;
    stemNames: Record<string, string>;
    branchNames: Record<string, string>;
    summaryTemplate: string;
    tipsTemplates: string[];
  };
  report: {
    title: string;
    body: string;
    visible: string;
    locked: string;
    buy: string;
    tocTitle: string;
    previewBody: string;
    lockedBody: string;
    sections: string[];
    delivery: {
      title: string;
      body: string;
      email: string;
      unlock: string;
      checkoutLoading: string;
      generate: string;
      generating: string;
      success: string;
      error: string;
      checkoutError: string;
      emailRequired: string;
      lockedNotice: string;
      unlocked: string;
      model: string;
    };
  };
};

export const dictionaries: Record<Locale, Dict> = {
  en: {
    nav: {
      home: "Home",
      freeChart: "Free chart",
      samples: "Samples",
      report: "Report",
      pricing: "Pricing",
      cta: "Try free",
    },
    hero: {
      eyebrow: "Eastern Chart",
      title: "A serious BaZi report, written for modern decisions.",
      body: "Enter your birth data once. Receive a clear chart, element balance, and multilingual AI interpretation.",
      primary: "Start free chart",
      secondary: "View sample report",
      imageAlt: "Printed BaZi report booklet on a dark desk",
    },
    value: {
      title: "Built like a product, not a fortune page.",
      body: "The system turns traditional structure into readable decisions: timing, temperament, relationships, work, and annual focus.",
      items: [
        {
          title: "Eastern depth",
          body: "Four pillars, five elements, day master context, and seasonal balance are organized as a coherent reading.",
        },
        {
          title: "AI personalization",
          body: "Generated sections adapt to birthplace, time precision, report depth, and the language you choose.",
        },
        {
          title: "Multilingual reports",
          body: "English, Japanese, Korean, Traditional Chinese, and Simplified Chinese pages are ready.",
        },
      ],
    },
    samples: {
      title: "Sample reports with a clean product spine.",
      preview: "PDF preview",
      cards: [
        {
          lang: "English",
          title: "Career timing",
          body: "A concise reading of work rhythm, leadership style, and favorable annual windows.",
        },
        {
          lang: "Japanese",
          title: "Relationship pattern",
          body: "A private summary of emotional cadence, communication strengths, and points of friction.",
        },
        {
          lang: "Chinese",
          title: "Annual focus",
          body: "A year view across wealth, health habits, decision timing, and self-management.",
        },
      ],
    },
    pricing: {
      title: "Simple pricing for the first release.",
      body: "Start with a free chart. Upgrade only when the preview is useful.",
      plans: [
        { name: "Free", price: "$0", body: "Chart, element ratio, day master summary, and three prompts." },
        { name: "Deep Report", price: "$19.99", body: "Full AI report with personality, career, relationship, and timing chapters." },
        { name: "Annual Report", price: "$39.99", body: "Deep report plus yearly flow, monthly focus, and priority guidance." },
      ],
      pay: "Secure embedded checkout is prepared for production payment.",
    },
    footer: {
      body: "For self-reflection and entertainment. Not medical, legal, or financial advice.",
    },
    freeChart: {
      title: "Free BaZi chart",
      body: "Generate a first-pass four-pillar reading and element balance locally.",
      birthDate: "Birth date",
      birthTime: "Birth time",
      birthPlace: "Birth place",
      placePlaceholder: "Tokyo",
      gender: "Gender",
      genderOptions: ["Female", "Male", "Non-binary", "Prefer not to say"],
      submit: "Generate chart",
      loading: "Calculating chart",
      error: "Please complete date, time, and place.",
      resultTitle: "Your first chart",
      unlock: "Unlock full report",
      pillars: ["Year", "Month", "Day", "Hour"],
      elementTitle: "Five element balance",
      summaryTitle: "Day master summary",
      tipsTitle: "Personal prompts",
      elementNames: { wood: "Wood", fire: "Fire", earth: "Earth", metal: "Metal", water: "Water" },
      stemNames: {
        jia: "Jia",
        yi: "Yi",
        bing: "Bing",
        ding: "Ding",
        wu: "Wu",
        ji: "Ji",
        geng: "Geng",
        xin: "Xin",
        ren: "Ren",
        gui: "Gui",
      },
      branchNames: {
        zi: "Zi",
        chou: "Chou",
        yin: "Yin",
        mao: "Mao",
        chen: "Chen",
        si: "Si",
        wu: "Wu",
        wei: "Wei",
        shen: "Shen",
        you: "You",
        xu: "Xu",
        hai: "Hai",
      },
      summaryTemplate: "{dayMaster} day master with {strongest} most visible and {quietest} asking for more deliberate support.",
      tipsTemplates: [
        "Use {strongest} periods for visible decisions and outward commitments.",
        "Protect {quietest} through routine, rest, and smaller promises before large moves.",
        "Treat this free chart as orientation. The paid report expands timing, relationships, and annual focus.",
      ],
    },
    report: {
      title: "Premium report preview",
      body: "The first chapters are visible. Purchase unlocks the complete PDF report and delivery flow.",
      visible: "Preview",
      locked: "Locked",
      buy: "Buy full report",
      tocTitle: "Report contents",
      previewBody: "This section includes a concise reading, chart evidence, and a plain-language interpretation.",
      lockedBody: "This section is included in the paid PDF and delivered after checkout confirmation.",
      sections: [
        "Chart structure and day master",
        "Five element balance",
        "Temperament and decision style",
        "Career rhythm and work environment",
        "Relationships and communication",
        "Wealth signals and risk habits",
        "Annual flow and monthly focus",
        "Decision timing",
        "Health habits and recovery rhythm",
        "Risk patterns to watch",
        "Strengths to develop",
        "Practical action plan",
      ],
      delivery: {
        title: "Complete report delivery",
        body: "Pay once with Gumroad. After checkout, the embedded payment window closes and the full 12-section report unlocks automatically.",
        email: "Delivery email",
        unlock: "Unlock full report $19.99",
        checkoutLoading: "Opening checkout",
        generate: "Generate full report",
        generating: "Generating report",
        success: "Full report generated",
        error: "Report generation failed. Please try again.",
        checkoutError: "Checkout could not be opened. Please try again.",
        emailRequired: "Enter the email address that should receive the report link.",
        lockedNotice: "Sections 4-12 unlock after the $19.99 Gumroad checkout. Keep this page open so the report can generate automatically.",
        unlocked: "Payment confirmed. Your full report is unlocked and generation will start automatically.",
        model: "Generated by DeepSeek",
      },
    },
  },
  ja: {
    nav: { home: "ホーム", freeChart: "無料命式", samples: "サンプル", report: "レポート", pricing: "料金", cta: "無料で試す" },
    hero: {
      eyebrow: "Eastern Chart",
      title: "現代の判断に使える、端正な四柱推命レポート。",
      body: "出生情報を一度入力するだけで、命式、五行バランス、多言語のAI解釈を確認できます。",
      primary: "無料命式を作成",
      secondary: "サンプルを見る",
      imageAlt: "暗い机に置かれた四柱推命レポート冊子",
    },
    value: {
      title: "占いページではなく、信頼できるプロダクトとして設計。",
      body: "伝統的な構造を、時期、気質、人間関係、仕事、年運の読みやすい判断材料へ整理します。",
      items: [
        { title: "東洋命理の深さ", body: "四柱、五行、日主、季節性を一つの読みとして整理します。" },
        { title: "AI個別解釈", body: "出生地、時刻の精度、レポート種別、言語に合わせて章を生成します。" },
        { title: "多言語対応", body: "英語、日本語、韓国語、繁体字、簡体字の導線を初版から用意しています。" },
      ],
    },
    samples: {
      title: "読みやすい構成のサンプルレポート。",
      preview: "PDFプレビュー",
      cards: [
        { lang: "English", title: "Career timing", body: "仕事のリズム、リーダーシップ、年ごとの好機を簡潔に整理。" },
        { lang: "日本語", title: "関係性の傾向", body: "感情のリズム、伝え方の強み、摩擦点を静かにまとめます。" },
        { lang: "繁體中文", title: "年間フォーカス", body: "財運、生活習慣、判断時期、自己管理の観点で一年を俯瞰します。" },
      ],
    },
    pricing: {
      title: "初版にふさわしい明快な料金。",
      body: "無料命式から始め、プレビューに価値を感じた時だけアップグレードできます。",
      plans: [
        { name: "Free", price: "$0", body: "命式、五行比率、日主サマリー、3つのヒント。" },
        { name: "Deep Report", price: "$19.99", body: "性格、仕事、関係性、時期を含む完全AIレポート。" },
        { name: "Annual Report", price: "$39.99", body: "深掘りレポートに年運、月別焦点、優先事項を追加。" },
      ],
      pay: "本番決済向けの埋め込みチェックアウトを準備済みです。",
    },
    footer: { body: "自己理解と娯楽のための内容です。医療、法律、金融助言ではありません。" },
    freeChart: {
      title: "無料命式",
      body: "ローカル計算で四柱と五行バランスの初期読みを生成します。",
      birthDate: "生年月日",
      birthTime: "出生時刻",
      birthPlace: "出生地",
      placePlaceholder: "東京",
      gender: "性別",
      genderOptions: ["女性", "男性", "ノンバイナリー", "回答しない"],
      submit: "命式を生成",
      loading: "計算中",
      error: "日付、時刻、出生地を入力してください。",
      resultTitle: "最初の命式",
      unlock: "完全レポートを解放",
      pillars: ["年柱", "月柱", "日柱", "時柱"],
      elementTitle: "五行バランス",
      summaryTitle: "日主サマリー",
      tipsTitle: "個別ヒント",
      elementNames: { wood: "木", fire: "火", earth: "土", metal: "金", water: "水" },
      stemNames: { jia: "甲", yi: "乙", bing: "丙", ding: "丁", wu: "戊", ji: "己", geng: "庚", xin: "辛", ren: "壬", gui: "癸" },
      branchNames: { zi: "子", chou: "丑", yin: "寅", mao: "卯", chen: "辰", si: "巳", wu: "午", wei: "未", shen: "申", you: "酉", xu: "戌", hai: "亥" },
      summaryTemplate: "日主は{dayMaster}。{strongest}が最も表れやすく、{quietest}は意識して補うと安定します。",
      tipsTemplates: [
        "{strongest}が強まる時期は、外向きの決断や約束を進めやすい流れです。",
        "{quietest}は日々の習慣、休息、小さな約束で守るほど整います。",
        "無料命式は入口です。有料レポートでは時期、関係性、年運を詳しく読み解きます。",
      ],
    },
    report: {
      title: "有料レポートのプレビュー",
      body: "最初の章を確認できます。購入後に完全PDFと配信フローが解放されます。",
      visible: "プレビュー",
      locked: "ロック中",
      buy: "完全レポートを購入",
      tocTitle: "レポート目次",
      previewBody: "この章には、簡潔な読み、命式上の根拠、日常語での解釈が含まれます。",
      lockedBody: "この章は有料PDFに含まれ、決済確認後に配信されます。",
      sections: [
        "命式構造と日主",
        "五行バランス",
        "気質と判断スタイル",
        "仕事のリズム",
        "関係性と伝え方",
        "財の傾向とリスク習慣",
        "年運と月別焦点",
        "判断のタイミング",
        "健康習慣と回復リズム",
        "注意すべきリスク傾向",
        "伸ばすべき強み",
        "実践アクションプラン",
      ],
      delivery: {
        title: "完全レポートの生成",
        body: "Gumroad で一度だけ決済します。埋め込み決済画面が閉じると、12章すべてのレポートが自動で解放されます。",
        email: "受信用メール",
        unlock: "完全レポートを $19.99 で解放",
        checkoutLoading: "決済画面を開いています",
        generate: "完全レポートを生成",
        generating: "レポート生成中",
        success: "完全レポートを生成しました",
        error: "レポート生成に失敗しました。もう一度お試しください。",
        checkoutError: "決済画面を開けませんでした。もう一度お試しください。",
        emailRequired: "レポートリンクを受け取るメールアドレスを入力してください。",
        lockedNotice: "第4章から第12章は $19.99 の Gumroad 決済後に解放されます。自動生成のため、このページを開いたままにしてください。",
        unlocked: "決済を確認しました。完全レポートが解放され、生成が自動で始まります。",
        model: "DeepSeek により生成",
      },
    },
  },
  ko: {
    nav: { home: "홈", freeChart: "무료 명식", samples: "샘플", report: "리포트", pricing: "가격", cta: "무료 시작" },
    hero: {
      eyebrow: "Eastern Chart",
      title: "현대적 결정을 위한 정제된 사주 리포트.",
      body: "출생 정보를 한 번 입력하면 명식, 오행 균형, 다국어 AI 해석을 확인할 수 있습니다.",
      primary: "무료 명식 만들기",
      secondary: "샘플 보기",
      imageAlt: "어두운 책상 위에 놓인 사주 리포트 책자",
    },
    value: {
      title: "점술 페이지가 아니라 신뢰할 수 있는 제품으로 설계했습니다.",
      body: "전통 구조를 시기, 기질, 관계, 일, 연간 초점으로 읽기 쉽게 정리합니다.",
      items: [
        { title: "동양 명리의 깊이", body: "사주, 오행, 일간, 계절 균형을 하나의 흐름으로 구성합니다." },
        { title: "AI 개인화", body: "출생지, 시간 정확도, 리포트 깊이, 선택 언어에 맞춰 내용을 생성합니다." },
        { title: "다국어 리포트", body: "영어, 일본어, 한국어, 번체 중국어, 간체 중국어 페이지를 첫 릴리스부터 제공합니다." },
      ],
    },
    samples: {
      title: "제품처럼 정돈된 샘플 리포트.",
      preview: "PDF 미리보기",
      cards: [
        { lang: "English", title: "Career timing", body: "업무 리듬, 리더십 스타일, 유리한 연간 흐름을 간결하게 정리합니다." },
        { lang: "日本語", title: "関係性の傾向", body: "감정 리듬, 소통 강점, 마찰 지점을 차분하게 요약합니다." },
        { lang: "繁體中文", title: "연간 초점", body: "재물, 생활 습관, 판단 시기, 자기 관리를 한 해의 관점에서 봅니다." },
      ],
    },
    pricing: {
      title: "첫 버전에 맞는 단순한 가격.",
      body: "무료 명식으로 시작하고, 미리보기가 도움이 될 때만 업그레이드하세요.",
      plans: [
        { name: "Free", price: "$0", body: "명식, 오행 비율, 일간 요약, 개인 프롬프트 3개." },
        { name: "Deep Report", price: "$19.99", body: "성향, 커리어, 관계, 시기를 포함한 전체 AI 리포트." },
        { name: "Annual Report", price: "$39.99", body: "심층 리포트에 연간 흐름, 월별 초점, 우선순위를 추가합니다." },
      ],
      pay: "프로덕션 결제를 위한 임베디드 체크아웃이 준비되어 있습니다.",
    },
    footer: { body: "자기 이해와 엔터테인먼트를 위한 내용입니다. 의료, 법률, 금융 조언이 아닙니다." },
    freeChart: {
      title: "무료 사주 명식",
      body: "로컬 계산으로 사주와 오행 균형의 첫 해석을 생성합니다.",
      birthDate: "생년월일",
      birthTime: "출생 시간",
      birthPlace: "출생지",
      placePlaceholder: "서울",
      gender: "성별",
      genderOptions: ["여성", "남성", "논바이너리", "응답하지 않음"],
      submit: "명식 생성",
      loading: "계산 중",
      error: "날짜, 시간, 출생지를 입력해주세요.",
      resultTitle: "첫 명식",
      unlock: "전체 리포트 열기",
      pillars: ["년주", "월주", "일주", "시주"],
      elementTitle: "오행 균형",
      summaryTitle: "일간 요약",
      tipsTitle: "개인 힌트",
      elementNames: { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" },
      stemNames: { jia: "갑", yi: "을", bing: "병", ding: "정", wu: "무", ji: "기", geng: "경", xin: "신", ren: "임", gui: "계" },
      branchNames: { zi: "자", chou: "축", yin: "인", mao: "묘", chen: "진", si: "사", wu: "오", wei: "미", shen: "신", you: "유", xu: "술", hai: "해" },
      summaryTemplate: "{dayMaster} 일간입니다. {strongest} 기운이 가장 잘 드러나고, {quietest} 기운은 의식적으로 보완할수록 안정됩니다.",
      tipsTemplates: [
        "{strongest} 흐름이 강한 시기에는 외부 결정과 약속을 진행하기 좋습니다.",
        "{quietest} 기운은 루틴, 휴식, 작은 약속을 통해 보호하세요.",
        "무료 명식은 방향을 잡는 단계입니다. 유료 리포트는 시기, 관계, 연간 흐름을 확장합니다.",
      ],
    },
    report: {
      title: "프리미엄 리포트 미리보기",
      body: "첫 장은 볼 수 있습니다. 구매 후 전체 PDF와 전달 흐름이 열립니다.",
      visible: "미리보기",
      locked: "잠김",
      buy: "전체 리포트 구매",
      tocTitle: "리포트 목차",
      previewBody: "이 장에는 간결한 해석, 명식 근거, 쉬운 언어의 설명이 포함됩니다.",
      lockedBody: "이 장은 유료 PDF에 포함되며 결제 확인 후 전달됩니다.",
      sections: [
        "명식 구조와 일간",
        "오행 균형",
        "기질과 판단 스타일",
        "커리어 리듬",
        "관계와 소통",
        "재물 신호와 위험 습관",
        "연간 흐름과 월별 초점",
        "판단 타이밍",
        "건강 습관과 회복 리듬",
        "주의할 위험 패턴",
        "키워야 할 강점",
        "실행 계획",
      ],
      delivery: {
        title: "전체 리포트 생성",
        body: "Gumroad로 한 번 결제합니다. 임베디드 결제창이 닫히면 12개 섹션 전체가 자동으로 열립니다.",
        email: "전달 이메일",
        unlock: "전체 리포트 $19.99 해제",
        checkoutLoading: "결제창 여는 중",
        generate: "전체 리포트 생성",
        generating: "리포트 생성 중",
        success: "전체 리포트가 생성되었습니다",
        error: "리포트 생성에 실패했습니다. 다시 시도해주세요.",
        checkoutError: "결제창을 열 수 없습니다. 다시 시도해주세요.",
        emailRequired: "리포트 링크를 받을 이메일 주소를 입력해주세요.",
        lockedNotice: "4-12장은 $19.99 Gumroad 결제 후 열립니다. 자동 생성을 위해 이 페이지를 열어두세요.",
        unlocked: "결제가 확인되었습니다. 전체 리포트가 열렸고 자동 생성이 시작됩니다.",
        model: "DeepSeek 생성",
      },
    },
  },
  "zh-Hant": {
    nav: { home: "首頁", freeChart: "免費排盤", samples: "樣例", report: "報告", pricing: "定價", cta: "免費試算" },
    hero: {
      eyebrow: "Eastern Chart",
      title: "一份為現代決策而寫的嚴肅八字報告。",
      body: "輸入一次出生資料，即可取得命盤、五行比例與多語 AI 解讀。",
      primary: "開始免費排盤",
      secondary: "查看樣例報告",
      imageAlt: "深色桌面上的八字命理報告冊",
    },
    value: {
      title: "像高端產品一樣設計，而不是廉價算命頁。",
      body: "我們把傳統命理結構整理成可閱讀的判斷線索：時機、氣質、關係、工作與年度重點。",
      items: [
        { title: "東方命理深度", body: "四柱、五行、日主與季節平衡會被組織成一份連貫的解讀。" },
        { title: "AI 個性化解讀", body: "內容會依出生地、時間精度、報告深度與所選語言調整。" },
        { title: "多語言報告", body: "英文、日文、韓文、繁體中文與簡體中文路由已在首版準備就緒。" },
      ],
    },
    samples: {
      title: "結構清晰、可付費交付的樣例報告。",
      preview: "PDF 預覽",
      cards: [
        { lang: "英文", title: "事業時機", body: "簡明整理工作節奏、領導方式與較有利的年度窗口。" },
        { lang: "日文", title: "關係模式", body: "私密總結情緒節奏、溝通優勢與容易摩擦的位置。" },
        { lang: "繁體中文", title: "年度重點", body: "從財務、健康習慣、決策時機與自我管理看一整年的走向。" },
      ],
    },
    pricing: {
      title: "首版定價清楚直接。",
      body: "先從免費排盤開始，覺得預覽有價值時再升級。",
      plans: [
        { name: "免費版", price: "$0", body: "命盤、五行比例、日主摘要與三條個性化提示。" },
        { name: "深度報告", price: "$19.99", body: "完整 AI 報告，包含性格、事業、關係與時機章節。" },
        { name: "年度報告", price: "$39.99", body: "深度報告加上年度流年、月度焦點與優先建議。" },
      ],
      pay: "已準備可用於正式收款的嵌入式結帳流程。",
    },
    footer: { body: "內容用於自我理解與娛樂，不構成醫療、法律或財務建議。" },
    freeChart: {
      title: "免費八字排盤",
      body: "在本地生成第一版四柱資訊與五行比例。",
      birthDate: "出生日期",
      birthTime: "出生時間",
      birthPlace: "出生地點",
      placePlaceholder: "臺北",
      gender: "性別",
      genderOptions: ["女性", "男性", "非二元", "不願透露"],
      submit: "生成命盤",
      loading: "正在排盤",
      error: "請完整填寫日期、時間與出生地點。",
      resultTitle: "你的初步命盤",
      unlock: "解鎖完整報告",
      pillars: ["年柱", "月柱", "日柱", "時柱"],
      elementTitle: "五行比例",
      summaryTitle: "日主摘要",
      tipsTitle: "個性化提示",
      elementNames: { wood: "木", fire: "火", earth: "土", metal: "金", water: "水" },
      stemNames: { jia: "甲", yi: "乙", bing: "丙", ding: "丁", wu: "戊", ji: "己", geng: "庚", xin: "辛", ren: "壬", gui: "癸" },
      branchNames: { zi: "子", chou: "丑", yin: "寅", mao: "卯", chen: "辰", si: "巳", wu: "午", wei: "未", shen: "申", you: "酉", xu: "戌", hai: "亥" },
      summaryTemplate: "此盤以{dayMaster}為日主，{strongest}較明顯，{quietest}需要更有意識地補足與穩定。",
      tipsTemplates: [
        "{strongest}較旺的階段，適合推進外部承諾、公開決策與可見成果。",
        "{quietest}需要透過規律、休息與較小的承諾慢慢守住。",
        "免費排盤只是入口。付費報告會展開時機、關係模式與年度重點。",
      ],
    },
    report: {
      title: "付費報告預覽",
      body: "前幾節可先閱讀。購買後會解鎖完整 PDF 報告與交付流程。",
      visible: "可預覽",
      locked: "已鎖定",
      buy: "購買完整報告",
      tocTitle: "報告目錄",
      previewBody: "本節包含簡明解讀、命盤依據與可直接理解的日常語言說明。",
      lockedBody: "本節包含在付費 PDF 中，付款確認後交付。",
      sections: [
        "命盤結構與日主",
        "五行比例",
        "氣質與決策風格",
        "事業節奏與工作環境",
        "關係與溝通模式",
        "財富訊號與風險習慣",
        "年度流年與月度焦點",
        "決策時機",
        "健康習慣與恢復節奏",
        "需要留意的風險模式",
        "值得發展的優勢",
        "實踐行動方案",
      ],
      delivery: {
        title: "完整報告交付",
        body: "透過 Gumroad 一次性付款。嵌入式付款視窗關閉後，會自動解鎖完整 12 節報告。",
        email: "接收信箱",
        unlock: "解鎖完整報告 $19.99",
        checkoutLoading: "正在開啟結帳",
        generate: "生成完整報告",
        generating: "正在生成報告",
        success: "完整報告已生成",
        error: "報告生成失敗，請稍後再試。",
        checkoutError: "無法開啟結帳，請稍後再試。",
        emailRequired: "請輸入要接收報告連結的信箱。",
        lockedNotice: "第 4-12 節會在 $19.99 Gumroad 付款後解鎖。請保持此頁開啟，以便自動生成報告。",
        unlocked: "付款已確認。完整報告已解鎖，系統會自動開始生成。",
        model: "由 DeepSeek 生成",
      },
    },
  },
  "zh-Hans": {
    nav: { home: "首页", freeChart: "免费排盘", samples: "样例", report: "报告", pricing: "定价", cta: "免费试算" },
    hero: {
      eyebrow: "Eastern Chart",
      title: "一份为现代决策而写的严肃八字报告。",
      body: "输入一次出生资料，即可获得命盘、五行比例和多语言 AI 解读。",
      primary: "开始免费排盘",
      secondary: "查看样例报告",
      imageAlt: "深色桌面上的八字命理报告册",
    },
    value: {
      title: "像高端产品一样设计，而不是廉价算命页。",
      body: "我们把传统命理结构整理成可阅读的判断线索：时机、气质、关系、工作和年度重点。",
      items: [
        { title: "东方命理深度", body: "四柱、五行、日主和季节平衡会被组织成一份连贯的解读。" },
        { title: "AI 个性化解读", body: "内容会依出生地、时间精度、报告深度和所选语言调整。" },
        { title: "多语言报告", body: "英文、日文、韩文、繁体中文和简体中文路由已在首版准备就绪。" },
      ],
    },
    samples: {
      title: "结构清晰、可付费交付的样例报告。",
      preview: "PDF 预览",
      cards: [
        { lang: "英文", title: "事业时机", body: "简明整理工作节奏、领导方式和较有利的年度窗口。" },
        { lang: "日文", title: "关系模式", body: "私密总结情绪节奏、沟通优势和容易摩擦的位置。" },
        { lang: "简体中文", title: "年度重点", body: "从财务、健康习惯、决策时机和自我管理看一整年的走向。" },
      ],
    },
    pricing: {
      title: "首版定价清楚直接。",
      body: "先从免费排盘开始，觉得预览有价值时再升级。",
      plans: [
        { name: "免费版", price: "$0", body: "命盘、五行比例、日主摘要和三条个性化提示。" },
        { name: "深度报告", price: "$19.99", body: "完整 AI 报告，包含性格、事业、关系和时机章节。" },
        { name: "年度报告", price: "$39.99", body: "深度报告加上年度流年、月度焦点和优先建议。" },
      ],
      pay: "已准备可用于正式收款的嵌入式结账流程。",
    },
    footer: { body: "内容用于自我理解和娱乐，不构成医疗、法律或财务建议。" },
    freeChart: {
      title: "免费八字排盘",
      body: "在本地生成第一版四柱信息和五行比例。",
      birthDate: "出生日期",
      birthTime: "出生时间",
      birthPlace: "出生地点",
      placePlaceholder: "上海",
      gender: "性别",
      genderOptions: ["女性", "男性", "非二元", "不愿透露"],
      submit: "生成命盘",
      loading: "正在排盘",
      error: "请完整填写日期、时间和出生地点。",
      resultTitle: "你的初步命盘",
      unlock: "解锁完整报告",
      pillars: ["年柱", "月柱", "日柱", "时柱"],
      elementTitle: "五行比例",
      summaryTitle: "日主摘要",
      tipsTitle: "个性化提示",
      elementNames: { wood: "木", fire: "火", earth: "土", metal: "金", water: "水" },
      stemNames: { jia: "甲", yi: "乙", bing: "丙", ding: "丁", wu: "戊", ji: "己", geng: "庚", xin: "辛", ren: "壬", gui: "癸" },
      branchNames: { zi: "子", chou: "丑", yin: "寅", mao: "卯", chen: "辰", si: "巳", wu: "午", wei: "未", shen: "申", you: "酉", xu: "戌", hai: "亥" },
      summaryTemplate: "此盘以{dayMaster}为日主，{strongest}较明显，{quietest}需要更有意识地补足和稳定。",
      tipsTemplates: [
        "{strongest}较旺的阶段，适合推进外部承诺、公开决策和可见成果。",
        "{quietest}需要通过规律、休息和较小的承诺慢慢守住。",
        "免费排盘只是入口。付费报告会展开时机、关系模式和年度重点。",
      ],
    },
    report: {
      title: "付费报告预览",
      body: "前几节可先阅读。购买后会解锁完整 PDF 报告和交付流程。",
      visible: "可预览",
      locked: "已锁定",
      buy: "购买完整报告",
      tocTitle: "报告目录",
      previewBody: "本节包含简明解读、命盘依据和可直接理解的日常语言说明。",
      lockedBody: "本节包含在付费 PDF 中，付款确认后交付。",
      sections: [
        "命盘结构与日主",
        "五行比例",
        "气质与决策风格",
        "事业节奏与工作环境",
        "关系与沟通模式",
        "财富信号与风险习惯",
        "年度流年与月度焦点",
        "决策时机",
        "健康习惯与恢复节奏",
        "需要留意的风险模式",
        "值得发展的优势",
        "实践行动方案",
      ],
      delivery: {
        title: "完整报告交付",
        body: "通过 Gumroad 一次性付款。嵌入式付款窗口关闭后，会自动解锁完整 12 节报告。",
        email: "接收邮箱",
        unlock: "解锁完整报告 $19.99",
        checkoutLoading: "正在打开结账",
        generate: "生成完整报告",
        generating: "正在生成报告",
        success: "完整报告已生成",
        error: "报告生成失败，请稍后再试。",
        checkoutError: "无法打开结账，请稍后再试。",
        emailRequired: "请输入要接收报告链接的邮箱。",
        lockedNotice: "第 4-12 节会在 $19.99 Gumroad 付款后解锁。请保持此页打开，以便自动生成报告。",
        unlocked: "付款已确认。完整报告已解锁，系统会自动开始生成。",
        model: "由 DeepSeek 生成",
      },
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
