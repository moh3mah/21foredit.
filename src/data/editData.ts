export interface EditStyle {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  characteristics: string[];
  difficulty: 'سهل' | 'متوسط' | 'صعب' | 'أسطوري';
  popularIn: string;
  software: string[];
  bannerGradient: string;
  tag: string;
}

export interface EditSkill {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  importance: number; // 1-100
  tips: string[];
  softwareHighlight: string;
  tag: string;
}

export interface EditCategory {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  vibe: string;
  iconName: string;
  recommendedStyles: string[];
}

export interface TutorialItem {
  id: string;
  title: string;
  software: string;
  technique: string;
  description: string;
  tutorialVideoUrl: string;
  resultVideoUrl: string;
  duration?: string;
  fps: string;
  resolution: string;
  author: string;
}

export interface PresetItem {
  id: string;
  title: string;
  type: 'shake' | 'effect' | 'cc' | 'course';
  subType?: string;
  description: string;
  gifUrl: string;
  xmlUrl: string;
  downloadsCount: number;
  tags: string[];
  author: string;
  fileSize?: string;
}

export interface VideoComment {
  id: string;
  videoId: string;
  authorEmail: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
  isOwner?: boolean;
  isAdmin?: boolean;
}

export interface AppNotification {
  id: string;
  type: 'report' | 'upload' | 'comment' | 'follow' | 'ban';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  reportedUserEmail?: string;
  reportedVideoId?: string;
  actionTaken?: string;
}

export interface UserReport {
  id: string;
  videoId: string;
  videoTitle: string;
  reportedUserEmail: string;
  reportedUserName: string;
  reporterEmail: string;
  reason: string;
  createdAt: string;
  status: 'pending' | 'resolved' | 'banned';
}

export interface UserProfile {
  email: string;
  username: string;
  avatar: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  totalLikesReceived: number;
  isBanned?: boolean;
  joinedAt?: string;
}

export interface UserVideo {
  id: string;
  title: string;
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description: string;
  resolution: '1080p' | '2K' | '4K';
  fps: '30' | '60' | '120';
  software: string;
  style: string;
  category: string;
  likes: number;
  views: number;
  comments?: VideoComment[];
  xmlDownloadUrl?: string;
  createdAt: string;
  isOwnerPost?: boolean;
}

export interface AdminUser {
  email: string;
  username: string;
  role: 'owner' | 'admin';
  addedAt: string;
}

export const OWNER_EMAIL = 'ahmdzwahrt273@gmail.com';
export const DISCORD_URL = 'https://discord.gg/x5dtnjNGS';
export const MAIN_BANNER_IMAGE = 'https://i.top4top.io/p_391173gui0.jpg';

