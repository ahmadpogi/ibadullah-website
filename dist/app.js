const projectData = [
  {
    id: 'build-masjid', href: '/projects/build-masjid.html', image: '/assets/masjid-hero.webp', number: '01',
    en: {
      title: 'Build a Masjid', eyebrow: 'Places of worship', short: 'Create welcoming masajid with a plan for the community they will serve.',
      intro: 'A masjid is more than a building. Each proposed construction project should pair approved facilities with a clear plan for the people, services, and recurring costs that follow.',
      action: 'Donate to Build a Masjid',
      focus: ['Approved construction and essential facilities', 'Location, budget, contact, and approval status', 'Construction milestones and a separate sustainability plan'],
      fields: ['Location', 'Project description', 'Approved budget', 'Approval status', 'Responsible contact', 'Milestones', 'Sustainability plan']
    },
    ar: {
      title: 'بناء مسجد', eyebrow: 'أماكن العبادة', short: 'إنشاء مساجد ترحب بالمصلين مع خطة لخدمة المجتمع المحيط.',
      intro: 'المسجد أكثر من مبنى. ينبغي أن يجمع كل مشروع بناء مقترح بين المرافق المعتمدة وخطة واضحة للأفراد والخدمات والتكاليف المستمرة بعد الافتتاح.',
      action: 'تبرع لبناء مسجد',
      focus: ['البناء المعتمد والمرافق الأساسية', 'الموقع والميزانية وجهة الاتصال وحالة الموافقة', 'مراحل البناء وخطة استدامة منفصلة'],
      fields: ['الموقع', 'وصف المشروع', 'الميزانية المعتمدة', 'حالة الموافقة', 'جهة الاتصال المسؤولة', 'المراحل', 'خطة الاستدامة']
    }
  },
  {
    id: 'support-masajid', href: '/projects/support-masajid.html', image: '/assets/masjid-support.webp', number: '02',
    en: {
      title: 'Support Existing Masajid', eyebrow: 'Care that continues', short: 'Help established masajid meet essential monthly needs and serve their communities.',
      intro: 'Existing masajid need dependable support for the people and services that keep their doors open. Assistance should follow a documented needs assessment and monthly operating budget.',
      action: 'Support an Existing Masjid',
      focus: ['Imam allowances and workers’ compensation', 'Utilities, repairs, maintenance, and supplies', 'Islamic education and approved community services'],
      fields: ['Needs assessment', 'Monthly operating budget', 'Responsible representative', 'Financial reporting process']
    },
    ar: {
      title: 'دعم المساجد القائمة', eyebrow: 'رعاية مستمرة', short: 'مساعدة المساجد القائمة في تلبية احتياجاتها الشهرية الأساسية وخدمة مجتمعاتها.',
      intro: 'تحتاج المساجد القائمة إلى دعم مستمر للأشخاص والخدمات التي تبقي أبوابها مفتوحة. ويجب أن يستند الدعم إلى تقييم موثق للاحتياجات وميزانية تشغيل شهرية.',
      action: 'ادعم مسجداً قائماً',
      focus: ['مخصصات الأئمة وأجور العاملين', 'المرافق والإصلاحات والصيانة واللوازم', 'التعليم الإسلامي والخدمات المجتمعية المعتمدة'],
      fields: ['تقييم الاحتياجات', 'ميزانية التشغيل الشهرية', 'الممثل المسؤول', 'آلية التقارير المالية']
    }
  },
  {
    id: 'orphan-support', href: '/projects/orphan-support.html', image: '/assets/orphan-support.webp', number: '03',
    en: {
      title: 'Orphan Support', eyebrow: 'Dignity and care', short: 'Support eligible orphans through careful, privacy-conscious welfare programs.',
      intro: 'Support for children should be thoughtful, verified, and protective of their dignity. Public reports should share aggregate outcomes without identifying children or exposing confidential information.',
      action: 'Donate to Orphan Support',
      focus: ['Approved welfare programs', 'Beneficiary verification and careful distribution', 'Privacy, dignity, and child safety'],
      fields: ['Program scope', 'Eligibility process', 'Distribution procedure', 'Aggregate outcomes']
    },
    ar: {
      title: 'رعاية الأيتام', eyebrow: 'الكرامة والرعاية', short: 'دعم الأيتام المستحقين عبر برامج رعاية تحافظ على خصوصيتهم.',
      intro: 'ينبغي أن يكون دعم الأطفال مدروساً وموثقاً ويحمي كرامتهم. وتعرض التقارير العامة النتائج الإجمالية دون كشف هوية الأطفال أو المعلومات السرية.',
      action: 'تبرع لرعاية الأيتام',
      focus: ['برامج رعاية معتمدة', 'التحقق من المستفيدين والتوزيع المنضبط', 'الخصوصية والكرامة وسلامة الأطفال'],
      fields: ['نطاق البرنامج', 'معايير الاستحقاق', 'إجراءات التوزيع', 'النتائج الإجمالية']
    }
  },
  {
    id: 'clean-water', href: '/projects/clean-water.html', image: '/assets/clean-water.webp', number: '04',
    en: {
      title: 'Clean Water for Families', eyebrow: 'A daily essential', short: 'Help financially struggling families access safe and reliable drinking water.',
      intro: 'Water projects should be planned for long-term use: appropriate wells, filtration, distribution, and maintenance matched to the community’s actual needs.',
      action: 'Provide Clean Water',
      focus: ['Safe drinking-water access', 'Approved wells, filtration, and distribution', 'Maintenance and measurable results'],
      fields: ['Location', 'Intended beneficiaries', 'Budget', 'Implementation partner', 'Maintenance plan', 'Measurable results']
    },
    ar: {
      title: 'المياه النظيفة للأسر', eyebrow: 'حاجة يومية أساسية', short: 'مساعدة الأسر المتعسرة في الحصول على مياه شرب آمنة وموثوقة.',
      intro: 'ينبغي تخطيط مشاريع المياه للاستخدام الطويل: آبار أو ترشيح أو توزيع مناسب مع الصيانة وفق احتياجات المجتمع الفعلية.',
      action: 'ساهم في توفير المياه النظيفة',
      focus: ['الوصول إلى مياه شرب آمنة', 'آبار وترشيح وتوزيع معتمد', 'الصيانة وقياس النتائج'],
      fields: ['الموقع', 'المستفيدون المستهدفون', 'الميزانية', 'الشريك المنفذ', 'خطة الصيانة', 'نتائج قابلة للقياس']
    }
  }
];

