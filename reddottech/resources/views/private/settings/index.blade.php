<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold">Banner Settings</h2>
    </x-slot>

    <div style="max-width:500px;margin:8px auto 0">
        <div style="padding:16px;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
            <form action="{{ route('admin.settings.update') }}" method="POST">
                @csrf

                <div style="margin-bottom:12px">
                    <label style="display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:4px">Subtitle</label>
                    <input type="text" name="batch_banner_subtitle" value="{{ $settings['batch_banner_subtitle'] ?? '' }}" style="width:100%;border:1px solid #d1d5db;border-radius:4px;padding:6px 8px;font-size:14px">
                </div>

                <div style="margin-bottom:12px">
                    <label style="display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:4px">Title (HTML allowed)</label>
                    <textarea name="batch_banner_title" rows="2" style="width:100%;border:1px solid #d1d5db;border-radius:4px;padding:6px 8px;font-size:14px">{{ $settings['batch_banner_title'] ?? '' }}</textarea>
                </div>

                <div style="margin-bottom:12px">
                    <label style="display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:4px">Button Text</label>
                    <input type="text" name="batch_banner_button_text" value="{{ $settings['batch_banner_button_text'] ?? 'Enroll Now' }}" style="width:100%;border:1px solid #d1d5db;border-radius:4px;padding:6px 8px;font-size:14px">
                </div>

                <div style="margin-top:12px">
                    <button type="submit" style="padding:6px 14px;background:#111827;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px">Save Settings</button>
                </div>
            </form>

            <div style="margin-top:16px;padding:12px;background:#f9fafb;border-radius:4px;border:1px solid #e5e7eb">
                <h4 style="font-size:12px;font-weight:600;color:#4b5563;margin-bottom:6px">Preview</h4>
                <div style="background:#1f2937;color:#fff;padding:16px;border-radius:6px;text-align:center">
                    <p style="font-size:13px;margin-bottom:6px;opacity:0.8">{{ $settings['batch_banner_subtitle'] ?? '' }}</p>
                    <h2 style="font-size:18px;font-weight:700">{!! $settings['batch_banner_title'] ?? '' !!}</h2>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
