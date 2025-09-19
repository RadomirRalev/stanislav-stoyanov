export const newsItems = [
  {
    id: "essay-tarakliya",
    slug: "essay-tarakliya",
    title: "Наградиха победителите в конкурса на БНР за есе на церемония в Тараклия",
    subtitle: "Голямата награда връчи вицепрезидентът.",
    date: "25 август, 2025",
    excerpt:
      "Вицепрезидентът Илияна Йотова връчи Голямата награда в конкурса за есе, който организира Българското национално радио за български ученици и студенти от Бесарабия. Церемонията се състоя във филиала на Русенския университет в Тараклия, а наградата получи Ксения Дечева.",
    body: [
      "Вицепрезидентът Илияна Йотова връчи Голямата награда в конкурса за есе, който организира Българското национално радио за български ученици и студенти от Бесарабия. Церемонията се състоя във филиала на Русенския университет в Тараклия, а наградата получи Ксения Дечева.",
      "С концертните изпълнения на вокалния квартет Светоглас, на инструменталисти от Оркестъра за народна музика на БНР и на солистката Юлия Гатдерова, церемонията по връчването на наградите на Българското национално радио се превърна в истински празник за хората в молдовския град Тараклия.",
      "Конкурсът за есе се организира от Радиото в сътрудничество с Министерството на образованието, под патронажа на вицепрезидента Илияна Йотова и имаше за цел да поощри литературните таланти сред българската общност в Бесарабия.",
    ],
    url: "/news/aug-25-town-hall",
    imageSrc: "/public/background.jpg",
    imageAlt: "Residents gathered during an evening town hall meeting.",
  },
  {
    id: "sep-25-transit-upgrades",
    slug: "sep-25-transit-upgrades",
    title: "Transit Upgrades Gain Momentum",
    subtitle: "Regional partners signed on to the express corridor concept.",
    date: "September 20, 2025",
    excerpt:
      "A coalition of five municipalities agreed to pool planning funds so we can evaluate the most promising rapid transit corridors.",
    body: [
      "The transportation working group voted unanimously to commission a feasibility study that looks at rail, bus rapid transit, and protected cycling routes across the corridor.",
      "Our campaign will continue to meet with daily commuters to ensure the study includes the lived experiences of riders who rely on public transit today.",
      "Once the firm is selected we will publish a schedule of workshops and invite residents to test the proposed routes before anything moves to construction.",
    ],
    url: "/news/sep-25-transit-upgrades",
    imageSrc: "/public/1748942541728_20250603_EP-186288A_AHA_398_MOBILE.jpg",
    imageAlt: "Candidate speaking with neighbors at a community event.",
  },
  {
    id: "dronamix-kawasaki",
    slug: "dronamix-kawasaki",
    title: "Partnership With Dronamix and Kawasaki",
    subtitle: "New green logistics hub promises good jobs and lower emissions.",
    date: "September 18, 2025",
    excerpt:
      "We are entering the design phase of a joint drone logistics hub that will speed up deliveries while keeping more trucks off the road.",
    body: [
      "Dronamix and Kawasaki both confirmed that they will open training programs locally so residents can qualify for the new technical roles the hub will require.",
      "The project is also expected to eliminate more than nine thousand heavy-duty truck trips each year, trimming congestion and pollution in our neighborhoods.",
      "Community consultations begin in October and will focus on airspace safety, job pathways, and the sustainability milestones we expect the partners to meet.",
    ],
    url: "/news/dronamix-kawasaki",
    imageSrc: "/public/photo3.jpg",
    imageAlt: "Drone prototype on a maintenance stand.",
  },
  {
    id: "manutd-income",
    slug: "manutd-income",
    title: "Local Club Champions Youth Sports",
    subtitle: "Storm FC reinvests record revenue into new scholarships.",
    date: "August 28, 2025",
    excerpt:
      "Rising attendance and broadcast support created a surplus that will cover equipment and travel for more than one hundred young athletes.",
    body: [
      "Club leadership committed to open tryouts this winter so every student who wants to play has a chance to join a developmental squad.",
      "The scholarship fund includes mentorship and tutoring components to keep grades strong during the busy tournament schedule.",
      "Parents who are interested in volunteering can sign up for a workshop next month to learn more about coaching and team logistics.",
    ],
    url: "/news/manutd-income",
    imageSrc: "/public/background.jpg",
    imageAlt: "Youth soccer players celebrating a goal.",
  },
  {
    id: "active-seniors",
    slug: "active-seniors",
    title: "Keeping Our Seniors Active",
    subtitle: "New programming triples class options at the wellness center.",
    date: "August 14, 2025",
    excerpt:
      "Morning tai chi, balance clinics, and art circles are now available every day of the week thanks to a grant from the Vitality Fund.",
    body: [
      "Resident instructors led a pilot series over the summer and the overwhelming response convinced us to extend the classes year round.",
      "The wellness center has also expanded its transportation shuttle so seniors in every neighborhood have a reliable way to attend sessions.",
      "We will track participation numbers closely and advocate for continued support in next year\'s municipal budget.",
    ],
    url: "/news/active-seniors",
    imageSrc: "/public/background.jpg",
    imageAlt: "Seniors exercising together in a sunny studio.",
  },
  {
    id: "conversation-highlights",
    slug: "conversation-highlights",
    title: "Conversation Highlights: Neighborhood Listening Tour",
    subtitle: "A snapshot of the stories shaping our platform.",
    date: "August 1, 2025",
    excerpt:
      "From small business resiliency to classroom upgrades, the conversations we held this month capture the priorities of every block we visited.",
    body: [
      "Volunteers hosted more than thirty porch chats and collected hundreds of postcards with resident ideas and concerns.",
      "Several parents asked us to keep pushing for modernized science labs while local shop owners requested a simplified licensing process.",
      "We will continue the tour throughout the fall and share a transparent tracker so the community can see how each idea progresses.",
    ],
    url: "/news/conversation-highlights",
    imageSrc: "/public/background.jpg",
    imageAlt: "Community members gathered for an outdoor meeting.",
  },
];

export const getAllNews = () => {
  return newsItems;
};

export const getNewsBySlug = (slug) => {
  return newsItems.find((item) => item.slug === slug);
};