export const INITIAL_STYLES: EditStyle[] = [
  {
    id: 'minimal-motion',
    name: 'Minimal Edit - Motion Graphics Edit',
    nameAr: 'المينيمال والموشن جرافيك',
    description: 'معروفين دايماً يكونون بالإعلانات والمتاجر والبراندات، يتميزون بالبساطة والتركيز على العناصر والتصميم النظيف بدون فوضى بصرية.',
    characteristics: ['تصميم نظيف', 'استخدام ذكي للمساحات', 'حركات ناعمة للأشكال والخطوط', 'مخصص للمتاجر والإعلانات الفاخرة'],
    difficulty: 'متوسط',
    popularIn: 'الإعلانات التجارية والمتاجر الرقمية',
    software: ['After Effects', 'Alight Motion', 'Premiere Pro'],
    bannerGradient: 'from-zinc-800 to-zinc-950',
    tag: 'Commercial & Clean'
  },
  {
    id: 'transition-zoom',
    name: 'Transition Edit or Zoom In & Out',
    nameAr: 'الانتقالات والزووم السريع',
    description: 'معروف بالتيك توك دايماً، تلقى إيدت بالستايل ذا للأفلام أو المسلسلات والأنمي مع زوومات متناسقة وديناميكية تسحب عين المشاهد.',
    characteristics: ['زووم إن وزووم أوت متقن', 'تزامن عالي مع اللقطات', 'انتقالات ثلاثية الأبعاد خفيفة', 'حركة سينمائية سريعة'],
    difficulty: 'متوسط',
    popularIn: 'تيك توك للأفلام والمسلسلات والأنمي',
    software: ['CapCut', 'Alight Motion', 'After Effects'],
    bannerGradient: 'from-neutral-800 to-black',
    tag: 'TikTok Viral'
  },
  {
    id: 'glitch-edit',
    name: 'Glitch Edit',
    nameAr: 'ستايل القلتش والتشويش',
    description: 'ستايل القلتش بفريمات نازلة وتشويش عالي ومؤثرات تقطيع إلكترونية مستوحاة من أشرطة الـ VHS والكاميرات القديمة والسايبر بانك.',
    characteristics: ['فريمات منخفضة محسوبة (Drop Frames)', 'تشويش لوني RGB Split', 'اهتزاز شاشات قديمة VHS', 'طابع إلكتروني غامض'],
    difficulty: 'متوسط',
    popularIn: 'الألعاب والأنمي الغامض ومقاطع الرعب',
    software: ['After Effects', 'Alight Motion'],
    bannerGradient: 'from-zinc-900 to-black',
    tag: 'Cyber Glitch'
  },
  {
    id: 'velocity-edit',
    name: 'Velocity Edit',
    nameAr: 'ستايل الفيلوستي (السرعة والتبطئة)',
    description: 'ستايل عبارة عن سرعة الكليب وتوقيت التبطيء والتسريع، ويكون بأكثر الأوقات ستايل جانبي ومحوري في رفع حماس التصميم.',
    characteristics: ['تلاعب دقيق بالـ Speed Curve', 'فلو سلس يتماشى مع نبرات البيت', 'فريمات عالية 60-120fps لمنع التقطيع', 'تزامن حركي فوري'],
    difficulty: 'صعب',
    popularIn: 'مقاطع كرة القدم والسيارات والأنمي الحماسي',
    software: ['CapCut', 'Alight Motion', 'Velocity Plugins', 'After Effects'],
    bannerGradient: 'from-stone-900 to-black',
    tag: 'Flow & Speed'
  },
  {
    id: 'manga-style',
    name: 'Manga Style Edit',
    nameAr: 'ستايل المانجا المعقد',
    description: 'ستايل المانقا يكون معقد وصعب ومايصير إلا للمانقا فقط، تحويل الصفحات الثابتة إلى لوحات حية بمؤثرات حركة وتحريك إطارات متقدمة.',
    characteristics: ['تحريك صفحات المانجا الثنائية', 'إعادة رسم وفصل الطبقات (Layer Separation)', 'استخدام مؤثرات 3D Camera', 'تأثيرات حبر وتظليل متطورة'],
    difficulty: 'أسطوري',
    popularIn: 'مجتمع المانجا والمانهوا في تيك توك واليوتيوب',
    software: ['After Effects', 'Photoshop', 'Alight Motion'],
    bannerGradient: 'from-zinc-900 to-neutral-950',
    tag: 'Ultra Elite'
  },
  {
    id: 'smooth-style',
    name: 'Smooth Style Edit',
    nameAr: 'الستايل السموذ فائق النعومة',
    description: 'ستايل كامل يكون سموذ بشكل استثنائي، حركات ناعمة ومنحنيات غاية في الدقة، ستايل لا يتقنه أي مصمم بسبب اعتماده على الإحساس بالحركة.',
    characteristics: ['منحنيات ناعمة تامة Smooth Curves', 'تلاشي تدريجي للحركة', 'توزيع متوازن للبلور', 'مظهر مريح وفخم للعين'],
    difficulty: 'صعب',
    popularIn: 'الأفلام الفخمة والأنمي والبورتريه',
    software: ['Alight Motion', 'After Effects'],
    bannerGradient: 'from-zinc-900 to-black',
    tag: 'Pure Elegance'
  },
  {
    id: 'shek-style',
    name: 'Shek Style Edit',
    nameAr: 'ستايل الشيك (الاهتزاز)',
    description: 'ما يحتاج توضيح، ستايل مبني على الشيكات والاهتزازات المتنوعة، سواء شيك هارد عنيف أو شيك سموذ هادئ يرتجف مع كل إيقاع.',
    characteristics: ['اعتماد كلي على ترددات الـ Shake', 'تزامن اهتزاز الزوايا مع الـ Bass', 'تنوع بين الهارد والسموذ', 'توليد طاقة وحيوية في اللقطة'],
    difficulty: 'متوسط',
    popularIn: 'مونتاج القتالات والفايتات والسيارات',
    software: ['Alight Motion', 'After Effects'],
    bannerGradient: 'from-neutral-900 to-black',
    tag: 'Impact Shakes'
  },
  {
    id: 'blur-style',
    name: 'Blur Style Edit',
    nameAr: 'ستايل البلور (الضبابية الحركية)',
    description: 'نفس الكلام، ستايل مبني على البلور، استخدام احترافي للـ Motion Blur و Directional Blur والبلور الموجه لصنع عمق ساحر بين المشاهد.',
    characteristics: ['بلور اتجاهي وحركي متناغم', 'عزل بصري للأهداف الرئيسية', 'تنعيم الانتقالات الحادة', 'إحساس بالسرعة الفائقة والعمق'],
    difficulty: 'متوسط',
    popularIn: 'الإيدت الجمالي والأفلام والرياضة',
    software: ['Alight Motion', 'After Effects', 'CapCut'],
    bannerGradient: 'from-zinc-950 to-black',
    tag: 'Motion Blur'
  },
  {
    id: 'hard-style',
    name: 'Hard Style Edit',
    nameAr: 'الستايل الهارد السريع والعنيف',
    description: 'ستايل عكس ستايل السموذ بشكل كامل، يكون بأكثر الأوقات سريع وحاد جداً بصدمات بصرية قوية وتأثيرات ضربات البيت المفاجئة.',
    characteristics: ['انتقالات حادة وفورية', 'فلاشات بيضاء وسوداء قوية', 'ضربات بصرية صريحة', 'طاقة انفجارية وحماس ناري'],
    difficulty: 'صعب',
    popularIn: 'أغاني Phonk والألعاب التنافسية ولقطات الأكشن',
    software: ['Alight Motion', 'After Effects'],
    bannerGradient: 'from-neutral-950 to-black',
    tag: 'Aggressive Energy'
  },
  {
    id: 'skills-style',
    name: 'Skills Style Edit',
    nameAr: 'ستايل السكيلز والمهارات العالية',
    description: 'ستايل يكون المحتوى الذي فيه عالي جداً وتكون الأفكار التقنية بارزة، ستايل استعراضي معقد لا يستطيع أي إيديتور تنفيذه بالكامل.',
    characteristics: ['دمج بين 3D وتتبع الحركة Tracking', 'مؤثرات بصرية خاصة VFX معقدة', 'أفكار إبداعية غير مكررة', 'إظهار لقوة وتحكم المصمم بالبرنامج'],
    difficulty: 'أسطوري',
    popularIn: 'مسابقات الإيدت وتحديات كبار المصممين',
    software: ['After Effects', 'Blender', 'Alight Motion'],
    bannerGradient: 'from-zinc-900 to-black',
    tag: 'Mastery Level'
  },
  {
    id: 'text-style',
    name: 'Text Style Edit',
    nameAr: 'ستايل التكست والكتابة الإبداعية',
    description: 'ستايل مبني على التكست (الكتابة)، ظهور الكلمات بخطوط منوعة وتحريك نصوص احترافي يتناغم مع كلمات الأغنية أو الحوار.',
    characteristics: ['تحريك طبوغرافي Typography ديناميكي', 'تأثيرات إضاءة وتوهج للنصوص', 'تزامن كل كلمة وحرف مع الصوت', 'استخدام خطوط فخمة وأشكال جمالية'],
    difficulty: 'متوسط',
    popularIn: 'إيدت الحوارات والاقتباسات والأغاني',
    software: ['After Effects', 'Alight Motion', 'CapCut'],
    bannerGradient: 'from-zinc-800 to-black',
    tag: 'Kinetic Typography'
  },
  {
    id: 'freestyle-edit',
    name: 'Freestyle Edit',
    nameAr: 'الستايل الحر (فري ستايل)',
    description: 'ستايل حر بشكل كامل، لا يتقيد بقواعد محددة ولا يمشي على البيت أو الفلو حرفياً، يعتمد على مزاج المصمم وإلهامه اللحظي.',
    characteristics: ['كسر القواعد الكلاسيكية', 'دمج عشوائي متقن للمؤثرات', 'تنوع غير متوقع في الرتم', 'بصمة شخصية فريدة للمصمم'],
    difficulty: 'صعب',
    popularIn: 'الإيدت التجريبي والتعبيري ومقاطع الترند الخاصة',
    software: ['أي برنامج مونتاج احترافي'],
    bannerGradient: 'from-neutral-900 to-black',
    tag: 'Unrestricted Art'
  }
];