const copy = {
  en: {
    navProjects: 'Our projects', navApproach: 'Our approach', navTransparency: 'Transparency', navAbout: 'About us', navDonate: 'Give with purpose',
    preview: 'Website preview · Donations are not yet active', menu: 'Open menu', language: 'العربية',
    heroKicker: 'Faith in action. Care that lasts.', heroTitle: 'Build Masajid. Sustain Communities. Transform Lives.',
    heroText: 'Join us in building masajid, supporting existing masajid, caring for orphans, and providing clean water to families in need. Together, we can develop sustainable community support systems that create lasting charitable benefits, by the will of Allah.',
    explore: 'Explore the four projects', howWeWork: 'How we work', purpose: 'One purpose. Four ways to give.',
    purposeText: 'Choose the cause closest to your heart. Each project will have its own designated donation pathway and reporting category.',
    learnMore: 'Explore project', planBadge: 'Our commitment', planTitle: 'A place to pray. A community to support.',
    planText: 'Building a masjid is only the beginning. A separate, coordinated sustainability plan helps participating masajid prepare for the costs and services that continue every month.',
    planLink: 'See the sustainability approach',
    reportingEyebrow: 'Trust through clarity', reportingTitle: 'Know where your support is intended to go.',
    reportingText: 'Our plan calls for distinct records for each cause, verified payment status, and project reports that show received funds, expenses, progress, and remaining needs. We will publish real figures when approved projects and reporting are ready.',
    reportingLink: 'Read our transparency approach',
    step1: 'Choose a project', step1Text: 'Your selection stays attached to the donation record.',
    step2: 'Review your gift', step2Text: 'Confirm the cause, amount, currency, and frequency.',
    step3: 'See the outcome', step3Text: 'Follow verified updates and financial reporting.',
    closingTitle: 'Give with intention. Build lasting benefit.', closingText: 'Explore the four causes and see how Ibadullah plans to turn support into accountable action.',
    imageNote: 'Illustrative imagery; not photographs of Ibadullah projects.',
    footerMission: 'Supporting masajid, strengthening communities, caring for vulnerable families.', footerExplore: 'Explore', footerConnect: 'Information', footerNoPayment: 'This preview does not accept donations or collect donor details.',
    allProjects: 'All projects', projectFocus: 'What this project supports', projectFacts: 'What each proposal should disclose', projectPending: 'Specific approved project details and budgets will appear here when available.',
    projectCtaTitle: 'Support this purpose', projectCtaText: 'Preview a donation path dedicated to this project. Live payments will open only after provider and compliance setup.',
    sustainEyebrow: 'Masjid sustainability', sustainTitle: 'Building Masajid with Sustainable Community Support.',
    sustainLead: 'Construction and ongoing support are separate but coordinated responsibilities. A masjid should be equipped to serve its community long after opening day.',
    sustainBuild: 'Build responsibly', sustainBuildText: 'Plan approved construction, essential facilities, milestones, and a clear budget.',
    sustainRun: 'Support daily operations', sustainRunText: 'Budget for imam allowances, workers, utilities, repairs, supplies, and maintenance.',
    sustainGrow: 'Serve the community', sustainGrowText: 'Support Islamic education, approved services, and appropriate income-generating initiatives where lawful.',
    sustainNote: 'Each participating masjid’s construction and operational needs will be reported separately so supporters can see the purpose of each gift.',
    transparencyEyebrow: 'Accountability by design', transparencyTitle: 'A clear path from donation to impact.',
    transparencyLead: 'The website will report actual activity only after the donation system and project records are operational. We will not publish estimated totals as if they were received funds.',
    recordsTitle: 'Four distinct fund categories', recordsText: 'Every donation belongs to the project the donor selected. Changing a designation requires a documented, authorized process.',
    trackingTitle: 'Verified transaction records', trackingText: 'Records will include the project, amount, currency, status, provider reference, fees, receipt, and any refund or reversal.',
    reportingTitle2: 'Useful public reports', reportingText2: 'For each approved project: funds received, expenses, milestones, and remaining balance. Children’s identities stay private.',
    statusLabel: 'Current reporting status', statusTitle: 'Reports are being prepared', statusText: 'No public financial totals are shown in this preview because live fundraising and project reporting have not begun here.',
    aboutEyebrow: 'About Ibadullah', aboutTitle: 'Service rooted in faith and responsibility.',
    aboutLead: 'Ibadullah is a Philippine SEC-registered nonprofit planning a charitable platform around four focused projects: new masajid, existing masajid, orphan support, and clean water for families.',
    aboutBody: 'The mission includes both physical infrastructure and the people who rely on it. Each program is intended to have a defined purpose, accountable stewardship, and reporting appropriate to the people it serves.',
    aboutDetailTitle: 'Organization details', aboutDetailText: 'Registration details, leadership contacts, official address, and approved project documents will be added after review.',
    donateEyebrow: 'Donation journey preview', donateTitle: 'Choose a cause with confidence.',
    donateLead: 'This is a preview of how project-specific giving will work. No payment can be made here, and no donor details are collected.',
    chooseProject: 'Project', chooseAmount: 'Amount', currency: 'Currency', frequency: 'Frequency', once: 'One-time', monthly: 'Monthly (planned)',
    chooseRoute: 'Payment route', localRoute: 'Philippine checkout (planned)', globalRoute: 'International giving (planned)',
    localMethods: 'GCash · QR Ph · cards', globalMethods: 'International cards · provider under review',
    amountHelp: 'Enter a sample amount to review the intended donation details.', review: 'Review sample gift', sampleReview: 'Sample review', confirmProject: 'Your selected project', notLive: 'Payments are not yet active',
    notLiveText: 'A provider, approved project records, and compliance information must be connected before donations can be accepted. This preview does not save your selection.',
    edit: 'Edit selection', backProjects: 'Explore projects', amountError: 'Enter an amount greater than zero.',
    contact: 'Contact', legal: 'Policies under review', contactTitle: 'Start a conversation.', contactLead: 'Questions about Ibadullah or its projects? Reach our team by email.', contactEmailTitle: 'Write to us', contactEmailText: 'For general inquiries, project questions, and partnership conversations:', contactDetailsTitle: 'Other contact details', contactDetailsText: 'Our public phone number and office address will be added after organizational review.'
  },
  ar: {
    navProjects: 'مشاريعنا', navApproach: 'نهجنا', navTransparency: 'الشفافية', navAbout: 'من نحن', navDonate: 'تبرع لهدف واضح',
    preview: 'نسخة أولية للموقع · التبرعات غير مفعلة بعد', menu: 'افتح القائمة', language: 'English',
    heroKicker: 'إيمان يتحول إلى عمل وخير يدوم', heroTitle: 'نبني المساجد. ندعم المجتمعات. نغيّر الحياة.',
    heroText: 'شاركنا في بناء المساجد، ودعم المساجد القائمة، ورعاية الأيتام، وتوفير المياه النظيفة للأسر المحتاجة. معاً نستطيع تطوير نظم دعم مجتمعية مستدامة تحقق نفعاً خيرياً دائماً بإذن الله.',
    explore: 'استكشف المشاريع الأربعة', howWeWork: 'كيف نعمل', purpose: 'غاية واحدة وأربعة مجالات للعطاء.',
    purposeText: 'اختر المجال الأقرب إلى قلبك. سيكون لكل مشروع مسار تبرع وفئة تقارير مستقلة.',
    learnMore: 'استكشف المشروع', planBadge: 'التزامنا', planTitle: 'مكان للصلاة ومجتمع يستحق الدعم.',
    planText: 'بناء المسجد هو البداية فقط. تساعد خطة استدامة منفصلة ومنسقة المساجد المشاركة على الاستعداد للتكاليف والخدمات المستمرة كل شهر.',
    planLink: 'اطلع على نهج الاستدامة',
    reportingEyebrow: 'الثقة بالوضوح', reportingTitle: 'اعرف أين يُقصد أن يذهب دعمك.',
    reportingText: 'تتضمن خطتنا سجلات مستقلة لكل مجال، والتحقق من حالة الدفع، وتقارير تعرض الأموال المستلمة والمصروفات والتقدم والاحتياجات المتبقية. سننشر الأرقام الفعلية عندما تصبح المشاريع والتقارير المعتمدة جاهزة.',
    reportingLink: 'اقرأ نهج الشفافية',
    step1: 'اختر مشروعاً', step1Text: 'يبقى اختيارك مرتبطاً بسجل التبرع.',
    step2: 'راجع عطيتك', step2Text: 'تأكد من المجال والمبلغ والعملة وتكرار التبرع.',
    step3: 'تابع الأثر', step3Text: 'اطلع على التحديثات والتقارير المالية الموثقة.',
    closingTitle: 'تبرع بنية واضحة واصنع نفعاً يدوم.', closingText: 'استكشف المجالات الأربعة وتعرّف كيف تخطط عباد الله لتحويل الدعم إلى عمل مسؤول.',
    imageNote: 'صور توضيحية؛ لا تُظهر مشاريع عباد الله الفعلية.',
    footerMission: 'دعم المساجد وتقوية المجتمعات ورعاية الأسر المحتاجة.', footerExplore: 'استكشف', footerConnect: 'معلومات', footerNoPayment: 'هذه النسخة لا تقبل التبرعات ولا تجمع بيانات المتبرعين.',
    allProjects: 'جميع المشاريع', projectFocus: 'ما الذي يدعمه هذا المشروع', projectFacts: 'ما ينبغي الإفصاح عنه لكل مقترح', projectPending: 'ستظهر هنا تفاصيل المشاريع والميزانيات المعتمدة عند توفرها.',
    projectCtaTitle: 'ادعم هذا الهدف', projectCtaText: 'عاين مسار تبرع مخصصاً لهذا المشروع. لن تبدأ المدفوعات الفعلية إلا بعد تجهيز مزود الدفع والمتطلبات النظامية.',
    sustainEyebrow: 'استدامة المساجد', sustainTitle: 'بناء المساجد مع دعم مجتمعي مستدام.',
    sustainLead: 'البناء والدعم المستمر مسؤوليتان منفصلتان ومترابطتان. ينبغي تجهيز المسجد لخدمة مجتمعه بعد يوم الافتتاح بوقت طويل.',
    sustainBuild: 'بناء مسؤول', sustainBuildText: 'تخطيط البناء المعتمد والمرافق الأساسية والمراحل والميزانية الواضحة.',
    sustainRun: 'دعم التشغيل اليومي', sustainRunText: 'تخصيص ميزانية للأئمة والعاملين والمرافق والإصلاحات واللوازم والصيانة.',
    sustainGrow: 'خدمة المجتمع', sustainGrowText: 'دعم التعليم الإسلامي والخدمات المعتمدة ومبادرات الدخل المناسبة حيث يسمح النظام.',
    sustainNote: 'ستعرض احتياجات البناء والتشغيل لكل مسجد على حدة حتى يعرف الداعمون غرض كل تبرع.',
    transparencyEyebrow: 'المساءلة من البداية', transparencyTitle: 'مسار واضح من التبرع إلى الأثر.',
    transparencyLead: 'سينشر الموقع النشاط الفعلي فقط بعد تشغيل نظام التبرعات وسجلات المشاريع. ولن تُعرض التقديرات وكأنها أموال مستلمة.',
    recordsTitle: 'أربع فئات مالية مستقلة', recordsText: 'ينتمي كل تبرع إلى المشروع الذي اختاره المتبرع. ويتطلب تغيير التخصيص إجراءً موثقاً ومصرحاً به.',
    trackingTitle: 'سجلات معاملات موثقة', trackingText: 'تشمل السجلات المشروع والمبلغ والعملة والحالة ومرجع مزود الدفع والرسوم والإيصال وأي استرداد.',
    reportingTitle2: 'تقارير عامة مفيدة', reportingText2: 'لكل مشروع معتمد: الأموال المستلمة والمصروفات والمراحل والرصيد المتبقي، مع حماية هوية الأطفال.',
    statusLabel: 'حالة التقارير حالياً', statusTitle: 'التقارير قيد الإعداد', statusText: 'لا تعرض هذه النسخة أي إجماليات مالية عامة لأن جمع التبرعات والتقارير الفعلية لم يبدآ هنا بعد.',
    aboutEyebrow: 'عن عباد الله', aboutTitle: 'خدمة تنطلق من الإيمان والمسؤولية.',
    aboutLead: 'عباد الله منظمة غير ربحية مسجلة لدى هيئة الأوراق المالية والبورصات الفلبينية، وتخطط لمنصة خيرية تركز على أربعة مشاريع: بناء المساجد، ودعم المساجد القائمة، ورعاية الأيتام، وتوفير المياه النظيفة للأسر.',
    aboutBody: 'تشمل الرسالة المرافق والأشخاص الذين يعتمدون عليها. ويهدف كل برنامج إلى غرض محدد وإدارة مسؤولة وتقارير مناسبة لمن يخدمهم.',
    aboutDetailTitle: 'بيانات المنظمة', aboutDetailText: 'ستضاف بيانات التسجيل وجهات الاتصال القيادية والعنوان الرسمي ووثائق المشاريع المعتمدة بعد المراجعة.',
    donateEyebrow: 'معاينة مسار التبرع', donateTitle: 'اختر مجالاً بثقة.',
    donateLead: 'هذه معاينة لطريقة التبرع المخصص لكل مشروع. لا يمكن الدفع هنا ولا تُجمع بيانات المتبرعين.',
    chooseProject: 'المشروع', chooseAmount: 'المبلغ', currency: 'العملة', frequency: 'التكرار', once: 'مرة واحدة', monthly: 'شهرياً (مخطط له)',
    chooseRoute: 'وسيلة الدفع', localRoute: 'الدفع في الفلبين (مخطط له)', globalRoute: 'التبرع الدولي (مخطط له)',
    localMethods: 'جي كاش · QR Ph · بطاقات', globalMethods: 'بطاقات دولية · مزود الدفع قيد المراجعة',
    amountHelp: 'أدخل مبلغاً تجريبياً لمراجعة تفاصيل التبرع المقصودة.', review: 'راجع التبرع التجريبي', sampleReview: 'مراجعة تجريبية', confirmProject: 'المشروع المختار', notLive: 'المدفوعات غير مفعلة بعد',
    notLiveText: 'يجب ربط مزود دفع وسجلات مشاريع معتمدة ومعلومات الامتثال قبل قبول التبرعات. هذه المعاينة لا تحفظ اختيارك.',
    edit: 'تعديل الاختيار', backProjects: 'استكشف المشاريع', amountError: 'أدخل مبلغاً أكبر من الصفر.',
    contact: 'اتصل بنا', legal: 'السياسات قيد المراجعة', contactTitle: 'ابدأ الحوار معنا.', contactLead: 'هل لديك سؤال عن عباد الله أو مشاريعها؟ تواصل مع فريقنا عبر البريد الإلكتروني.', contactEmailTitle: 'راسلنا', contactEmailText: 'للاستفسارات العامة والأسئلة عن المشاريع وفرص التعاون:', contactDetailsTitle: 'بيانات تواصل أخرى', contactDetailsText: 'سنضيف رقم الهاتف العام وعنوان المكتب بعد مراجعة المنظمة.'
  }
};

