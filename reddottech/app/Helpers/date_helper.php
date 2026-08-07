<?php

use Carbon\Carbon;

if (! function_exists('format_date')) {
    function format_date($date, $format = 'Y-m-d', $lowercase = false)
    {
        if (empty($date)) return null;

        try {
            $dt = Carbon::parse($date);
        } catch (Exception $e) {
            return null;
        }

        if ($format === 'human') {
            $out = $dt->format('jS M, Y');
            return $lowercase ? strtolower($out) : $out;
        }

        return $dt->format($format);
    }
}
