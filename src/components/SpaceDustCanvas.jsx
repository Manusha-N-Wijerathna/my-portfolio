'use client';

import { useEffect, useRef } from 'react';

export default function SpaceDustCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const resize = () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', resize);

        // Particle configuration
        const numParticles = 40;
        const particles = [];
        
        // Mouse interaction state
        const mouse = { x: -1000, y: -1000, radius: 130 };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const parent = canvas.parentElement;
        if (parent) {
            parent.addEventListener('mousemove', handleMouseMove);
            parent.addEventListener('mouseleave', handleMouseLeave);
        }

        class Particle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : height + 10;
                this.radius = Math.random() * 1.5 + 0.6;
                this.speedX = (Math.random() - 0.5) * 0.25;
                this.speedY = -(Math.random() * 0.35 + 0.15); // Gently rising
                this.alpha = Math.random() * 0.5 + 0.25;
                this.pulseSpeed = Math.random() * 0.015 + 0.005;
                this.pulseDir = Math.random() > 0.5 ? 1 : -1;
                this.hue = Math.random() > 0.6 ? 245 : 265; // Soft indigo / purple
            }

            update() {
                // Natural movement
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse push effect
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    // Push away from cursor
                    const forceX = (dx / dist) * force * 1.8;
                    const forceY = (dy / dist) * force * 1.8;
                    this.x += forceX;
                    this.y += forceY;
                }

                // Periodic twinkling / pulsing
                this.alpha += this.pulseSpeed * this.pulseDir;
                if (this.alpha > 0.8) {
                    this.alpha = 0.8;
                    this.pulseDir = -1;
                } else if (this.alpha < 0.2) {
                    this.alpha = 0.2;
                    this.pulseDir = 1;
                }

                // Wrap around or recreate at bottom when off screen
                if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                    this.reset(false);
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 80%, 75%, ${this.alpha})`;
                ctx.shadowBlur = this.radius * 3;
                ctx.shadowColor = `hsla(${this.hue}, 80%, 70%, 0.4)`;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset shadow for connecting lines
            }
        }

        // Initialize particles
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        // Floating ambient nebulas in background
        const nebulas = [
            { x: width * 0.25, y: height * 0.35, r: Math.min(width, height) * 0.45, color: 'rgba(61, 47, 196, 0.06)', angle: 0, speed: 0.0006, radiusOffset: 0.12 },
            { x: width * 0.75, y: height * 0.65, r: Math.min(width, height) * 0.35, color: 'rgba(108, 99, 255, 0.05)', angle: Math.PI, speed: 0.0009, radiusOffset: 0.08 }
        ];

        function drawNebulas() {
            nebulas.forEach((n) => {
                n.angle += n.speed;
                // Soft sinus drifting
                const dx = Math.cos(n.angle) * 35;
                const dy = Math.sin(n.angle * 1.3) * 25;
                const r = n.r * (1 + Math.sin(n.angle * 1.8) * n.radiusOffset);

                const grad = ctx.createRadialGradient(
                    n.x + dx, n.y + dy, 0,
                    n.x + dx, n.y + dy, r
                );
                grad.addColorStop(0, n.color);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.beginPath();
                ctx.arc(n.x + dx, n.y + dy, r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            });
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = (1 - dist / 110) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(180, 170, 255, ${alpha})`;
                        ctx.lineWidth = 0.55;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // 1. Draw nebulas first
            drawNebulas();

            // 2. Draw connections
            drawLines();

            // 3. Update and draw particles
            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            animationId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            if (parent) {
                parent.removeEventListener('mousemove', handleMouseMove);
                parent.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}