const page = document.body.dataset.page || 'home';
let lang = localStorage.getItem('ibadullah-language') === 'ar' ? 'ar' : 'en';
let paymentsActive = false;
const app = document.getElementById('app');
const t = () => copy[lang];
const P = id => projectData.find(project => project.id === id);
const project = id => P(id)[lang];
const arrow = '<span aria-hidden="true">↗</span>';

function brand() {
  return `<a class="brand" href="/" aria-label="${lang==='ar'?'عباد الله - الرئيسية':'Ibadullah home'}"><svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3 44 14.5v19L24 45 4 33.5v-19L24 3Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M13 34V22c0-6.4 4.9-11 11-14 6.1 3 11 7.6 11 14v12H13Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M19 34V23a5 5 0 0 1 10 0v11" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 34h34" stroke="currentColor" stroke-width="1.6"/></svg><span>IBADULLAH<small>.ORG</small></span></a>`;
}

function header() {
  const c = t();
  const links = [
    ['/#projects', c.navProjects], ['/sustainability.html', c.navApproach], ['/transparency.html', c.navTransparency], ['/about.html', c.navAbout]
  ];
  return `<div class="preview-bar">${c.preview}</div><header class="site-header"><div class="container header-inner">${brand()}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="${c.menu}"><span></span><span></span><span></span></button><nav id="primary-nav" class="primary-nav" aria-label="${lang==='ar'?'التنقل الرئيسي':'Primary'}"><div class="nav-links">${links.map(([href,label])=>`<a href="${href}">${label}</a>`).join('')}</div><div class="nav-actions"><button class="language-switch" type="button" aria-label="${lang==='ar'?'تغيير اللغة':'Switch language'}">${c.language}</button><a class="button button-gold button-small" href="/donate.html">${c.navDonate} ${arrow}</a></div></nav></div></header>`;
}