export const INITIAL_SKILLS: EditSkill[] = [
  {
    id: 'beat-senses',
    name: 'Beat Senses',
    nameAr: 'الإحساس بالأغنية والبيت',
    description: 'الإيدت مو بس أنك تحط كليب وأغنية، لازم تخلي المشاهد يحس بالأغنية مع الإيدت. التوقيت هو روح التصميم، واللقطة لازم تنبض مع كل طرقة بيس ونبرة صوت (ما عدا الفري ستايل).',
    importance: 98,
    tips: [
      'حدد الـ Markers على الـ Waveform قبل البدء بالقص',
      'اختر ضربات الـ Kick للزووم والشيك والـ Snare للتحويل والوميض',
      'لا تجعل التوقيت مجرد حركة ميكانيكية، بل مشاعر متدفقة'
    ],
    softwareHighlight: 'Audio Waveform & Beat Snapping',
    tag: 'الأساس الأول'
  },
  {
    id: 'velocity',
    name: 'Velocity',
    nameAr: 'توقيت التبطيء والسرعة',
    description: 'مهارة سهلة الفهم لكنها تسوي فارق خيالي بالريزلت النهائي. في الإيدت لازم توزن سرعة الكليب عشان ما يطلع عشوائي، موازنة فنية بين البطء والسرعة بسلاسة.',
    importance: 95,
    tips: [
      'استخدم Speed Graph / Curves دائماً وتجنب السرعة الخطية الثابتة Linear',
      'ارفع فريمات المقطع إلى 60fps أو 120fps قبل التبطيء لتجنب الـ Lag',
      'اجعل التبطيء يركز على اللحظة الأكثر إثارة في اللقطة'
    ],
    softwareHighlight: 'Speed Graph & Optical Flow Twixtor',
    tag: 'الفلو والسلاسة'
  },
  {
    id: 'effects',
    name: 'Effects',
    nameAr: 'المؤثرات البصرية (FX)',
    description: 'حرفياً الإيفكت بكثير من الإيدتات يحدد قوة وفخامة العمل. المؤثرات تسوي فارق عظيم بس مو أي إيديتور يقدر يوظفها بالشكل المتناسق بدون مبالغة تخرب المقطع.',
    importance: 92,
    tips: [
      'تجنب المبالغة Over-editing؛ المؤثر خادم للقصة وليس العكس',
      'ادمج مؤثرات العدسات والتشتت الضوئي مع حركات الكاميرا',
      'استخدم Blending Modes باحترافية مثل Screen و Overlay و Color Dodge'
    ],
    softwareHighlight: 'Optics, Glitch, Glow & Displace',
    tag: 'القوة البصرية'
  },
  {
    id: 'colours-lighting',
    name: "Colour's and Lighting Effect",
    nameAr: 'الألوان والإضاءة (CC & Lighting)',
    description: 'الألوان والإضاءة تعطي انطباع ساحر وأجواء لا تُنسى على الإيدت، ولكن لن تصنع الفارق العظيم إلا إذا ركزت عليها بتناسق طوال مدة العمل وعزلت الشخصيات بشكل صحيح.',
    importance: 90,
    tips: [
      'استخدم الـ Curves وموازنة الهيلايتس والشادوز Lumetri / Color Balance',
      'أضف Edge Glow وإضاءات حواف Edge Light حول الشخصية لإبرازها عن الخلفية',
      'احرص على ألا تفقد تفاصيل الوجه أو ملامح المشهد بالظلام الشديد'
    ],
    softwareHighlight: 'Color Correction (CC) & Rim Lighting',
    tag: 'الجو العام Mood'
  },
  {
    id: 'transitions',
    name: 'Transitions',
    nameAr: 'الانتقالات الاحترافية',
    description: 'شيء أساسي بكثير من الإيدتات، إذا طبقته بشكل صحيح راح يسوي فارق بالتصميم كله، وإذا طبقته بشكل خاطئ راح يخرب حركة وتدفق الإيدت كامل.',
    importance: 94,
    tips: [
      'احرص على أن تكون حركة الانتقال متصلة اتجاهياً (Directional Continuity)',
      'انتقال الزووم يتطلب زووم إن بنهاية اللقطة الأولى وزووم أوت ببداية التالية',
      'استخدم الحركة الطبيعية للأشخاص كقناع Seamless Mask Transition'
    ],
    softwareHighlight: 'Seamless Pan, Zoom, Whip & 3D Tilt',
    tag: 'حلقة الوصل'
  },
  {
    id: 'text',
    name: 'Text',
    nameAr: 'الكتابة والنصوص (Typography)',
    description: 'شيء قد لا يكون أساسياً في بعض الستايلات، لكن إذا طبقته باحترافية وذوق راح يعطيك انطباع فخم جداً ويوصل رسالة المشهد بقوة.',
    importance: 80,
    tips: [
      'اختر خطوط سينمائية حديثة وتناسق مع ثيم المقطع',
      'أضف اهتزاز أو لمعة خفيفة للنص متزامنة مع نطق الكلمة',
      'لا تجعل النص يغطي الجزء الأهم من اللقطة'
    ],
    softwareHighlight: 'Kinetic Typography & Text Animator',
    tag: 'الرسالة والهوية'
  },
  {
    id: 'sound-effects',
    name: 'Sound Effect (SFX)',
    nameAr: 'التأثيرات الصوتية (SFX)',
    description: 'شيء يسوي فارق مرعب إذا طبقته صح! أصوات السووش Woosh والانفجار والضربات ترفع الواقعية وتجعل المشاهد يعيش داخل الفيديو.',
    importance: 96,
    tips: [
      'ضع صوت Whoosh مع كل انتقال سريع أو زووم حاد',
      'أضف Bass Drop أو ضربة Impact قوية عند بدء القتال أو التحول',
      'وازن مستويات الصوت بحيث لا تغطي المؤثرات الصوتية على تراك الأغنية الأساسي'
    ],
    softwareHighlight: 'Whooshes, Risers, Impacts & Glitch SFX',
    tag: 'العمق السمعي'
  }
];

