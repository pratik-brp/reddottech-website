<div class="grid grid-cols-2 gap-4">
    {{-- Course Name --}}
    <div>
        <label class="block text-sm font-medium mb-1">Course Name</label>
        <input type="text" name="name" class="w-full border rounded p-2"
               value="{{ old('name', $course->name ?? '') }}" required>
    </div>

    {{-- Instructor Name --}}
    <div>
        <label class="block text-sm font-medium mb-1">Instructor Name</label>
        <input type="text" name="instructor_name" class="w-full border rounded p-2"
               value="{{ old('instructor_name', $course->instructor_name ?? '') }}">
    </div>

    {{-- Price --}}
    <div>
        <label class="block text-sm font-medium mb-1">Price</label>
        <input type="number" step="0.01" name="price" class="w-full border rounded p-2"
               value="{{ old('price', $course->price ?? '') }}">
    </div>

    {{-- Start Date --}}
    <div>
        <label class="block text-sm font-medium mb-1">Start Date</label>
        <input type="date" name="start_date" class="w-full border rounded p-2"
               value="{{ old('start_date', $course->start_date ?? '') }}">
    </div>

    {{-- Duration --}}
    <div>
        <label class="block text-sm font-medium mb-1">Duration</label>
        <input type="text" name="duration" placeholder="e.g. 3 months, 6 weeks" class="w-full border rounded p-2"
               value="{{ old('duration', $course->duration ?? '') }}">
    </div>

    {{-- Delivery Mode --}}
    <div>
        <label class="block text-sm font-medium mb-1">Delivery Mode</label>
        <select name="delivery" class="w-full border rounded p-2">
            <option value="online" {{ old('delivery', $course->delivery ?? '') == 'online' ? 'selected' : '' }}>Online</option>
            <option value="physical" {{ old('delivery', $course->delivery ?? '') == 'physical' ? 'selected' : '' }}>Physical</option>
        </select>
    </div>

    {{-- Mode --}}
    <div>
        <label class="block text-sm font-medium mb-1">Mode</label>
        <input type="text" name="mode" placeholder="e.g. Full-time, Part-time" class="w-full border rounded p-2"
               value="{{ old('mode', $course->mode ?? '') }}">
    </div>

    {{-- Language --}}
    <div>
        <label class="block text-sm font-medium mb-1">Language</label>
        <input type="text" name="language" class="w-full border rounded p-2"
               value="{{ old('language', $course->language ?? 'English') }}">
    </div>

    {{-- Skill Level --}}
    <div>
        <label class="block text-sm font-medium mb-1">Skill Level</label>
        <select name="skill_level" class="w-full border rounded p-2">
            <option value="">Select Level</option>
            <option value="beginner" {{ old('skill_level', $course->skill_level ?? '') == 'beginner' ? 'selected' : '' }}>Beginner</option>
            <option value="intermediate" {{ old('skill_level', $course->skill_level ?? '') == 'intermediate' ? 'selected' : '' }}>Intermediate</option>
            <option value="advanced" {{ old('skill_level', $course->skill_level ?? '') == 'advanced' ? 'selected' : '' }}>Advanced</option>
        </select>
    </div>

    {{-- Certification --}}
    <div>
        <label class="block text-sm font-medium mb-1">Certification</label>
        <select name="certification" class="w-full border rounded p-2">
            <option value="pecp" {{ old('certification', $course->certification ?? 'pecp') == 'pecp' ? 'selected' : '' }}>PECP</option>
            <option value="reddot" {{ old('certification', $course->certification ?? '') == 'reddot' ? 'selected' : '' }}>Reddot</option>
        </select>
    </div>

    {{-- Status --}}
    <div>
        <label class="block text-sm font-medium mb-1">Status</label>
        <select name="status" class="w-full border rounded p-2">
            <option value="published" {{ old('status', $course->status ?? 'published') == 'published' ? 'selected' : '' }}>Published</option>
            <option value="draft" {{ old('status', $course->status ?? '') == 'draft' ? 'selected' : '' }}>Draft</option>
        </select>
    </div>
</div>

{{-- Description --}}
<div class="mt-4">
    <label class="block text-sm font-medium mb-1">Description</label>
    <textarea id="description" name="description" class="w-full border rounded p-2">{{ old('description', $course->description ?? '') }}</textarea>
</div>

{{-- Instructor Detail (Text Editor) --}}
<div class="mt-4">
    <label class="block text-sm font-medium mb-1">Instructor Detail</label>
    <textarea id="instructor_detail" name="instructor_detail" class="w-full border rounded p-2">{{ old('instructor_detail', $course->instructor_detail ?? '') }}</textarea>
</div>

{{-- Requirements --}}
<div class="mt-4">
    <label class="block text-sm font-medium mb-1">Requirements</label>
    <textarea id="requirements" name="requirements" class="w-full border rounded p-2">{{ old('requirements', $course->requirements ?? '') }}</textarea>
</div>

{{-- Curriculum --}}
<div class="mt-4">
    <label class="block text-sm font-medium mb-1">Curriculum</label>
    <textarea id="curriculum" name="curriculum" class="w-full border rounded p-2">{{ old('curriculum', $course->curriculum ?? '') }}</textarea>
</div>

{{-- Thumbnail Upload --}}
<div class="mt-4">
    <label class="block text-sm font-medium mb-1">Thumbnail</label>
    <input type="file" name="thumbnail" class="w-full border rounded p-2" accept="image/*">
    @if (!empty($course?->thumbnail))
        <div class="mt-2">
            <img src="{{ asset('storage/' . $course->thumbnail) }}" alt="Thumbnail"
                 class="w-40 h-28 object-cover rounded">
        </div>
    @endif
</div>

{{-- Banner Image Upload --}}
<div class="mt-4">
    <label class="block text-sm font-medium mb-1">Banner Image</label>
    <input type="file" name="banner_image" class="w-full border rounded p-2" accept="image/*">
    @if (!empty($course?->banner_image))
        <div class="mt-2">
            <img src="{{ asset('storage/' . $course->banner_image) }}" alt="Banner"
                 class="w-60 h-32 object-cover rounded">
        </div>
    @endif
</div>

{{-- CKEditor --}}
<script src="https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js"></script>
<script>
    const editors = ['description', 'requirements', 'curriculum', 'instructor_detail'];

    editors.forEach(id => {
        ClassicEditor
            .create(document.querySelector(`#${id}`), {
                toolbar: [
                    'undo', 'redo', '|',
                    'heading', '|',
                    'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                    'blockQuote', 'insertTable', 'mediaEmbed'
                ]
            })
            .catch(error => console.error(error));
    });
</script>