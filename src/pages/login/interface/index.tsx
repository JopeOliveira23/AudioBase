interface TextSlide {
  title: string;
  description: string;
  icons: { icon: string; label: string }[];
}

export const slides: TextSlide[] = [
  {
    title: "Crie seu perfil artístico",
    description:
      "Mostre quem você é como criador. Centralize seus releases, letras, beats, vídeos e projetos em um perfil público pensado para artistas.",
    icons: [
      { icon: "pi pi-user-edit", label: "Perfil de artista" },
      { icon: "pi pi-cloud-upload", label: "Publicações ilimitadas" }
    ]
  },
  {
    title: "Explore o feed criativo",
    description:
      "Descubra compositores, produtores, letristas, fotógrafos e estúdios. Um feed vivo com letras, beats, medleys, imagens e processos criativos.",
    icons: [
      { icon: "pi pi-compass", label: "Descoberta de talentos" },
      { icon: "pi pi-play-circle", label: "Conteúdo dinâmico" }
    ]
  },
  {
    title: "Colabore em projetos reais",
    description:
      "Crie colaborações, forme equipes e desenvolva projetos em conjunto, compartilhando arquivos, acompanhando etapas e produzindo à distância.",
    icons: [
      { icon: "pi pi-users", label: "Projetos colaborativos" },
      { icon: "pi pi-folder", label: "Troca de arquivos em nuvem" }
    ]
  },
  {
    title: "Divulgue seus projetos",
    description:
      "Transforme colaborações em canais de divulgação. Compartilhe bastidores, teasers e conteúdos oficiais com menções entre participantes.",
    icons: [
      { icon: "pi pi-megaphone", label: "Canais de divulgação" },
      { icon: "pi pi-share-alt", label: "Menções e reposts" }
    ]
  },
  {
    title: "Encontre estúdios próximos",
    description:
      "Leve sua produção para o próximo nível. Descubra estúdios musicais, sets de filmagem e estúdios de fotografia perto de você.",
    icons: [
      { icon: "pi pi-map-marker", label: "Busca por localização" },
      { icon: "pi pi-star", label: "Avaliações de usuários" }
    ]
  },
  {
    title: "Divulgue seu estúdio",
    description:
      "Cadastre seu estúdio, organize sua agenda e receba agendamentos de artistas e produtores diretamente pela plataforma.",
    icons: [
      { icon: "pi pi-calendar", label: "Agenda inteligente" },
      { icon: "pi pi-building", label: "Visibilidade profissional" }
    ]
  }
];
