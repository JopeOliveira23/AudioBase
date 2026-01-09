import React, { useEffect, useRef, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Slider } from 'primereact/slider';

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
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  /* ---------- Refs ---------- */
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastVolumeRef = useRef(80);
  const hideVolumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastPlayedPostRef = useRef<Post | null>(null);


  /* ---------- Mock Data ---------- */
  const posts: Post[] = [
    { id: 1, user: 'DJ Underground', hours: 1, title: 'Base Noturna Vol. 1', duration: 95 },
    { id: 2, user: 'Beat Maker X', hours: 3, title: 'Trap Session 140bpm', duration: 150 },
    { id: 3, user: 'LoFi Lab', hours: 6, title: 'Midnight Chill', duration: 172 }
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Evita conflito com inputs, sliders, etc
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;
    
      if (isTyping) return;
    
      if (e.code === 'Space') {
        e.preventDefault();
      
        // Se está tocando, pausa
        if (playingPostId !== null) {
          const currentPost = posts.find(p => p.id === playingPostId);
          if (currentPost) {
            togglePlay(currentPost);
          }
          return;
        }
      
        // Se não está tocando, toca o último ou o primeiro
        const postToPlay =
          lastPlayedPostRef.current ?? posts[0];
      
        if (postToPlay) {
          togglePlay(postToPlay);
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playingPostId, posts, togglePlay]);

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
    <div className="min-h-screen surface-ground py-4">
      <div className="flex justify-content-center">
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          <TabView>
            <TabPanel header="Explorar">
              <div className="flex flex-column gap-6">
                {posts.map(post => {
                  const isLiked = likedPosts.includes(post.id);
                  const time = currentTime[post.id] ?? 0;
                  const isPlaying = playingPostId === post.id;

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
                            image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png"
                            className="mr-3"
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
                        <div className="font-bold mb-1">{post.title}</div>
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
                                [post.id]: e.value as number
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
                            icon={isLiked ? 'pi pi-thumbs-up-fill' : 'pi pi-thumbs-up'}
                            label={isLiked ? 'Curtido' : 'Curtir'}
                            text
                            onClick={() => toggleLike(post.id)}
                          />
                          <Button icon="pi pi-comment" label="Comentar" text />
                          <Button icon="pi pi-share-alt" label="Compartilhar" text />
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
                        </div>
                        {/* Play */}
                        <Button
                          icon={isPlaying ? 'pi pi-pause' : 'pi pi-play'}
                          rounded
                          severity="warning"
                          onClick={() => togglePlay(post)}
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default Home;
