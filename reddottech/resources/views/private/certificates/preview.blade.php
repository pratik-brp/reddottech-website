<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificate — {{ $certificate->name }}</title>
<style>
  :root{--navy:#16264A;--navy2:#1F3864;--red:#C8102E;--ink:#22303F;--grey:#5C6878;--line:#E2E8F2}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#f0f2f5;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
  .certbox{background:#fff;border:14px solid var(--navy);border-radius:6px;padding:40px;text-align:center;max-width:780px;margin:0 auto;position:relative}
  .certbox:before{content:"";position:absolute;inset:10px;border:2px solid var(--red)}
  .cert-logo{height:50px;width:auto;margin:0 auto 14px;display:block}
  .certbox .ctitle{font-size:13px;letter-spacing:4px;color:var(--red);font-weight:800;text-transform:uppercase}
  .certbox h2{font-size:38px;color:var(--navy);font-family:Georgia,serif;margin:6px 0 4px}
  .certbox .pres{color:var(--grey);font-size:14px;margin:18px 0 6px}
  .certbox .cname{font-size:34px;font-family:Georgia,serif;color:var(--navy2);border-bottom:2px solid var(--line);display:inline-block;padding:0 30px 6px;margin-bottom:14px}
  .certbox .cdesc{max-width:520px;margin:0 auto;color:var(--ink);font-size:14.5px}
  .certbox .csig{display:flex;justify-content:space-between;margin-top:36px;font-size:12px;color:var(--grey)}
  .certbox .csig b{color:var(--navy);font-size:14px}
  .back{position:fixed;top:20px;left:20px;background:var(--navy);color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;z-index:10}
  .back:hover{background:var(--navy2)}
  @@media print{.back{display:none}}
</style>
</head>
<body>
<a href="{{ route('admin.certificates.show', $certificate) }}" class="back">&larr; Back</a>
<div class="certbox">
  <img class="cert-logo" src="{{ asset('images/logo.png') }}" alt="Red Dot Technologies" onerror="this.style.display='none'">
  <div class="ctitle">Certificate of Completion</div>
  <h2>AI Unlocked</h2>
  <div style="color:var(--red);font-weight:700;font-size:13px;letter-spacing:1px">HANDS-ON AI LITERACY · 5 LESSONS</div>
  <div class="pres">This certifies that</div>
  <div class="cname">{{ $certificate->name }}</div>
  <div class="cdesc">has successfully completed all five lessons of <b>AI Unlocked</b>, demonstrating practical skills in understanding, using, creating with, and responsibly navigating artificial intelligence.</div>
  <div class="csig">
    <div style="text-align:left"><b>Red Dot Technologies Pvt. Ltd.</b><br>Baluwatar, Kathmandu, Nepal</div>
    <div style="text-align:right"><b>{{ $certificate->completed_at ? $certificate->completed_at->format('d F Y') : now()->format('d F Y') }}</b><br>Date of completion</div>
  </div>
</div>
</body>
</html>
