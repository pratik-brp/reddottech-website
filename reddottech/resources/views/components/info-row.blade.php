@props(['label', 'value'])

<div class="flex justify-between py-2">
    <span class="font-semibold text-gray-700">{{ $label }}</span>
    <span>{{ $value }}</span>
</div>