function footer() {
  const c = t();
  return `<footer class="site-footer"><div class="container footer-main"><div class="footer-brand">${brand()}<p>${c.footerMission}</p></div><div><h3>${c.footerExplore}</h3><a href="/#projects">${c.navProjects}</a><a href="/sustainability.html">${c.navApproach}</a><a href="/transparency.html">${c.navTransparency}</a></div><div><h3>${c.footerConnect}</h3><a href="/about.html">${c.navAbout}</a><a href="/contact.html">${c.contact}</a><span>${c.legal}</span></div></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Ibadullah.org</span><span>${c.footerNoPayment}</span></div></footer>`;
}

function projectCard(item) {
  const d = item[lang];
  return `<article class="project-card"><a class="card-image" href="${item.href}"><img src="${item.image}" alt="" loading="lazy"><span class="card-number">${item.number} / 04</span></a><div class="card-content"><span class="eyebrow eyebrow-muted">${d.eyebrow}</span><h3>${d.title}</h3><p>${d.short}</p><a class="text-link" href="${item.href}">${t().learnMore} ${arrow}</a></div></article>`;
}

function home() {
  const c = t();
  return `<main><section class="hero"><div class="hero-image" role="img" aria-label="Illustrative mosque at sunset"></div><div class="hero-shade"></div><div class="container hero-content"><div class="hero-copy"><div class="hero-kicker"><span class="kicker-line"></span>${c.heroKicker}</div><h1>${c.heroTitle}</h1><p>${c.heroText}</p><div class="hero-actions"><a class="button button-gold" href="#projects">${c.explore} ${arrow}</a><a class="button button-outline-light" href="/sustainability.html">${c.howWeWork}</a></div></div><div class="hero-index"><span>01 — 04</span><span>${c.imageNote}</span></div></div></section>
  <section class="intro-band"><div class="container intro-band-inner"><div class="arabesque" aria-hidden="true">۞</div><p>${c.purpose}</p><span>${c.purposeText}</span></div></section>
  <section id="projects" class="section projects-section"><div class="container"><div class="section-heading"><div><span class="eyebrow">${c.navProjects}</span><h2>${c.purpose}</h2></div><p>${c.purposeText}</p></div><div class="project-grid">${projectData.map(projectCard).join('')}</div><p class="image-caption">${c.imageNote}</p></div></section>
  <section class="sustain-feature"><div class="container sustain-grid"><div class="sustain-photo"><img src="/assets/masjid-support.webp" alt="" loading="lazy"><span>${c.imageNote}</span></div><div class="sustain-content"><span class="eyebrow eyebrow-gold">${c.planBadge}</span><h2>${c.planTitle}</h2><p>${c.planText}</p><a class="button button-outline-light" href="/sustainability.html">${c.planLink} ${arrow}</a></div></div></section>
  <section class="section clarity-section"><div class="container clarity-grid"><div><span class="eyebrow">${c.reportingEyebrow}</span><h2>${c.reportingTitle}</h2><p class="section-lead">${c.reportingText}</p><a class="text-link" href="/transparency.html">${c.reportingLink} ${arrow}</a></div><div class="steps">${[[c.step1,c.step1Text],[c.step2,c.step2Text],[c.step3,c.step3Text]].map(([title,body],i)=>`<div class="step"><b>0${i+1}</b><div><h3>${title}</h3><p>${body}</p></div></div>`).join('')}</div></div></section>
  ${closing()}</main>`;
}

