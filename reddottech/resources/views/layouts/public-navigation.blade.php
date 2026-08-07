{{-- ═══════════════════════════════════════════════════════════════════
     BRP Group-style Glassmorphism Floating Pill Navbar
     Matches the reference image 100%
     ═══════════════════════════════════════════════════════════════════ --}}
<div
    x-data="{
        open: false,
        scrolled: false,
        init() {
            this.scrolled = window.scrollY > 30;
            window.addEventListener('scroll', () => {
                this.scrolled = window.scrollY > 30;
            });
        }
    }"
    class="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-300"
    :class="scrolled ? 'py-2.5' : 'py-4 lg:py-5'"
    style="font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;"
>
    {{-- Main Outer Glassmorphism Pill --}}
    <div
        class="mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 sm:px-7 py-2.5 transition-all duration-300"
        style="background: rgba(230, 232, 245, 0.65); backdrop-filter: blur(20px) saturate(1.5); -webkit-backdrop-filter: blur(20px) saturate(1.5); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);"
    >
        {{-- Left: Logo --}}
        <a href="{{ route('home') }}" class="shrink-0 flex items-center transition-opacity hover:opacity-90">
            <x-application-logo class="h-9 md:h-10 w-auto fill-current text-[#0F172A]" />
        </a>

        {{-- Center: Nav Links inside White Pill Container --}}
        <nav class="hidden md:flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-1 shadow-sm border border-white/80 backdrop-blur-md">
            {{-- Home --}}
            <a
                href="{{ route('home') }}"
                class="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 {{ request()->routeIs('home') ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-700 hover:text-black hover:bg-black/5' }}"
            >
                @if(request()->routeIs('home'))
                    <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
                @endif
                Home
            </a>

            {{-- About Us --}}
            <a
                href="{{ route('about') }}"
                class="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 {{ request()->routeIs('about') ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-700 hover:text-black hover:bg-black/5' }}"
            >
                @if(request()->routeIs('about'))
                    <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
                @endif
                About Us
            </a>

            {{-- PECP --}}
            <a
                href="{{ route('pecp') }}"
                class="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 {{ request()->routeIs('pecp') ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-700 hover:text-black hover:bg-black/5' }}"
            >
                @if(request()->routeIs('pecp'))
                    <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
                @endif
                PECP
            </a>

            {{-- Course --}}
            <a
                href="{{ route('courses') }}"
                class="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 {{ request()->routeIs('courses') ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-700 hover:text-black hover:bg-black/5' }}"
            >
                @if(request()->routeIs('courses'))
                    <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
                @endif
                Course
            </a>

            {{-- Contact Us --}}
            <a
                href="{{ route('contact') }}"
                class="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 {{ request()->routeIs('contact') ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-700 hover:text-black hover:bg-black/5' }}"
            >
                @if(request()->routeIs('contact'))
                    <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
                @endif
                Contact Us
            </a>
        </nav>

        {{-- Right: Connect Button + Mobile Hamburger --}}
        <div class="flex items-center gap-3">
            {{-- Connect CTA Button (Dark pill + White circle arrow) --}}
            <a
                href="{{ route('ai-unlocked') }}"
                class="group flex items-center gap-3 rounded-full bg-[#0F172A] pl-5 pr-1.5 py-1.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-black active:scale-95"
            >
                <span>Connect</span>
                <span class="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0F172A] transition-transform group-hover:translate-x-0.5">
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                    </svg>
                </span>
            </a>

            {{-- Mobile Hamburger (Icon swap on toggle) --}}
            <button
                @click="open = !open"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#0F172A] border border-white/80 shadow-sm transition-all hover:bg-white md:hidden focus:outline-none"
                aria-label="Toggle menu"
            >
                <svg x-show="!open" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
                <svg x-show="open" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" style="display: none;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    </div>

    {{-- Mobile Menu Card Overlay --}}
    <div
        x-show="open"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        class="fixed inset-0 z-40 md:hidden"
        style="display: none;"
    >
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="open = false"></div>

        <div
            x-show="open"
            x-transition:enter="transition ease-out duration-300 transform origin-top"
            x-transition:enter-start="opacity-0 scale-95 -translate-y-4"
            x-transition:enter-end="opacity-100 scale-100 translate-y-0"
            x-transition:leave="transition ease-in duration-200 transform origin-top"
            x-transition:leave-start="opacity-100 scale-100 translate-y-0"
            x-transition:leave-end="opacity-0 scale-95 -translate-y-4"
            class="relative mx-4 mt-20 rounded-3xl p-5 shadow-2xl"
            style="background: rgba(240, 242, 252, 0.95); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.8);"
        >
            <div class="flex flex-col gap-1.5">
                <a
                    href="{{ route('home') }}"
                    @click="open = false"
                    class="flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all {{ request()->routeIs('home') ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-700 hover:bg-black/5' }}"
                >
                    @if(request()->routeIs('home'))
                        <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
                    @endif
                    Home
                </a>

                <a
                    href="{{ route('about') }}"
                    @click="open = false"
                    class="flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all {{ request()->routeIs('about') ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-700 hover:bg-black/5' }}"
                >
                    @if(request()->routeIs('about'))
                        <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
                    @endif
                    About Us
                </a>

                <a
                    href="{{ route('pecp') }}"
                    @click="open = false"
                    class="flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all {{ request()->routeIs('pecp') ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-700 hover:bg-black/5' }}"
                >
                    @if(request()->routeIs('pecp'))
                        <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
                    @endif
                    PECP
                </a>

                <a
                    href="{{ route('courses') }}"
                    @click="open = false"
                    class="flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all {{ request()->routeIs('courses') ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-700 hover:bg-black/5' }}"
                >
                    @if(request()->routeIs('courses'))
                        <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
                    @endif
                    Course
                </a>

                <a
                    href="{{ route('contact') }}"
                    @click="open = false"
                    class="flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all {{ request()->routeIs('contact') ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-700 hover:bg-black/5' }}"
                >
                    @if(request()->routeIs('contact'))
                        <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
                    @endif
                    Contact Us
                </a>

                <div class="mt-2 pt-3 border-t border-black/10">
                    <a
                        href="{{ route('ai-unlocked') }}"
                        @click="open = false"
                        class="flex w-full items-center justify-center gap-2 rounded-full bg-[#0F172A] py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-black active:scale-95"
                    >
                        <span>Connect</span>
                        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>