export const INITIAL_CATEGORIES: EditCategory[] = [
  {
    id: 'purposeful',
    name: 'Official Purposeful Edit',
    nameAr: 'تصنيف الإيدت الهادف',
    description: 'إيدت يحمل رسالة عميقة وفكرة موجهة، يركز على قيمة إنسانية أو عبرة أو تحفيز نفسي يترك أثراً حقيقياً في نفس المشاهد.',
    vibe: 'ملهم، عميق، فكري، درامي',
    iconName: 'Compass',
    recommendedStyles: ['Minimal Edit', 'Smooth Style', 'Text Style']
  },
  {
    id: 'disrespect',
    name: 'Dissrespect Edit Official',
    nameAr: 'تصنيف الإيدت الهجومي',
    description: 'إيدت هجومي مباشر موجه على شخصية أو خصم، يتميز بالسخرية وإبراز التفوق التام واللقطات المهينة للطرف الآخر بأقوى إيقاع.',
    vibe: 'استفزازي، حاد، قاصف، صاخب',
    iconName: 'Flame',
    recommendedStyles: ['Hard Style', 'Glitch Edit', 'Velocity Edit']
  },
  {
    id: 'flex',
    name: 'Flex Edit Official',
    nameAr: 'تصنيف الإيدت الاستعراضي (فليكس)',
    description: 'تصنيف الإيدت الاستعراضي الفخم، يركز على إبراز الهيبة والفخامة والثراء والمهارات الخارقة للشخصية أو اللاعب بأقصى درجات الإبهار.',
    vibe: 'فخم، متباهي، طاغي، سينمائي',
    iconName: 'Crown',
    recommendedStyles: ['Smooth Style', 'Velocity Edit', 'Shek Style']
  },
  {
    id: 'story',
    name: 'Story Edit Official',
    nameAr: 'تصنيف الإيدت القصصي',
    description: 'إيدت يحكي قصة متكاملة بتسلسل زمني أو سردي، من البداية إلى الذروة وحتى الخاتمة مع حوارات ومؤثرات تخدم سيناريو المشهد.',
    vibe: 'سردي، مشوق، سيناريو متقن، شاعري',
    iconName: 'BookOpen',
    recommendedStyles: ['Transition Edit', 'Text Style', 'Smooth Style']
  },
  {
    id: 'battle-sneak',
    name: 'Battle and Sneak Edit Official',
    nameAr: 'تصنيف المعارك والنغزات والمهارات',
    description: 'تصنيف يركز على مقارنات القوة، النغزات، سرعة رد الفعل، والمهارات التكتيكية العالية في المعارك والمواجهات الحاسمة.',
    vibe: 'تحدي، مقارنات، مهارات، ضربات ذكية',
    iconName: 'Swords',
    recommendedStyles: ['Hard Style', 'Velocity Edit', 'Glitch Edit']
  },
  {
    id: 'sad',
    name: 'Sad Edit Official',
    nameAr: 'تصنيف الإيدت الحزين والمؤثر',
    description: 'تصنيف الإيدت الكئيب والمؤثر، يركز على لحظات الفقدان، الوداع، الانكسار، والذكريات المؤلمة بألوان باهتة وموسيقى تمس المشاعر.',
    vibe: 'حزين، باكي، نوستالجيا، معتم',
    iconName: 'CloudRain',
    recommendedStyles: ['Blur Style', 'Smooth Style', 'Text Style']
  }
];

