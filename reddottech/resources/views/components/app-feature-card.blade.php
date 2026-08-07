
@props([
    'variant' => 'default',
    'size' => 'md',
    'type' => 'button',
    // main dynamic props
    'heading' => null,
    'icon' => null, // can be an asset path (e.g. 'images/icon.png') or an absolute URL
    'description' => null,
])

@php
    // Determine the final icon src: if the passed icon contains a scheme (://) treat it as an absolute URL,
    // otherwise run it through the asset() helper. If no icon provided, leave empty.
    $iconSrc = '';
    if (!empty($icon)) {
        $iconSrc = (strpos($icon, '://') !== false) ? $icon : asset($icon);
    }
@endphp

<article class='app-feature px-4 max-w-[312px] flex flex-col items-center'>
    <div class="icon-holder p-2 border border-dotted border-primary rounded-full w-fit">
        <div class="icon w-[90px] h-[90px] bg-primary rounded-full flex items-center justify-center">
            @if($iconSrc)
                <img src="{{ $iconSrc }}" alt="{{ $heading ?? '' }}" class="md:w-[48px] md:h-[48x] w-[36px] h-[36px] object-contain">
            @else
                {{-- optional placeholder when no icon passed --}}
                <span class="text-white">{{-- empty placeholder --}}</span>
            @endif
        </div>
    </div>
    <h4 class='heading-normal md:mt-4 mt-2 text-center'>{{ $heading ?? '' }}</h4>
    <p class='card-text text-center md:mt-4 mt-2'>
        {{ $description ?? '' }}
    </p>
</article>