function closing() {
  const c = t();
  return `<section class="closing-section"><div class="container closing-inner"><div><span class="eyebrow eyebrow-gold">Ibadullah.org</span><h2>${c.closingTitle}</h2><p>${c.closingText}</p></div><a class="button button-gold" href="/donate.html">${c.navDonate} ${arrow}</a></div></section>`;
}

function projectPage(item) {
  const c = t(), d = item[lang];
  return `<main><section class="project-hero"><div class="project-hero-image" style="background-image:url('${item.image}')"></div><div class="project-hero-shade"></div><div class="container project-hero-inner"><a class="back-link" href="/#projects">← ${c.allProjects}</a><span class="eyebrow eyebrow-gold">${item.number} / 04 · ${d.eyebrow}</span><h1>${d.title}</h1><p>${d.short}</p></div></section><section class="section project-body"><div class="container project-layout"><div class="project-story"><span class="eyebrow">${d.eyebrow}</span><h2>${d.title}</h2><p class="large-paragraph">${d.intro}</p><h3>${c.projectFocus}</h3><ul class="check-list">${d.focus.map(x=>`<li>${x}</li>`).join('')}</ul></div><aside class="project-aside"><div class="aside-top"><span>${item.number} / 04</span><span>${d.eyebrow}</span></div><h3>${c.projectFacts}</h3><ul>${d.fields.map(x=>`<li>${x}</li>`).join('')}</ul><p>${c.projectPending}</p></aside></div></section><section class="project-donate"><div class="container project-donate-inner"><div><span class="eyebrow eyebrow-gold">${c.projectCtaTitle}</span><h2>${d.title}</h2><p>${c.projectCtaText}</p></div><a class="button button-gold" href="/donate.html?project=${item.id}">${d.action} ${arrow}</a></div></section><p class="container image-caption image-caption-bottom">${c.imageNote}</p></main>`;
}