export const INITIAL_TUTORIALS: TutorialItem[] = [
  {
    id: 'tut-alight-motion',
    title: 'شرح لايت موشن: زوم شيك + زوم أوت الاحترافي',
    software: 'Alight Motion',
    technique: 'Zoom In, Zoom Out & Dynamic Shake',
    description: 'طريقة عمل زوم شيك سينمائي متناسق مع انتقالة زووم أوت ناعمة في برنامج لايت موشن مع استعراض خطوات المنحنيات خطوة بخطوة والنتيجة النهائية.',
    tutorialVideoUrl: 'https://cdn.discordapp.com/attachments/1211035711138955304/1532141108010811473/b5c1b4379b806383.mov?ex=6aabb5d9&is=6aaa6459&hm=dd37d5c18f20632b0c52cd7e2a6874fc7443a0b0569f4cf0338bd192d0f469cb&',
    resultVideoUrl: 'https://cdn.discordapp.com/attachments/1211035711138955304/1532141016600018994/ScreenRecording_07-30-2026_00-37-23_1.mov?ex=6aabb5c4&is=6aaa6444&hm=96fa6206ff1d4fd0c0e9740c6554b5785eb6989fc066d787dd8957e7913124ec&',
    fps: '120 FPS',
    resolution: '4K Ultra HD',
    author: 'Talon'
  },
  {
    id: 'tut-capcut-shake',
    title: 'شرح كاب كات: الأسلوب بشيك احترافي',
    software: 'CapCut',
    technique: 'Style Shake & Keyframing',
    description: 'شرح تفصيلي لتطبيق أسلوب الشيك السينمائي على كاب كات للأجهزة الذكية والكمبيوتر مع كيفية وزن الكي فريمات وضبط الاهتزاز.',
    tutorialVideoUrl: 'https://cdn.discordapp.com/attachments/1211035827816112207/1530645426301177987/ScreenRecording_07-25-2026_21-28-56_1.mov?ex=6aab8ae3&is=6aaa3963&hm=52e4bb1117d73caa0e68f16158bf543b9ab89c5b31819a8e1822ae8e979b3993&',
    resultVideoUrl: 'https://cdn.discordapp.com/attachments/1211035827816112207/1530645472551632926/4D50F8ED-975C-48C9-A3DD-69839CB7F899.mov?ex=6aab8aee&is=6aaa396e&hm=b53e86aa3f5c6f8098aea6fb08b03fd86f5070e085e6966448f7203a89a3c836&',
    fps: '60 FPS',
    resolution: '1080p FHD',
    author: 'Talon'
  },
  {
    id: 'tut-advanced-flow',
    title: 'شرح ثانٍ احترافي: تكنيك التناسق والحركة',
    software: 'Alight Motion / CapCut',
    technique: 'Pro Motion Sequencing & Flow',
    description: 'شرح كامل لحركة الفلو المتقدمة والانتقالات المعقدة وتركيب الطبقات مع استعراض الشرح والنتيجة المباشرة قبل وبعد.',
    tutorialVideoUrl: 'https://cdn.discordapp.com/attachments/1211035827816112207/1531461121523843092/Screenrecorder-20260416-223250.mp4?ex=6aabdf90&is=6aaa8e10&hm=8509e23e8563fcb8a9769e8b04856228e28dfcf8f805653187bded8658595cd6&',
    resultVideoUrl: 'https://cdn.discordapp.com/attachments/1211035827816112207/1531461208060723321/lv_0_20260416222426.mp4?ex=6aabdfa5&is=6aaa8e25&hm=52cea349af031baae242d4e8d05584732e2f20366eb9b241f41dd2002db7a67a&',
    fps: '120 FPS',
    resolution: '2K QHD',
    author: 'Talon'
  }
];

export const INITIAL_SHAKES: PresetItem[] = [
  {
    id: 'shake-talon-2',
    title: 'شيك احترافي Shaek by Talon 2',
    type: 'shake',
    subType: 'كلاسيك شيك',
    description: 'شيك متزن وقوي لضربات البيت والتنقلات السريعة، جاهز للاستيراد بملف XML.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1503701730913943663/Shaek.talon3_8F9F677.gif?ex=6aabbd5e&is=6aaa6bde&hm=2d468548e0570d9632edde2a85b72f74fcc1fead0e77b00673dc670689a79891&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1503699735134081114/Shaek.by.talon2.xml?ex=6aabbb82&is=6aaa6a02&hm=4b3dd8396d89eaec817094ebfe872045cdfc566f5c08ce2ecd45cdc1cc82f706&',
    downloadsCount: 1420,
    tags: ['XML', 'Alight Motion', 'Classic Shake'],
    author: 'Talon',
    fileSize: '48 KB'
  },
  {
    id: 'shake-talon-3',
    title: 'شيك سموذ Shaek talon 3 Smooth',
    type: 'shake',
    subType: 'سموذ شيك',
    description: 'شيك ناعم جداً وانسيابي مع اهتزازات متدرجة تناسب مقاطع الأفلام والأنمي السموذ.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1503701730913943663/Shaek.talon3_8F9F677.gif?ex=6aabbd5e&is=6aaa6bde&hm=2d468548e0570d9632edde2a85b72f74fcc1fead0e77b00673dc670689a79891&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1503701094663061534/Shaek.talon3.xml?ex=6aabbcc6&is=6aaa6b46&hm=00787f7ce40c40c250e0385c525015860d0412d3bdf9a2bd25d8126573de0eea&',
    downloadsCount: 2310,
    tags: ['Smooth', 'XML', 'Alight Motion'],
    author: 'Talon',
    fileSize: '52 KB'
  },
  {
    id: 'shake-talon-4',
    title: 'شيك سموذ 4 Shaek by talon 4',
    type: 'shake',
    subType: 'سموذ شيك فخم',
    description: 'إصدار مطور من الشيك السموذ بانتقال زاوية ثلاثية الأبعاد ونعومة مطلقة على 60/120fps.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1503714678940106862/Shaek.by.talon4_AB12991.gif?ex=6aabc96d&is=6aaa77ed&hm=cbec443c29bc0c3b4520bd84dca10b62f994cba09ada785bba7e1ac626061e4a&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1503713741546586221/Shaek.by.talon4.xml?ex=6aabc88d&is=6aaa770d&hm=9cf4a8c0aea6747ad473805621c607c2bc40113de99e4fdddce67b96daf8fc16&',
    downloadsCount: 1890,
    tags: ['Smooth', 'Ultra', 'XML'],
    author: 'Talon',
    fileSize: '56 KB'
  },
  {
    id: 'shake-hard-smooth-1',
    title: 'شيك هارد + سموذ مدمج shek by Talon',
    type: 'shake',
    subType: 'هارد + سموذ',
    description: 'مزيج رهيب يبدأ بهزة هارد حادة وقوية وينتهي بانسيابية سموذ ممتازة للضربات.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1527644990803808296/shek.byTalon_AE72759.gif?ex=6aabd544&is=6aaa83c4&hm=c8d92f89fa1d05c02ff034d7251d3f1925bfbad2051028ca4b7757e00664691f&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1527644670589534316/shek.byTalon.xml?ex=6aabd4f7&is=6aaa8377&hm=ed79230c6bc69bdbfb3867590845922ce7ab8cd09a993e17f321a0e30aee6ebd&',
    downloadsCount: 3100,
    tags: ['Hard', 'Smooth', 'Combo', 'XML'],
    author: 'Talon',
    fileSize: '64 KB'
  },
  {
    id: 'shake-double-shek',
    title: 'دبل شيك: الأول هارد والثاني سموذ',
    type: 'shake',
    subType: 'دبل شيك',
    description: 'شيكين في بريست واحد، هزة أولى عنيفة هارد تعقبها هزة ثانية سموذ رايقة مع تداخل ممتاز.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1527649912072699914/shaek.byTalon_ECC4BAB.gif?ex=6aabd9d9&is=6aaa8859&hm=f06dd4eb4ce123e348cbcd9c054f227448fe49c2a6bc1597961144e6b2e369a3&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1527649709362122833/shaek.byTalon.xml?ex=6aabd9a9&is=6aaa8829&hm=36c4b2992707613ad936e71c7dffe51f92948f220961b0b8b4a40cf47402c4ec&',
    downloadsCount: 2750,
    tags: ['Double Shake', 'Hard-Smooth', 'XML'],
    author: 'Talon',
    fileSize: '70 KB'
  },
  {
    id: 'shake-triple-k',
    title: 'شيك shekkk by Talon السريع',
    type: 'shake',
    subType: 'شيك ديناميكي',
    description: 'تردد سريع للاهتزاز مع إزاحة طفيفة في المحاور يعطي شعوراً حياً ومفعماً بالطاقة.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1527650485903818762/shekkk.byTalon_1304B83.gif?ex=6aabda62&is=6aaa88e2&hm=78ba9fb983512b7f299571b5a3ec578323f85e0b58bea5b8bb1204b43e88dcf6&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1527650342643171440/shekkk.byTalon.xml?ex=6aabda40&is=6aaa88c0&hm=b08ab3f5f9c1d27b5b87911fd6194d7f7612aeaed3a5eb73ebc3c5138743aafa&',
    downloadsCount: 1640,
    tags: ['Dynamic', 'Rapid', 'XML'],
    author: 'Talon',
    fileSize: '50 KB'
  },
  {
    id: 'shake-pure-hard',
    title: 'شيك هارد عنيف shek by Talon Hard',
    type: 'shake',
    subType: 'هارد شيك خالص',
    description: 'شيك هارد صريح بدون أي سموذ، مخصص للمقاطع الحماسية وضربات الفونك والقتال السريع.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1527669051919437954/shek.byTalon_E3355EF.gif?ex=6aab42ec&is=6aa9f16c&hm=cdbe8a58fde19782ae3f58b30f8271bd39b79b882553341e72bdf19392592533&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496226326242267308/1527668913679106138/shek.byTalon.xml?ex=6aab42cb&is=6aa9f14b&hm=4976136fe6177c1a15b8fd04b69e2c16986490b23c9fd8d9858054a10d9af9de&',
    downloadsCount: 2980,
    tags: ['Pure Hard', 'Aggressive', 'XML'],
    author: 'Talon',
    fileSize: '45 KB'
  }
];

