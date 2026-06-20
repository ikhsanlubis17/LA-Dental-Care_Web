<?php

$modelsDir = __DIR__ . '/app/Models';
$files = scandir($modelsDir);

foreach ($files as $file) {
    if ($file === '.' || $file === '..' || $file === 'User.php') continue;
    $path = $modelsDir . '/' . $file;
    $content = file_get_contents($path);
    if (strpos($content, '$guarded') === false) {
        $content = preg_replace('/\{/', "{\n    protected \$guarded = [];\n", $content, 1);
        file_put_contents($path, $content);
    }
}

// User model
$userPath = $modelsDir . '/User.php';
$userContent = file_get_contents($userPath);
if (strpos($userContent, 'adminProfile') === false) {
    $userContent = preg_replace('/\}$/', "    public function adminProfile()\n    {\n        return \$this->hasOne(AdminProfile::class);\n    }\n}", $userContent);
    file_put_contents($userPath, $userContent);
}

// AdminProfile model
$adminPath = $modelsDir . '/AdminProfile.php';
$adminContent = file_get_contents($adminPath);
if (strpos($adminContent, 'user') === false) {
    $adminContent = preg_replace('/\}$/', "    public function user()\n    {\n        return \$this->belongsTo(User::class);\n    }\n}", $adminContent);
    file_put_contents($adminPath, $adminContent);
}

// Doctor model
$doctorPath = $modelsDir . '/Doctor.php';
$doctorContent = file_get_contents($doctorPath);
if (strpos($doctorContent, 'schedules') === false) {
    $doctorContent = preg_replace('/\}$/', "    public function schedules()\n    {\n        return \$this->hasMany(Schedule::class);\n    }\n\n    public function specialSchedules()\n    {\n        return \$this->hasMany(SpecialSchedule::class);\n    }\n}", $doctorContent);
    file_put_contents($doctorPath, $doctorContent);
}

// Schedule model
$schedulePath = $modelsDir . '/Schedule.php';
$scheduleContent = file_get_contents($schedulePath);
if (strpos($scheduleContent, 'doctor') === false) {
    $scheduleContent = preg_replace('/\}$/', "    public function doctor()\n    {\n        return \$this->belongsTo(Doctor::class);\n    }\n}", $scheduleContent);
    file_put_contents($schedulePath, $scheduleContent);
}

// SpecialSchedule model
$specialPath = $modelsDir . '/SpecialSchedule.php';
$specialContent = file_get_contents($specialPath);
if (strpos($specialContent, 'doctor') === false) {
    $specialContent = preg_replace('/\}$/', "    public function doctor()\n    {\n        return \$this->belongsTo(Doctor::class);\n    }\n}", $specialContent);
    file_put_contents($specialPath, $specialContent);
}

// Booking model
$bookingPath = $modelsDir . '/Booking.php';
$bookingContent = file_get_contents($bookingPath);
if (strpos($bookingContent, 'service') === false) {
    $bookingContent = preg_replace('/\}$/', "    public function service()\n    {\n        return \$this->belongsTo(Service::class, 'selected_service_id');\n    }\n\n    public function doctor()\n    {\n        return \$this->belongsTo(Doctor::class, 'selected_doctor_id');\n    }\n}", $bookingContent);
    file_put_contents($bookingPath, $bookingContent);
}

// MediaFile model
$mediaPath = $modelsDir . '/MediaFile.php';
$mediaContent = file_get_contents($mediaPath);
if (strpos($mediaContent, 'uploader') === false) {
    $mediaContent = preg_replace('/\}$/', "    public function uploader()\n    {\n        return \$this->belongsTo(User::class, 'uploaded_by');\n    }\n}", $mediaContent);
    file_put_contents($mediaPath, $mediaContent);
}

// ActivityLog model
$activityPath = $modelsDir . '/ActivityLog.php';
$activityContent = file_get_contents($activityPath);
if (strpos($activityContent, 'user') === false) {
    $activityContent = preg_replace('/\}$/', "    public function user()\n    {\n        return \$this->belongsTo(User::class);\n    }\n}", $activityContent);
    file_put_contents($activityPath, $activityContent);
}

echo "Models updated with relationships and guarded properties.\n";