function simpleHero(eyebrow, title, lead) {
  return `<section class="page-hero"><div class="container"><span class="eyebrow eyebrow-gold">${eyebrow}</span><h1>${title}</h1><p>${lead}</p></div></section>`;
}

function sustainability() {
  const c=t();
  return `<main>${simpleHero(c.sustainEyebrow,c.sustainTitle,c.sustainLead)}<section class="section"><div class="container three-column">${[[c.sustainBuild,c.sustainBuildText],[c.sustainRun,c.sustainRunText],[c.sustainGrow,c.sustainGrowText]].map(([title,text],i)=>`<article class="principle"><b>0${i+1}</b><h2>${title}</h2><p>${text}</p></article>`).join('')}</div><div class="container statement-panel"><div class="statement-icon">۞</div><p>${c.sustainNote}</p></div></section>${closing()}</main>`;
}

function transparency() {
  const c=t();
  return `<main>${simpleHero(c.transparencyEyebrow,c.transparencyTitle,c.transparencyLead)}<section class="section"><div class="container three-column">${[[c.recordsTitle,c.recordsText],[c.trackingTitle,c.trackingText],[c.reportingTitle2,c.reportingText2]].map(([title,text],i)=>`<article class="principle"><b>0${i+1}</b><h2>${title}</h2><p>${text}</p></article>`).join('')}</div><div class="container report-panel"><div><span class="eyebrow">${c.statusLabel}</span><h2>${c.statusTitle}</h2><p>${c.statusText}</p></div><div class="report-list">${projectData.map(item=>`<div><span>${item[lang].title}</span><span>—</span></div>`).join('')}</div></div></section>${closing()}</main>`;
}

