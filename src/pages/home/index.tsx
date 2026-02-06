import React, { useEffect, useRef, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Slider } from 'primereact/slider';
import { Background } from './style';

/* =======================
 * Types
 * ======================= */
type Post = {
  id: number;
  user: string;
  hours: number;
  title: string;
  duration: number; // segundos
};

/* =======================
 * Component
 * ======================= */
const Home: React.FC = () => {
  /* ---------- States ---------- */
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [playingPostId, setPlayingPostId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<Record<number, number>>({});
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);


  /* ---------- Refs ---------- */
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastVolumeRef = useRef(80);
  const hideVolumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastPlayedPostRef = useRef<Post | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);  


  /* ---------- Mock Data ---------- */
  const posts: Post[] = [
    { id: 1, user: 'DJ Underground', hours: 1, title: 'Base Noturna Vol. 1', duration: 95 },
    { id: 2, user: 'Beat Maker X', hours: 3, title: 'Trap Session 140bpm', duration: 150 },
    { id: 3, user: 'LoFi Lab', hours: 6, title: 'Midnight Chill', duration: 172 },
    { id: 1, user: 'DJ Underground', hours: 1, title: 'Base Noturna Vol. 1', duration: 95 },
    { id: 2, user: 'Beat Maker X', hours: 3, title: 'Trap Session 140bpm', duration: 150 },
    { id: 3, user: 'LoFi Lab', hours: 6, title: 'Midnight Chill', duration: 172 },
  ];

  type ContestType = 'beats' | 'vocals' | 'instrumental';

  type LabelPost = {
    id: number;
    label: string;        // nome da gravadora
    hours: number;
    contest: string;      // nome do contest
    genre: string;
    description: string;
    deadline: string;
    type: ContestType;
  };

  const labelPosts: LabelPost[] = [
    {
      id: 1,
      label: 'Urban Records',
      hours: 2,
      contest: 'New Trap Voices 2026',
      genre: 'Trap / Hip Hop',
      description:
        'Estamos procurando novos artistas para integrar o nosso casting. Envie sua melhor track autoral.',
      deadline: '20 Fev 2026',
      type: 'vocals',
    },
    {
      id: 2,
      label: 'Midnight Sounds',
      hours: 5,
      contest: 'Lo-Fi Beats Contest',
      genre: 'Lo-Fi / Chillhop',
      description:
        'Seleção de produtores independentes para compilar nosso próximo álbum lo-fi.',
      deadline: '10 Mar 2026',
      type: 'beats',
    },
    {
      id: 3,
      label: 'Bassline Collective',
      hours: 8,
      contest: 'House & Tech Open Call',
      genre: 'House / Tech House',
      description:
        'Vagas abertas para produtores com identidade forte e grooves dançantes.',
      deadline: '01 Abr 2026',
      type: 'beats',
    },
        {
      id: 1,
      label: 'Urban Records',
      hours: 2,
      contest: 'New Trap Voices 2026',
      genre: 'Trap / Hip Hop',
      description:
        'Estamos procurando novos artistas para integrar o nosso casting. Envie sua melhor track autoral.',
      deadline: '20 Fev 2026',
      type: 'vocals',
    },
    {
      id: 2,
      label: 'Midnight Sounds',
      hours: 5,
      contest: 'Lo-Fi Beats Contest',
      genre: 'Lo-Fi / Chillhop',
      description:
        'Seleção de produtores independentes para compilar nosso próximo álbum lo-fi.',
      deadline: '10 Mar 2026',
      type: 'beats',
    },
    {
      id: 3,
      label: 'Bassline Collective',
      hours: 8,
      contest: 'House & Tech Open Call',
      genre: 'House / Tech House',
      description:
        'Vagas abertas para produtores com identidade forte e grooves dançantes.',
      deadline: '01 Abr 2026',
      type: 'beats',
    },
  ];


  /* =======================
   * Handlers
   * ======================= */
  const toggleLike = (id: number) => {
    setLikedPosts(prev =>
      prev.includes(id)
        ? prev.filter(postId => postId !== id)
        : [...prev, id]
    );
  };

  const togglePlay = (post: Post) => {
    lastPlayedPostRef.current = post; // <<< ADICIONE ESTA LINHA

    const current = currentTime[post.id] ?? 0;

    // Se já terminou, reseta para o início
    if (current >= post.duration) {
      setCurrentTime(prev => ({
        ...prev,
        [post.id]: 0
      }));
    }

    // Pause
    if (playingPostId === post.id) {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      setPlayingPostId(null);
      return;
    }

    // Para qualquer outro áudio
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setPlayingPostId(post.id);

    const STEP = 0.1;
    const INTERVAL = 100;

    intervalRef.current = setInterval(() => {
      setCurrentTime(prev => {
        const currentTimeValue = prev[post.id] ?? 0;
        const next = currentTimeValue + STEP;

        if (next >= post.duration) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setPlayingPostId(null);

          return {
            ...prev,
            [post.id]: post.duration
          };
        }

        return {
          ...prev,
          [post.id]: next
        };
      });
    }, INTERVAL);
  };

  const handleSliderClick = (
    e: React.MouseEvent<HTMLDivElement>,
    post: Post
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1);

    setCurrentTime(prev => ({
      ...prev,
      [post.id]: percent * post.duration
    }));
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(lastVolumeRef.current);
    } else {
      lastVolumeRef.current = volume;
      setIsMuted(true);
      setVolume(0);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);

    if (value === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      lastVolumeRef.current = value;
    }
  };

  const handleVolumeMouseEnter = () => {
    if (hideVolumeTimeoutRef.current) {
      clearTimeout(hideVolumeTimeoutRef.current);
      hideVolumeTimeoutRef.current = null;
    }
    setShowVolume(true);
  };

  const handleVolumeMouseLeave = () => {
    hideVolumeTimeoutRef.current = setTimeout(() => {
      setShowVolume(false);
    }, 400);
  };

  const formatTime = (seconds: number) => {
    const total = Math.floor(seconds);
    const minutes = Math.floor(total / 60);
    const secs = total % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowScrollTop(e.currentTarget.scrollTop > 200);
  };
  
  /* =======================
   * Effects
   * ======================= */
  useEffect(() => {
    const initial: Record<number, number> = {};
    posts.forEach(post => {
      initial[post.id] = 0;
    });
    setCurrentTime(initial);
  }, []);

  /* ---------- State adicional ---------- */
  const [focusedPostId, setFocusedPostId] = useState<number | null>(posts[0]?.id ?? null);
  
  useEffect(() => {
    const SEEK_STEP = 10;
    const SEEK_STEP_FAST = 30;
  
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;
    
      if (isTyping) return;
    
      // SPACE → Play / Pause do post focado
      if (e.code === 'Space') {
        e.preventDefault();
        const post = posts.find(p => p.id === focusedPostId);
        if (!post) return;
        togglePlay(post);
        return;
      }
    
      // ← / → → retrocede / avança do post focado
      if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        e.preventDefault();
        const post = posts.find(p => p.id === focusedPostId);
        if (!post) return;
      
        const step = e.shiftKey ? SEEK_STEP_FAST : SEEK_STEP;
      
        setCurrentTime(prev => {
          const current = prev[post.id] ?? 0;
          const next = e.code === 'ArrowRight' ? current + step : current - step;
        
          return {
            ...prev,
            [post.id]: Math.max(0, Math.min(post.duration, next))
          };
        });
        return; // NÃO inicia o play automaticamente
      }
    
      // TAB → muda o post focado
      if (e.code === 'Tab') {
        e.preventDefault();
        const currentIndex = posts.findIndex(p => p.id === focusedPostId);
        if (currentIndex === -1) return;
      
        let nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
      
        if (nextIndex < 0) nextIndex = posts.length - 1;
        if (nextIndex >= posts.length) nextIndex = 0;
      
        setFocusedPostId(posts[nextIndex].id);
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedPostId, posts, togglePlay]);


  useEffect(() => {
    if (!showVolume) return;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
    
      const STEP = 5;
    
      setVolume(prev => {
        let next =
          e.deltaY < 0 ? prev + STEP : prev - STEP;
      
        next = Math.max(0, Math.min(100, next));
      
        if (next === 0) {
          setIsMuted(true);
        } else {
          setIsMuted(false);
          lastVolumeRef.current = next;
        }
      
        return next;
      });
    };
  
    window.addEventListener('wheel', handleWheel, {
      passive: false // 🔥 ISSO resolve o problema
    });
  
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [showVolume]);


  /* =======================
   * Render
   * ======================= */
  return (
    <Background>
      <div className="h-full w-full overflow-auto" ref={containerRef} onScroll={handleScroll}>
        <TabView>

          <TabPanel header="Publicações">
            {showScrollTop && (
              <Button
                icon={`pi ${isRefreshing ? 'pi-spin' : ''} pi-refresh`}
                label={isRefreshing ? 'Carregando...' : 'Novos posts'}
                rounded
                style={{position: 'sticky', top: '3%', left: '45%', zIndex: 2000}}
                onClick={() => {
                  setIsRefreshing(true);
                
                  containerRef.current?.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                
                  setTimeout(() => {
                    setIsRefreshing(false);
                  }, 1000);
                }}
              />
            )}
            <div className="flex flex-column gap-6">
              {posts.map(post => {
                const isLiked = likedPosts.includes(post.id);
                const time = currentTime[post.id] ?? 0;
                const isPlaying = playingPostId === post.id;

                const getInitials = (name = '') => {
                  return name
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2)
                    .map(word => word[0])
                    .join('')
                    .toUpperCase();
                };

                return (
                  <Card
                    key={post.id}
                    className="
                      surface-card
                      border-round-xl
                      shadow-1
                      transition-all
                      transition-duration-200
                      hover:shadow-3
                      hover:surface-hover
                      p-3
                    "
                  >
                    {/* Header */}
                    <div className="flex align-items-center justify-content-between mb-3">
                      <div className="flex align-items-center">
                        <Avatar
                          label={getInitials(post.user)}
                          className="
                            mr-3
                            text-white
                            font-bold
                            p-4
                          "
                          shape="circle"
                        />

                        <div>
                          <div className="font-bold">{post.user}</div>
                          <small className="text-color-secondary">
                            há {post.hours}h
                          </small>
                        </div>
                      </div>

                      <Button icon="pi pi-ellipsis-h" rounded text />
                    </div>

                    {/* Conteúdo */}
                    <div className="mb-3">
                      <div className="font-bold mb-1">
                        {post.title}
                      </div>

                      <small className="text-color-secondary">
                        Hip Hop • 140 BPM
                      </small>
                    </div>

                    {/* Slider */}
                    <div className="mb-3">
                      <div
                        onClick={(e) => handleSliderClick(e, post)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Slider
                          value={time}
                          max={post.duration}
                          step={0.1}
                          onChange={(e) =>
                            setCurrentTime(prev => ({
                              ...prev,
                              [post.id]: e.value as number,
                            }))
                          }
                        />
                      </div>

                      <div className="flex justify-content-between text-xs mt-1">
                        <span>{formatTime(time)}</span>
                        <span>{formatTime(post.duration)}</span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex justify-content-between align-items-center">
                      <div className="flex gap-3">
                        <Button
                          icon={
                            isLiked
                              ? 'pi pi-thumbs-up-fill'
                              : 'pi pi-thumbs-up'
                          }
                          label={
                            isLiked
                              ? 'Curtido'
                              : 'Curtir'
                          }
                          text
                          onClick={() => toggleLike(post.id)}
                        />

                        <Button
                          icon="pi pi-comment"
                          label="Comentar"
                          text
                        />

                        <Button
                          icon="pi pi-share-alt"
                          label="Compartilhar"
                          text
                        />
                      </div>

                      <div className="flex align-items-center gap-2">
                        {/* Volume */}
                        <div
                          className="relative flex align-items-center"
                          onMouseEnter={handleVolumeMouseEnter}
                          onMouseLeave={handleVolumeMouseLeave}
                        >
                          <Button
                            icon={
                              isMuted || volume === 0
                                ? 'pi pi-volume-off'
                                : 'pi pi-volume-up'
                            }
                            rounded
                            text
                            onClick={toggleMute}
                            style={{marginRight: '9rem'}}
                          />
                          {showVolume && (
                            <div
                              className="absolute left-full ml-6 p-2 surface-card shadow-3 border-round"
                              style={{ width: '120px', zIndex: 10 }}
                            >
                              <Slider
                                value={volume}
                                min={0}
                                max={100}
                                onChange={(e) =>
                                  handleVolumeChange(e.value as number)
                                }
                              />
                            </div>
                          )}
                        </div>

                        {/* Play */}
                        <Button
                          icon={isPlaying ? 'pi pi-pause' : 'pi pi-play'}
                          rounded
                          severity="warning"
                          onClick={() => togglePlay(post)}
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabPanel>
          <TabPanel header="Gravadoras">
            {showScrollTop && (
              <Button
                icon={`pi ${isRefreshing ? 'pi-spin' : ''} pi-refresh`}
                label={isRefreshing ? 'Carregando...' : 'Novos posts'}
                rounded
                style={{position: 'sticky', top: '3%', left: '45%', zIndex: 2000}}
                onClick={() => {
                  setIsRefreshing(true);
                
                  containerRef.current?.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                
                  setTimeout(() => {
                    setIsRefreshing(false);
                  }, 1000);
                }}
              />
            )}
            <div className="flex flex-column gap-6">
              {labelPosts.map(post => {
                const isLiked = likedPosts.includes(post.id);

                const getInitials = (name: string) => {
                  return name
                    .split(' ')
                    .map(word => word[0])
                    .join('')
                    .toUpperCase();
                };

                const contestIconMap: Record<ContestType, string> = {
                  beats: 'pi pi-headphones',
                  vocals: 'pi pi-microphone',
                  instrumental: 'pi pi-volume-up',
                };

                return (
                  <Card
                    key={post.id}
                    className="surface-card border-round-xl shadow-1 p-3"
                  >
                    {/* Header */}
                    <div className="flex align-items-center justify-content-between mb-3">
                      <div className="flex align-items-center">
                        <Avatar
                          label={getInitials(post.label)}
                          className="
                            mr-3
                            text-white
                            font-bold
                            p-4
                          "
                          shape="circle"
                        />

                        <div>
                          <div className="font-bold">{post.label}</div>
                          <small className="text-color-secondary">
                            há {post.hours}h
                          </small>
                        </div>
                      </div>

                      <Button icon="pi pi-ellipsis-h" rounded text />
                    </div>

                    {/* Conteúdo */}
                    <div className="mb-3">
                      <div className="font-bold text-lg mb-1 flex align-items-center gap-2">
                        <i className={contestIconMap[post.type]} />
                        <span>{post.contest}</span>
                      </div>

                      <small className="text-color-secondary block mb-2">
                        {post.genre}
                      </small>

                      <p className="text-sm line-height-3">
                        {post.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-content-between align-items-center">
                      <div className="flex gap-3">
                        <Button
                          icon={
                            isLiked
                              ? 'pi pi-thumbs-up-fill'
                              : 'pi pi-thumbs-up'
                          }
                          label={
                            isLiked
                              ? 'Interessado'
                              : 'Tenho interesse'
                          }
                          text
                          onClick={() => toggleLike(post.id)}
                        />

                        <Button
                          icon="pi pi-comment"
                          label="Perguntar"
                          text
                        />
                      </div>

                      <div className="flex align-items-center gap-3">
                        <span className="text-sm text-color-secondary">
                          📅 {post.deadline}
                        </span>

                        <Button
                          icon="pi pi-send"
                          label="Enviar Demo"
                          severity="warning"
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabPanel>
        </TabView>
      </div>
    </Background>
  );
};

export default Home;