export const INITIAL_EFFECTS_COURSES: PresetItem[] = [
  {
    id: 'eff-text-talon',
    title: 'إفكت تكست متقدم TEXT by Talon',
    type: 'effect',
    subType: 'تكست احترافي',
    description: 'تأثير إضاءة وتحريك تكست مميز للكلمات والجمل الحماسية مع توهج وانتقالة جاهزة.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1503791871733006436/TEXT.by.Talon_0FCB345.gif?ex=6aab6891&is=6aaa1711&hm=5c310a695f89e95ef6feab89196bafb03b652377185b2f094904a12bdc447cac&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1503790266845364314/TEXT.by.Talon.xml?ex=6aab6712&is=6aaa1592&hm=c681caebbc6114539f0bda921b711fee6556ef5d8515ac9cb8bd1d3073ed5eb2&',
    downloadsCount: 1820,
    tags: ['Text Effect', 'Glow', 'XML'],
    author: 'Talon',
    fileSize: '58 KB'
  },
  {
    id: 'eff-by-talon',
    title: 'إفكت المؤثرات البصرية by.talon',
    type: 'effect',
    subType: 'مؤثر حركي',
    description: 'حزمة مؤثرات بصرية مدمجة تعزز قوة المشاهد وتمنح اللقطة عمقاً وتركيزاً سينمائياً.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1503797251120697454/by.talon_8B3E232.gif?ex=6aab6d93&is=6aaa1c13&hm=05df9dd2ece172fffe9fbbc9d85ec79373899a2b0584966461545b2b50487e05&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1503797185450606673/by.talon.xml?ex=6aab6d84&is=6aaa1c04&hm=33838999a569b40fda693880a3c02bc91688c4c781d3703a6e4f694d92614116&',
    downloadsCount: 1450,
    tags: ['VFX', 'Visual FX', 'XML'],
    author: 'Talon',
    fileSize: '62 KB'
  },
  {
    id: 'eff-text-shake',
    title: 'إفكت تكست مع شيك text effect by Talon',
    type: 'effect',
    subType: 'تكست + شيك',
    description: 'دمج ساحر بين تحريك النص واهتزاز الشيك باللحظة ذاتها لإبراز الكلمات القوية.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1527652154033307699/text.effect.byTalon_47A4E4A.gif?ex=6aabdbef&is=6aaa8a6f&hm=b40d9a63cfd34788459265c03bd3caec155fd5517db8ec67b38a87cdc87a08c7&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1527652044872093876/text.effect.byTalon.xml?ex=6aabdbd5&is=6aaa8a55&hm=3a4d0b7f4e2d58fc1746777eb96d449f4c151d97684fbda3a424cf69249e5059&',
    downloadsCount: 2240,
    tags: ['Text Shake', 'Impact', 'XML'],
    author: 'Talon',
    fileSize: '66 KB'
  },
  {
    id: 'course-intro-1',
    title: 'كورس إيدت: مقدمة احترافية (1) byTalon',
    type: 'course',
    subType: 'كورس مقدمات',
    description: 'قالب وكورس مدخل لعالم المونتاج وصنع مقدمات رهيبة بتركيب احترافي للفريمات.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1527654252120375406/258_63FBADF.gif?ex=6aabdde4&is=6aaa8c64&hm=76dbeb59daec7247a28f3c426dc2f7588960c6c97fc59ab2890ce4de8422775b&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1527654017742929940/byTalon.xml?ex=6aabddac&is=6aaa8c2c&hm=8eb730d1dbb921d8f284dfacc266e14092bece552f484cb75364667282915f3b&',
    downloadsCount: 3410,
    tags: ['Course', 'Intro', 'XML', '258'],
    author: 'Talon',
    fileSize: '88 KB'
  },
  {
    id: 'course-intro-2',
    title: 'كورس إيدت: مقدمة احترافية (2) ms13 by Talon',
    type: 'course',
    subType: 'كورس مقدمات ms13',
    description: 'مشروع كامل لمقدمة سينمائية متطورة ms13 مع تدفق سلس لطبقات الفيديو والموسيقى.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1527662235705413705/289_ADBFEF9.gif?ex=6aabe553&is=6aaa93d3&hm=61219415519ac50a1cdfaa1d98792fa3405b286bbe6fb44fb47aecca04bd6e49&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1527661995724378183/ms13.byTalon.xml?ex=6aabe51a&is=6aaa939a&hm=ab9934fb1923620ed2d2c498038720df47b167940404b605f25f5f522830d5dd&',
    downloadsCount: 2950,
    tags: ['Course', 'ms13', 'Intro', 'XML'],
    author: 'Talon',
    fileSize: '94 KB'
  },
  {
    id: 'course-intro-3',
    title: 'كورس إيدت: مقدمة احترافية (3) 262 by Talon',
    type: 'course',
    subType: 'كورس مقدمات 262',
    description: 'مشروع مقدمة أنمي وأفلام ديناميكية برقم 262 مع انتقالات متناغمة وألوان حادة.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1527664089344770169/262_Copy_8F22674.gif?ex=6aabe70d&is=6aaa958d&hm=c2899e5430b2e54dbfe30bf88df02cf21b6e57b0a1a1ea8fca08de06d2608c44&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1527663886973669468/by.Talon.xml?ex=6aabe6dd&is=6aaa955d&hm=de3f7e275d0e515ece3f5f161fbb6e4252904f4c199c97760947befdb79fdad4&',
    downloadsCount: 2180,
    tags: ['Course', '262', 'Intro', 'XML'],
    author: 'Talon',
    fileSize: '82 KB'
  },
  {
    id: 'course-intro-4',
    title: 'كورس إيدت: مقدمة احترافية (4) 251 by Talon',
    type: 'course',
    subType: 'كورس مقدمات 251',
    description: 'مقدمة حماسية تعتمد على تقطيع فريمات متقن وتدرج لوني سينمائي جاهز للاستخدام.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1527666433062867004/251_Copy_A8CC983.gif?ex=6aab407c&is=6aa9eefc&hm=8cf9ae7c28087b5675f4ee564e570c840c08685b463aa5ecca44668eef80ead7&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1496225695851089970/1527666245049126912/by.Talon.xml?ex=6aab404f&is=6aa9eecf&hm=e9d6ef71cfb04d2dc693e8a4cdfb9a82a9c2ef6ef11ae130d3cdfa425d1a2d8b&',
    downloadsCount: 2630,
    tags: ['Course', '251', 'Intro', 'XML'],
    author: 'Talon',
    fileSize: '79 KB'
  }
];