function about() {
  const c=t();
  return `<main>${simpleHero(c.aboutEyebrow,c.aboutTitle,c.aboutLead)}<section class="section"><div class="container about-grid"><div><span class="eyebrow">${c.navAbout}</span><h2>${c.purpose}</h2><p class="large-paragraph">${c.aboutBody}</p><a class="text-link" href="/#projects">${c.explore} ${arrow}</a></div><div class="about-note"><h3>${c.aboutDetailTitle}</h3><p>${c.aboutDetailText}</p></div></div></section>${closing()}</main>`;
}

function contact() {
  const c=t();
  return `<main>${simpleHero(c.contact,c.contactTitle,c.contactLead)}<section class="section"><div class="container about-grid"><div><span class="eyebrow">${c.contact}</span><h2>${c.contactEmailTitle}</h2><p class="large-paragraph">${c.contactEmailText}</p><a class="contact-email" href="mailto:ibadullah.org@yahoo.com">ibadullah.org@yahoo.com <span aria-hidden="true">↗</span></a></div><aside class="about-note"><h3>${c.contactDetailsTitle}</h3><p>${c.contactDetailsText}</p></aside></div></section></main>`;
}

function donation() {
  const c=t();
  const selected = new URLSearchParams(location.search).get('project');
  const id = P(selected) ? selected : projectData[0].id;
  return `<main>${simpleHero(c.donateEyebrow,c.donateTitle,c.donateLead)}<section class="section donation-section"><div class="container donation-layout"><div class="donation-card"><div class="donation-alert"><span class="alert-dot"></span>${c.notLive}</div><form id="donation-preview"><div class="form-field"><label for="project">${c.chooseProject}</label><select id="project" name="project">${projectData.map(item=>`<option value="${item.id}" ${item.id===id?'selected':''}>${item[lang].title}</option>`).join('')}</select></div><div class="form-field"><label for="amount">${c.chooseAmount}</label><div class="amount-control"><span id="amount-symbol">₱</span><input id="amount" name="amount" type="number" min="1" step="0.01" value="1000" inputmode="decimal" required></div><small>${c.amountHelp}</small></div><div class="form-two"><div class="form-field"><label for="currency">${c.currency}</label><select id="currency" name="currency"><option value="PHP">PHP</option><option value="USD">USD</option><option value="SAR">SAR</option></select></div><div class="form-field"><label for="frequency">${c.frequency}</label><select id="frequency" disabled><option>${c.once}</option><option>${c.monthly}</option></select></div></div><fieldset class="route-field"><legend>${c.chooseRoute}</legend><label class="route-option"><input type="radio" name="route" value="local" checked><div><strong>${c.localRoute}</strong><small>${c.localMethods}</small></div></label><label class="route-option"><input type="radio" name="route" value="global"><div><strong>${c.globalRoute}</strong><small>${c.globalMethods}</small></div></label></fieldset><button class="button button-dark button-full" type="submit">${c.review} ${arrow}</button></form><div id="sample-review" class="sample-review" hidden aria-live="polite"><span class="eyebrow">${c.sampleReview}</span><div class="review-row"><span>${c.confirmProject}</span><strong id="review-project"></strong></div><div class="review-row"><span>${c.chooseAmount}</span><strong id="review-amount"></strong></div><div class="review-row"><span>${c.chooseRoute}</span><strong id="review-route"></strong></div><div class="review-row"><span>${c.frequency}</span><strong>${c.once}</strong></div><p>${c.notLiveText}</p><button class="button button-dark button-full" id="edit-preview" type="button">${c.edit}</button></div></div><aside class="donation-aside"><span class="eyebrow">${c.notLive}</span><h2>${c.projectCtaTitle}</h2><p>${c.notLiveText}</p><a class="text-link" href="/#projects">${c.backProjects} ${arrow}</a></aside></div></section></main>`;
}

