import type { DemoState } from "@/types/demo";

export const DEMO_SEED_STATE: DemoState = {
  users: [
    {
      id: "user-1",
      firstName: "أحمد",
      lastName: "محمد",
      email: "ahmed@example.com",
      password: "123456",
    },
    {
      id: "user-2",
      firstName: "سارة",
      lastName: "علي",
      email: "sara@example.com",
      password: "123456",
    },
    {
      id: "user-3",
      firstName: "محمد",
      lastName: "خالد",
      email: "mohamed@example.com",
      password: "123456",
    },
  ],

  currentUserId: null,

  initiatives: [
    {
      id: "initiative-1",
      organizerId: "user-1",
      title: "أرح الدكان",
      summary: "معاً نخفف أعباء الديون عن الأسر المتعففة.",
      description:
        "مبادرة تكافلية تهدف إلى الوصول للأسر المتعففة التي تراكمت عليها ديون لدى أصحاب الدكاكين بسبب شراء الاحتياجات الأساسية. تعمل المبادرة على التحقق من الحالات والتواصل مع أهل الخير للمساهمة في سداد الديون وتوفير الاحتياجات الضرورية مع الحفاظ على خصوصية الأسر وكرامتها.",
      coverImage: "/images/initiatives/init_1.avif",
      region: {
        state: "الخرطوم",
        city: "الخرطوم",
      },
      gallery: [
        "/images/initiatives/arh-aldokan/1.jpg",
        "/images/initiatives/arh-aldokan/2.jpg",
      ],
      followerIds: ["user-2", "user-3"],
      contributorIds: ["user-2"],
      activityIds: ["activity-1", "activity-2"],
      createdAt: "2026-09-10T10:00:00.000Z",
    },

    {
      id: "initiative-2",
      organizerId: "user-2",
      title: "ارتاحي الليلة يمة",
      summary: "مبادرة مجتمعية لدعم الأمهات والأسر المحتاجة.",
      description:
        "مبادرة مجتمعية تجريبية تهدف إلى تقديم الدعم والمساندة للأمهات والأسر التي تواجه ظروفاً معيشية صعبة، من خلال تنظيم أنشطة تطوعية وجمع المساهمات العينية وتوزيع الاحتياجات الأساسية.",
      coverImage: "/images/init_2.png",
      region: {
        state: "الخرطوم",
        city: "أم درمان",
      },
      gallery: [
        "/images/initiatives/irta7i/1.jpg",
      ],
      followerIds: ["user-1"],
      contributorIds: [],
      activityIds: ["activity-3"],
      createdAt: "2026-09-15T10:00:00.000Z",
    },

    {
      id: "initiative-3",
      organizerId: "user-3",
      title: "ما نسيناكم",
      summary: "معاً لدعم المراكز الصحية واستعادة الخدمات الطبية.",
      description:
        "مبادرة شبابية تسعى إلى دعم القطاع الصحي والمراكز الصحية في السودان، والمساهمة في توفير الاحتياجات الأساسية وتحسين بيئة العمل بالمرافق الصحية. تشمل جهودها دعم الطاقة الشمسية للمراكز الصحية وتوسيع مشاركة الشباب في إعادة تأهيل الخدمات.",
      coverImage: "/images/init_3.png",
      region: {
        state: "الخرطوم",
        city: "الخرطوم",
      },
      gallery: [
        "/images/initiatives/ma-nseenakom/1.jpg",
        "/images/initiatives/ma-nseenakom/2.jpg",
      ],
      followerIds: ["user-1", "user-2"],
      contributorIds: ["user-1", "user-2"],
      activityIds: ["activity-4", "activity-5"],
      createdAt: "2026-09-20T10:00:00.000Z",
    },

    {
      id: "initiative-4",
      organizerId: "user-1",
      title: "الخرطوم خضراء",
      summary: "نزرع اليوم لنصنع غداً أكثر خضرة.",
      description:
        "مبادرة شبابية تطوعية تهدف إلى إعادة تشجير ولاية الخرطوم وتحسين البيئة الحضرية بعد آثار الحرب. تعمل المبادرة على تنظيم حملات التشجير والنظافة والتوعية البيئية، بمشاركة الشباب وسكان الأحياء.",
      coverImage: "/images/init_4.png",
      region: {
        state: "الخرطوم",
        city: "الخرطوم",
      },
      gallery: [
        "/images/initiatives/khartoum-green/1.jpg",
        "/images/initiatives/khartoum-green/2.jpg",
      ],
      followerIds: ["user-2", "user-3"],
      contributorIds: ["user-2"],
      activityIds: ["activity-6", "activity-7"],
      createdAt: "2026-09-25T10:00:00.000Z",
    },

    {
      id: "initiative-5",
      organizerId: "user-2",
      title: "القضارف خضراء",
      summary: "نحو بيئة أنظف ومساحات خضراء أكثر.",
      description:
        "مبادرة بيئية تجريبية تهدف إلى تشجيع التشجير والمحافظة على المساحات الخضراء في ولاية القضارف، من خلال حملات تطوعية وأنشطة توعوية بمشاركة أفراد المجتمع.",
      coverImage: "/images/init_5.png",
      region: {
        state: "القضارف",
        city: "القضارف",
      },
      gallery: [
        "/images/initiatives/gadarif-green/1.jpg",
      ],
      followerIds: ["user-1"],
      contributorIds: [],
      activityIds: ["activity-8"],
      createdAt: "2026-10-01T10:00:00.000Z",
    },

    {
      id: "initiative-6",
      organizerId: "user-3",
      title: "جداريات ولاية الخرطوم",
      summary: "نحو مدينة أجمل بألوان وإبداع شبابها.",
      description:
        "مشروع فني يهدف إلى تجميل المرافق العامة والكباري والأنفاق عبر تنفيذ جداريات فنية تعكس الثقافة والهوية السودانية. يعتمد المشروع على مشاركة الفنانين التشكيليين والشباب في تحسين المشهد الحضري للعاصمة.",
      coverImage: "/images/init_6.png",
      region: {
        state: "الخرطوم",
        city: "الخرطوم",
      },
      gallery: [
        "/images/initiatives/khartoum-murals/1.jpg",
        "/images/initiatives/khartoum-murals/2.jpg",
      ],
      followerIds: ["user-1", "user-2"],
      contributorIds: ["user-1"],
      activityIds: ["activity-9", "activity-10"],
      createdAt: "2026-10-05T10:00:00.000Z",
    },

    {
      id: "initiative-7",
      organizerId: "user-1",
      title: "غرف الطوارئ",
      summary: "شباب السودان في خدمة مجتمعاتهم.",
      description:
        "مبادرات تطوعية مجتمعية تعمل على تقديم المساعدات الإنسانية للمتضررين، وتشمل جهودها توفير الغذاء والرعاية الصحية والمياه والدعم المجتمعي وتنظيم الأنشطة الإغاثية حسب احتياجات المناطق المختلفة.",
      coverImage: "/images/init_7.png",
      region: {
        state: "الخرطوم",
        city: "الخرطوم",
      },
      gallery: [
        "/images/initiatives/emergency-rooms/1.jpg",
        "/images/initiatives/emergency-rooms/2.jpg",
      ],
      followerIds: ["user-2", "user-3"],
      contributorIds: ["user-2", "user-3"],
      activityIds: ["activity-11", "activity-12"],
      createdAt: "2026-10-10T10:00:00.000Z",
    },
  ],

  activities: [
    {
      id: "activity-1",
      initiativeId: "initiative-1",
      title: "سداد ديون الأسر المتعففة",
      location: "أم درمان - الثورة",
      startDate: "2026-11-20T09:00:00.000Z",
      maxParticipants: 15,
      createdAt: "2026-11-01T10:00:00.000Z",
    },
    {
      id: "activity-2",
      initiativeId: "initiative-1",
      title: "تجهيز سلال غذائية للأسر",
      location: "الخرطوم - الصحافة",
      startDate: "2026-11-25T09:00:00.000Z",
      maxParticipants: 20,
      createdAt: "2026-11-02T10:00:00.000Z",
    },
    {
      id: "activity-3",
      initiativeId: "initiative-2",
      title: "تجهيز وتوزيع احتياجات الأمهات",
      location: "أم درمان - حي الجامعة",
      startDate: "2026-11-22T09:00:00.000Z",
      maxParticipants: 12,
      createdAt: "2026-11-03T10:00:00.000Z",
    },
    {
      id: "activity-4",
      initiativeId: "initiative-3",
      title: "دعم مركز صحي بالطاقة الشمسية",
      location: "الخرطوم - شرق النيل",
      startDate: "2026-11-21T08:00:00.000Z",
      maxParticipants: 15,
      createdAt: "2026-11-04T10:00:00.000Z",
    },
    {
      id: "activity-5",
      initiativeId: "initiative-3",
      title: "حملة تأهيل مركز صحي",
      location: "الخرطوم - بحري",
      startDate: "2026-11-28T08:00:00.000Z",
      maxParticipants: 20,
      createdAt: "2026-11-05T10:00:00.000Z",
    },
    {
      id: "activity-6",
      initiativeId: "initiative-4",
      title: "حملة تشجير شارع الستين",
      location: "الخرطوم - شارع الستين",
      startDate: "2026-11-19T07:00:00.000Z",
      maxParticipants: 30,
      createdAt: "2026-11-06T10:00:00.000Z",
    },
    {
      id: "activity-7",
      initiativeId: "initiative-4",
      title: "حملة نظافة وتشجير شارع النيل",
      location: "الخرطوم - شارع النيل",
      startDate: "2026-11-26T07:00:00.000Z",
      maxParticipants: 25,
      createdAt: "2026-11-07T10:00:00.000Z",
    },
    {
      id: "activity-8",
      initiativeId: "initiative-5",
      title: "حملة تشجير الأحياء",
      location: "القضارف - وسط المدينة",
      startDate: "2026-11-23T07:00:00.000Z",
      maxParticipants: 20,
      createdAt: "2026-11-08T10:00:00.000Z",
    },
    {
      id: "activity-9",
      initiativeId: "initiative-6",
      title: "تنفيذ جدارية فنية",
      location: "الخرطوم - نفق عفراء",
      startDate: "2026-11-18T08:00:00.000Z",
      maxParticipants: 15,
      createdAt: "2026-11-09T10:00:00.000Z",
    },
    {
      id: "activity-10",
      initiativeId: "initiative-6",
      title: "تجميل جسر توتي",
      location: "الخرطوم - جسر توتي",
      startDate: "2026-11-27T08:00:00.000Z",
      maxParticipants: 12,
      createdAt: "2026-11-10T10:00:00.000Z",
    },
    {
      id: "activity-11",
      initiativeId: "initiative-7",
      title: "تجهيز وتوزيع وجبات غذائية",
      location: "الخرطوم - الكلاكلة",
      startDate: "2026-11-20T09:00:00.000Z",
      maxParticipants: 25,
      createdAt: "2026-11-11T10:00:00.000Z",
    },
    {
      id: "activity-12",
      initiativeId: "initiative-7",
      title: "حملة دعم الأسر المتضررة",
      location: "أم درمان",
      startDate: "2026-11-29T09:00:00.000Z",
      maxParticipants: 20,
      createdAt: "2026-11-12T10:00:00.000Z",
    },
  ],

  registrations: [
    {
      id: "registration-1",
      userId: "user-2",
      activityId: "activity-1",
      status: "CONFIRMED",
      createdAt: "2026-11-10T10:00:00.000Z",
    },
    {
      id: "registration-2",
      userId: "user-3",
      activityId: "activity-1",
      status: "CONFIRMED",
      createdAt: "2026-11-11T10:00:00.000Z",
    },
    {
      id: "registration-3",
      userId: "user-1",
      activityId: "activity-3",
      status: "CONFIRMED",
      createdAt: "2026-11-11T10:00:00.000Z",
    },
    {
      id: "registration-4",
      userId: "user-1",
      activityId: "activity-6",
      status: "CONFIRMED",
      createdAt: "2026-11-12T10:00:00.000Z",
    },
    {
      id: "registration-5",
      userId: "user-2",
      activityId: "activity-9",
      status: "CONFIRMED",
      createdAt: "2026-11-12T10:00:00.000Z",
    },
  ],
};