export const INITIAL_CC_FIVEM: PresetItem[] = [
  {
    id: 'cc-dark-talon',
    title: 'CC Dark FiveM by Talon',
    type: 'cc',
    subType: 'سيرفرات FiveM والمودات المظلمة',
    description: 'تصحيح ألوان مظلم وفخم Dark CC مخصص للقطات FiveM ولعبة GTA V والسيارات في الليل.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1503727513157898300/1503777759162400889/CC.by.talon_74F8959.gif?ex=6aab5b6c&is=6aaa09ec&hm=8a453fcbe75841402e12e0dbd43216801827daf013e73319fa3a8103b3fa662d&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1503727513157898300/1503777712320417903/CC.by.talon.xml?ex=6aab5b61&is=6aaa09e1&hm=8cd6c740ce2f6510c2ae9587f72153ecba23fe8417f750ce8da407033e2e032b&',
    downloadsCount: 4200,
    tags: ['CC Dark', 'FiveM', 'GTA V', 'XML'],
    author: 'Talon',
    fileSize: '38 KB'
  },
  {
    id: 'cc-ccs',
    title: 'CC سينمائي متكامل ccs',
    type: 'cc',
    subType: 'سينمائي عالي التباين',
    description: 'بريست تصحيح ألوان بتباين سينمائي غني ودفء لوني رائع للمشاهد الخارجية والأكشن.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1503727513157898300/1503778938395033630/ccs_0F8DC5A.gif?ex=6aab5c85&is=6aaa0b05&hm=ece2db8eba4e39c379741ab41f544ea3c41f9f07f22b84a21d7c9ff74aaa853f&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1503727513157898300/1503778847164727316/ccs.xml?ex=6aab5c70&is=6aaa0af0&hm=d6cbfa965adaac6bb000ad8ca2171977332fdfc93ca65686e6d44a7eb00b2a7e&',
    downloadsCount: 3120,
    tags: ['Cinematic', 'Contrast', 'XML'],
    author: 'Talon',
    fileSize: '41 KB'
  },
  {
    id: 'cc-193-triangle',
    title: 'CC 193 مثلث الاحترافي',
    type: 'cc',
    subType: 'سلسلة 193',
    description: 'تأثير لوني حاد ومميز بإضاءة موجهة وتفتيح مركز يضفي بريقاً كريستالياً على المشاهد.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1503727513157898300/1503780151228502097/193_23DDC96.gif?ex=6aab5da6&is=6aaa0c26&hm=0df8e2046eba4e50e17f9d0e20fb8db789ec00c367cd2351ca288f1e4def592b&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1503727513157898300/1503780026661732402/193.xml?ex=6aab5d89&is=6aaa0c09&hm=ce69962e546a182d71b6de2a8bbc5fbc789be32a958084554357e3f22f820678&',
    downloadsCount: 2840,
    tags: ['CC 193', 'Crystal Glow', 'XML'],
    author: 'Talon',
    fileSize: '36 KB'
  },
  {
    id: 'cc-0260',
    title: 'CC 0260 النيلي الفاخر',
    type: 'cc',
    subType: 'تون نيلي وأزرق ليلي',
    description: 'تصحيح ألوان بتونات نيلية وزرقاء عميقة ممتازة لقتالات الأنمي وأجواء الحزن والهدوء.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1503727513157898300/1503799721951494164/29F38D0.gif?ex=6aab6fe0&is=6aaa1e60&hm=6e1cf3406f04b5f0af402f019fd902559e041822346f9c6cd3f5ec6a6a0edb6e&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1503727513157898300/1503799287082123415/0260135bda05a6f3.xml?ex=6aab6f79&is=6aaa1df9&hm=a92385294eda0bbebd243261b7abf3e88aa9db37162661ec1cc453895651523e&',
    downloadsCount: 3590,
    tags: ['Deep Blue', 'Night Glow', 'XML'],
    author: 'Talon',
    fileSize: '44 KB'
  },
  {
    id: 'cc-aizen',
    title: 'CC Aizen 1998 الأسطوري',
    type: 'cc',
    subType: 'سوبر دارك Aizen',
    description: 'البريست الشهير لشخصية آيزن وهيبة الشر؛ درجات رمادية وسوداء طاغية مع حدة فائقة في التفاصيل.',
    gifUrl: 'https://cdn.discordapp.com/attachments/1503727513157898300/1504784820428079245/cc_aizen1998_D58B838.gif?ex=6aabb992&is=6aaa6812&hm=b4860c0deac6674b742759916d1c959af63e1dbfa875c289a02fc73ba6b37371&',
    xmlUrl: 'https://cdn.discordapp.com/attachments/1503727513157898300/1504784013045534880/cc_aizen1998.xml?ex=6aabb8d2&is=6aaa6752&hm=45d22b377502905843ac7b2c0ad45860475f043f098c2cce8f1ed31c5fc919d3&',
    downloadsCount: 5210,
    tags: ['Aizen', 'Super Dark', 'Legendary', 'XML'],
    author: 'Talon',
    fileSize: '49 KB'
  }
];