function syncDonationProject() {
  const select=document.getElementById('project');
  const aside=document.querySelector('.donation-aside');
  const item=P(select?.value);
  if(!aside||!item)return;
  let visual=aside.querySelector('.donation-project-visual');
  if(!visual){
    visual=document.createElement('div');
    visual.className='donation-project-visual';
    visual.innerHTML='<img alt=""><span></span>';
    aside.prepend(visual);
  }
  visual.querySelector('img').src=item.image;
  visual.querySelector('span').textContent=t().imageNote;
  aside.querySelector('h2').textContent=item[lang].title;
}

function render() {
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  const pageName=P(page)?.[lang].title || ({home:lang==='ar'?'الرئيسية':'Home',sustainability:t().sustainEyebrow,transparency:t().navTransparency,about:t().navAbout,contact:t().contact,donate:t().donateEyebrow})[page];
  document.title=`${pageName} — Ibadullah.org`;
  const content = page==='home'?home():P(page)?projectPage(P(page)):page==='sustainability'?sustainability():page==='transparency'?transparency():page==='about'?about():page==='contact'?contact():donation();
  app.innerHTML=header()+content+footer();
  if(paymentsActive)document.querySelector('.footer-main > div:last-child span').outerHTML=`<a href="/privacy.html">${lang==='ar'?'الخصوصية':'Privacy'}</a><a href="/donation-policy.html">${lang==='ar'?'سياسة التبرع':'Donation policy'}</a>`;
  document.querySelector('.language-switch').addEventListener('click',()=>{lang=lang==='en'?'ar':'en';localStorage.setItem('ibadullah-language',lang);render();});
  const menu=document.querySelector('.menu-toggle');
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('.primary-nav').classList.toggle('open',open);});
  if(page==='donate') {
    syncDonationProject();
    document.getElementById('project').addEventListener('change',syncDonationProject);
    const form=document.getElementById('donation-preview');
    const review=document.getElementById('sample-review');
    form.addEventListener('submit',event=>{
      event.preventDefault();
      const amount=Number(document.getElementById('amount').value);
      if(!Number.isFinite(amount)||amount<=0){document.getElementById('amount').setCustomValidity(t().amountError);form.reportValidity();return;}
      document.getElementById('amount').setCustomValidity('');
      const picked=P(document.getElementById('project').value);
      document.getElementById('review-project').textContent=picked[lang].title;
      const currency=document.getElementById('currency').value;
      document.getElementById('review-amount').textContent=new Intl.NumberFormat(lang==='ar'?'ar-PH':'en-PH',{style:'currency',currency}).format(amount);
      document.getElementById('review-route').textContent=document.querySelector('input[name="route"]:checked').value==='global'?t().globalRoute:t().localRoute;
      form.hidden=true;review.hidden=false;review.scrollIntoView({behavior:'smooth',block:'center'});
    });
    document.getElementById('edit-preview').addEventListener('click',()=>{review.hidden=true;form.hidden=false;document.getElementById('project').focus();});
    document.getElementById('amount').addEventListener('input',event=>event.target.setCustomValidity(''));
    document.getElementById('currency').addEventListener('change',event=>{
      document.getElementById('amount-symbol').textContent={PHP:'₱',USD:'$',SAR:'﷼'}[event.target.value];
      const localRoute=document.querySelector('input[name="route"][value="local"]');
      localRoute.disabled=event.target.value!=='PHP';
      if(localRoute.disabled)document.querySelector('input[name="route"][value="global"]').checked=true;
    });
  }
}

render();
window.addEventListener('ibadullah:donation-project-ready',syncDonationProject);
fetch('/api/config').then(response=>response.json()).then(config=>{
  if(config.donationsEnabled!==true)return;
  paymentsActive=true;
  Object.assign(copy.en,{
    preview:'Secure giving to approved projects',
    footerNoPayment:'Donations are confirmed after payment verification.',
    projectCtaText:'Give to this approved project through secure checkout.',
    donateEyebrow:'Secure giving',
    donateLead:'Choose a project and complete your gift through PayMongo’s hosted checkout. Payments are charged in Philippine pesos.',
    notLive:'Secure checkout',
    notLiveText:'Your payment is confirmed after our system receives a verified PayMongo notification.',
    legal:'Privacy and donation policies'
  });
  Object.assign(copy.ar,{
    preview:'تبرعات آمنة للمشاريع المعتمدة',
    footerNoPayment:'تُؤكد التبرعات بعد التحقق من الدفع.',
    projectCtaText:'ساهم في هذا المشروع المعتمد عبر صفحة دفع آمنة.',
    donateEyebrow:'تبرع آمن',
    donateLead:'اختر المشروع وأكمل تبرعك عبر صفحة PayMongo. تُخصم المبالغ بالبيزو الفلبيني.',
    notLive:'دفع آمن',
    notLiveText:'يُؤكد التبرع بعد أن نتلقى إشعار دفع موثقاً من PayMongo.',
    legal:'سياسة الخصوصية والتبرع'
  });
  render();
}).catch(()=>{});
