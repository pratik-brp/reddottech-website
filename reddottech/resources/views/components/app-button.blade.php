@props(['variant' => 'default', 'size' => 'md', 'type' => 'button'])

@php
$base = 'inline-flex items-center justify-center gap-2 font-bold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-w-[224px] md:py-4 py-2 rounded-[10px]';

$variantStyles = [
    'default' => 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500',
    'primary' => 'bg-primary text-white hover:bg-primary/50 shadow-2xl hover:shadow-4xl',
    'secondary' => 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
    'outline' => 'border border-black text-black bg-white hover:bg-gray-50 focus:ring-gray-200',
    'danger' => 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500',
    'ghost' => 'bg-transparent text-gray-700 hover:bg-gray-100',
    'arrow-rt'=> 'bg-primary text-white font-normal hover:bg-primary/50 shadow-2xl hover:shadow-4xl arrow arrow-rt',
    'arrow-rt-sm'=> 'bg-primary text-white font-normal sm hover:bg-primary/50 shadow-2xl hover:shadow-4xl arrow arrow-rt',
    'arrow-lt'=> 'bg-primary text-white font-normal hover:bg-primary/50 shadow-2xl hover:shadow-4xl arrow arrow-lt',
];

$sizeStyles = [
    'sm' => 'px-3 py-1 text-xs !min-w-none',
    'md' => 'px-4 py-2 md:text-sm text-xs',
    'lg' => 'px-6 py-3 text-base',
];

$class = $base . ' ' .
    ($variantStyles[$variant] ?? $variantStyles['default']) . ' ' .
    ($sizeStyles[$size] ?? $sizeStyles['md']);
@endphp

<button type="{{ $type }}" {{ $attributes->merge(['class' => $class]) }}>
    {{ $slot }}
</button>