export const INITIAL_USER_VIDEOS: UserVideo[] = [
  {
    id: 'vid-1',
    title: 'Gojo Satoru - Pure Velocity & 4K Flow',
    authorName: '21foredit Master',
    authorEmail: 'ahmdzwahrt273@gmail.com',
    authorAvatar: 'https://i.top4top.io/p_391173gui0.jpg',
    videoUrl: 'https://cdn.discordapp.com/attachments/1211035711138955304/1532141016600018994/ScreenRecording_07-30-2026_00-37-23_1.mov?ex=6aabb5c4&is=6aaa6444&hm=96fa6206ff1d4fd0c0e9740c6554b5785eb6989fc066d787dd8957e7913124ec&',
    description: 'إيدت غوجو ساتورو باستعراض شيكات سموذ وفيلوستي فائق النعومة بدقة 4K ومعدل 120 إطاراً في الثانية.',
    resolution: '4K',
    fps: '120',
    software: 'Alight Motion',
    style: 'Velocity & Smooth',
    category: 'Flex Edit Official',
    likes: 842,
    views: 6520,
    createdAt: 'منذ ساعتين',
    isOwnerPost: true,
    comments: [
      {
        id: 'c-1',
        videoId: 'vid-1',
        authorEmail: 'talon@21foredit.vip',
        authorName: 'Talon Editor',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        text: 'الفيلوستي والـ Beat Sync أسطوري ما شاء الله! 🔥',
        createdAt: 'منذ ساعة',
        isAdmin: true
      },
      {
        id: 'c-2',
        videoId: 'vid-1',
        authorEmail: 'ahmdzwahrt273@gmail.com',
        authorName: '21foredit Master',
        authorAvatar: 'https://i.top4top.io/p_391173gui0.jpg',
        text: 'حبيبي يا فنان، البريست والشيكات كلها متوفرة بالموقع 👑',
        createdAt: 'منذ 40 دقيقة',
        isOwner: true
      }
    ]
  },
  {
    id: 'vid-2',
    title: 'GTA V / FiveM Dark Night Roll',
    authorName: 'Talon FiveM',
    authorEmail: 'talon@21foredit.vip',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.discordapp.com/attachments/1211035827816112207/1530645472551632926/4D50F8ED-975C-48C9-A3DD-69839CB7F899.mov?ex=6aab8aee&is=6aaa396e&hm=b53e86aa3f5c6f8098aea6fb08b03fd86f5070e085e6966448f7203a89a3c836&',
    description: 'استعراض سيارات فيف إم مع CC Dark وضربات شيك متزامنة بالمللي ثانية.',
    resolution: '4K',
    fps: '60',
    software: 'CapCut',
    style: 'Shek & Blur',
    category: 'Flex Edit Official',
    likes: 490,
    views: 3890,
    createdAt: 'منذ 5 ساعات',
    comments: [
      {
        id: 'c-3',
        videoId: 'vid-2',
        authorEmail: 'gamer@gmail.com',
        authorName: 'FiveM Pro',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        text: 'الـ CC Dark رايق جداً عاطي جو فخم للسيارة',
        createdAt: 'منذ ساعتين'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'report',
    title: '⚠️ بلاغ عن محتوى مشبوه',
    message: 'تم إرسال بلاغ ضد حساب مستخدم بسبب انتهاك حقوق المونتاج.',
    timestamp: 'منذ 15 دقيقة',
    read: false,
    reportedUserEmail: 'violator@test.com',
    reportedVideoId: 'vid-2'
  },
  {
    id: 'notif-2',
    type: 'upload',
    title: '🎬 إيدت جديد نزل بالمنصة',
    message: 'نشر المصمم Talon FiveM فيديو بجودة 4K في تصنيف Flex Edit.',
    timestamp: 'منذ ساعتين',
    read: true
  }
];

