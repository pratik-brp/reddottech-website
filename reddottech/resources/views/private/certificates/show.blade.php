<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold">Certificate Details</h2>
    </x-slot>

    <div class="max-w-3xl mx-auto mt-2">
        <div class="p-6 bg-white shadow-sm rounded-lg mb-6">
            <div class="flex items-center justify-between mb-6 pb-4 border-b">
                <div>
                    <h3 class="text-2xl font-bold">{{ $certificate->name }}</h3>
                    <p class="text-gray-500">{{ $certificate->email }}</p>
                </div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    AI Unlocked
                </span>
            </div>

            <div class="space-y-4">
                <div class="flex justify-between py-2 border-b">
                    <span class="text-gray-600">Name</span>
                    <span class="font-medium">{{ $certificate->name }}</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                    <span class="text-gray-600">Email</span>
                    <span class="font-medium">{{ $certificate->email }}</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                    <span class="text-gray-600">School</span>
                    <span class="font-medium">{{ $certificate->school ?? 'Not provided' }}</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                    <span class="text-gray-600">Completed At</span>
                    <span class="font-medium">{{ $certificate->completed_at ? $certificate->completed_at->format('d M Y, h:i A') : '-' }}</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                    <span class="text-gray-600">Submitted At</span>
                    <span class="font-medium">{{ $certificate->created_at->format('d M Y, h:i A') }}</span>
                </div>
            </div>

            <div class="mt-6 flex gap-3">
                <a href="{{ route('admin.certificates.index') }}" class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                    &larr; Back to list
                </a>
                <form action="{{ route('admin.certificates.destroy', $certificate) }}" method="POST" onsubmit="return confirm('Delete this certificate record?')">
                    @csrf
                    @method('DELETE')
                    <x-danger-button>Delete</x-danger-button>
                </form>
            </div>
        </div>

        <div class="p-6 bg-white shadow-sm rounded-lg">
            <h3 class="text-lg font-semibold mb-4">Certificate Preview</h3>
            <style>
                .cert-preview-box{background:#fff;border:14px solid #16264A;border-radius:6px;padding:40px;text-align:center;max-width:780px;margin:0 auto;position:relative}
                .cert-preview-box:before{content:"";position:absolute;inset:10px;border:2px solid #C8102E}
                .cert-preview-box .ctitle{font-size:13px;letter-spacing:4px;color:#C8102E;font-weight:800;text-transform:uppercase}
                .cert-preview-box h2{font-size:38px;color:#16264A;font-family:Georgia,serif;margin:6px 0 4px}
                .cert-preview-box .pres{color:#5C6878;font-size:14px;margin:18px 0 6px}
                .cert-preview-box .cname{font-size:34px;font-family:Georgia,serif;color:#1F3864;border-bottom:2px solid #E2E8F2;display:inline-block;padding:0 30px 6px;margin-bottom:14px}
                .cert-preview-box .cdesc{max-width:520px;margin:0 auto;color:#22303F;font-size:14.5px}
                .cert-preview-box .csig{display:flex;justify-content:space-between;margin-top:36px;font-size:12px;color:#5C6878}
                .cert-preview-box .csig b{color:#16264A;font-size:14px}
                .cert-preview-box .cert-logo{height:50px;width:auto;margin:0 auto 14px;display:block}
            </style>
            <div class="cert-preview-box">
                <img class="cert-logo" src="{{ asset('images/logo.png') }}" alt="Red Dot Technologies" onerror="this.style.display='none'">
                <div class="ctitle">Certificate of Completion</div>
                <h2>AI Unlocked</h2>
                <div style="color:#C8102E;font-weight:700;font-size:13px;letter-spacing:1px">HANDS-ON AI LITERACY · 5 LESSONS</div>
                <div class="pres">This certifies that</div>
                <div class="cname">{{ $certificate->name }}</div>
                <div class="cdesc">has successfully completed all five lessons of <b>AI Unlocked</b>, demonstrating practical skills in understanding, using, creating with, and responsibly navigating artificial intelligence.</div>
                <div class="csig">
                    <div style="text-align:left"><b>Red Dot Technologies Pvt. Ltd.</b><br>Baluwatar, Kathmandu, Nepal</div>
                    <div style="text-align:right"><b>{{ $certificate->completed_at ? $certificate->completed_at->format('d F Y') : now()->format('d F Y') }}</b><br>Date of completion</div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
