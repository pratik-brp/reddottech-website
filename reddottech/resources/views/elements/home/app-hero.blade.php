<section 
    x-data="{
        tiltX: 0,
        tiltY: 0,
        onMove(e) {
            const r = $el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            this.tiltX = -py * 14;
            this.tiltY = px * 18;
        },
        onLeave() {
            this.tiltX = 0;
            this.tiltY = 0;
        }
    }"
    @pointermove="onMove($event)"
    @pointerleave="onLeave()"
    class="scene-3d relative min-h-screen overflow-hidden"
    style="background: var(--gradient-hero);"
>
    <!-- Background Animated Orbs -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
            class="animate-float absolute -left-[10%] top-[12%] h-[40vw] max-h-[520px] w-[40vw] max-w-[520px] rounded-full opacity-60 blur-[90px]"
            style="background: radial-gradient(circle, color-mix(in oklab, var(--brand-red) 35%, transparent) 0%, transparent 70%); animation-delay: 0s;"
        ></div>
        <div
            class="animate-float absolute -right-[12%] top-[8%] h-[36vw] max-h-[460px] w-[36vw] max-w-[460px] rounded-full opacity-50 blur-[80px]"
            style="background: radial-gradient(circle, oklch(0.88 0.08 55 / 0.65) 0%, transparent 70%); animation-delay: 2.5s;"
        ></div>
        <div
            class="animate-float absolute bottom-[6%] left-[30%] h-[28vw] max-h-[380px] w-[28vw] max-w-[380px] rounded-full opacity-55 blur-[70px]"
            style="background: radial-gradient(circle, oklch(0.95 0.08 55 / 0.55) 0%, transparent 70%); animation-delay: 5s;"
        ></div>
        <div
            class="animate-float absolute bottom-[18%] right-[18%] h-[18vw] max-h-[260px] w-[18vw] max-w-[260px] rounded-full opacity-40 blur-[60px]"
            style="background: radial-gradient(circle, color-mix(in oklab, var(--brand-red) 28%, transparent) 0%, transparent 70%); animation-delay: 7.5s;"
        ></div>
    </div>

    <!-- Main Container -->
    <div class="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 pb-24 pt-44 sm:pt-48 lg:grid-cols-[1.05fr_1fr] lg:pt-44">
        <!-- Left Information Column -->
        <div class="layer-3d">
            <span class="animate-rise inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--brand-red)_25%,transparent)] bg-[color-mix(in_oklab,var(--brand-mist)_70%,transparent)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-red)]">
                <span class="h-2 w-2 rounded-full bg-[var(--brand-red)]"></span>
                Nepal's certification hub
            </span>

            <h1 class="animate-rise mt-7 text-[clamp(3rem,7vw,5.6rem)] font-extrabold leading-[0.95] tracking-tight text-[var(--brand-ink)] [animation-delay:80ms]">
                Grow. Upskill.<br />
                <span class="text-[var(--brand-red)]">Succeed.</span>
            </h1>

            <p class="animate-rise mt-6 max-w-lg text-lg leading-relaxed text-[var(--brand-ink)]/70 [animation-delay:160ms]">
                Empowering Nepalese professionals with globally recognized certifications, immersive labs and career-ready skills.
            </p>

            <div class="animate-rise mt-9 flex flex-wrap gap-4 [animation-delay:240ms]">
                <a
                    href="{{ route('contact') }}"
                    class="rounded-2xl bg-[var(--brand-red)] px-8 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-1"
                    style="box-shadow: var(--shadow-3d);"
                >
                    Get Started
                </a>
                <a
                    href="{{ route('courses') }}"
                    class="glass-card rounded-2xl px-8 py-4 text-sm font-semibold text-[var(--brand-ink)] transition-transform hover:-translate-y-1"
                >
                    Explore Courses
                </a>
            </div>

            <dl class="animate-rise mt-14 flex flex-wrap gap-10 [animation-delay:320ms]">
                <div>
                    <dt class="text-3xl font-extrabold text-[var(--brand-ink)]">12k+</dt>
                    <dd class="mt-1 text-sm text-[var(--brand-ink)]/60">Learners trained</dd>
                </div>
                <div>
                    <dt class="text-3xl font-extrabold text-[var(--brand-ink)]">40+</dt>
                    <dd class="mt-1 text-sm text-[var(--brand-ink)]/60">Global certifications</dd>
                </div>
                <div>
                    <dt class="text-3xl font-extrabold text-[var(--brand-ink)]">96%</dt>
                    <dd class="mt-1 text-sm text-[var(--brand-ink)]/60">Completion rate</dd>
                </div>
            </dl>
        </div>

        <!-- Right 3D Scene Column -->
        <div
            class="layer-3d relative mx-auto aspect-square w-full max-w-[620px]"
            :style="`transform: rotateX(${tiltX}deg) rotateY(${tiltY}deg); transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);`"
        >
            <div
                class="animate-spin-slow absolute inset-[8%] rounded-full border border-[color-mix(in_oklab,var(--brand-red)_25%,transparent)]"
                style="transform: translateZ(-90px);"
            ></div>
            <div
                class="absolute inset-[20%] rounded-full"
                style="transform: translateZ(-140px); background: radial-gradient(circle, color-mix(in oklab, var(--brand-red) 30%, transparent), transparent 70%); filter: blur(40px);"
            ></div>

            <img
                src="{{ asset('/images/hero/hero-3d.png') }}"
                alt="3D illustration of learning and graduation cap with floating elements"
                width="1280"
                height="1280"
                class="animate-float relative h-full w-full object-contain drop-shadow-2xl"
                style="transform: translateZ(70px);"
            />

            <div
                class="glass-card animate-float absolute left-0 top-[18%] rounded-2xl px-5 py-4 [animation-delay:1.2s]"
                style="transform: translateZ(150px);"
            >
                <p class="text-xs uppercase tracking-widest text-[var(--brand-ink)]/50">Live cohort</p>
                <p class="mt-1 text-sm font-bold text-[var(--brand-ink)]">Cloud &amp; AI Bootcamp</p>
            </div>

            <div
                class="glass-card animate-float absolute bottom-[12%] right-0 rounded-2xl px-5 py-4 [animation-delay:2.4s]"
                style="transform: translateZ(170px);"
            >
                <p class="text-2xl font-extrabold text-[var(--brand-red)]">4.9★</p>
                <p class="text-xs font-medium text-[var(--brand-ink)]/60">Learner rating</p>
            </div>
        </div>
    </div>
</section>