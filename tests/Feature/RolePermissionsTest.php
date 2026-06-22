<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\AdminProfile;
use App\Models\SiteSetting;
use App\Models\SeoSetting;
use App\Models\ActivityLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class RolePermissionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_access_restricted_resources(): void
    {
        $superAdminUser = User::factory()->create();
        AdminProfile::create([
            'user_id' => $superAdminUser->id,
            'full_name' => 'Super Admin',
            'email' => $superAdminUser->email,
            'role' => 'super_admin',
        ]);

        $this->assertTrue($superAdminUser->isSuperAdmin());
        $this->assertTrue($superAdminUser->isAdmin());

        $this->assertTrue(Gate::forUser($superAdminUser)->allows('viewAny', AdminProfile::class));
        $this->assertTrue(Gate::forUser($superAdminUser)->allows('viewAny', User::class));
        $this->assertTrue(Gate::forUser($superAdminUser)->allows('viewAny', ActivityLog::class));
        $this->assertTrue(Gate::forUser($superAdminUser)->allows('viewAny', SiteSetting::class));
        $this->assertTrue(Gate::forUser($superAdminUser)->allows('viewAny', SeoSetting::class));
    }

    public function test_admin_cannot_access_restricted_resources(): void
    {
        $adminUser = User::factory()->create();
        AdminProfile::create([
            'user_id' => $adminUser->id,
            'full_name' => 'Regular Admin',
            'email' => $adminUser->email,
            'role' => 'admin',
        ]);

        $this->assertFalse($adminUser->isSuperAdmin());
        $this->assertTrue($adminUser->isAdmin());

        $this->assertFalse(Gate::forUser($adminUser)->allows('viewAny', AdminProfile::class));
        $this->assertFalse(Gate::forUser($adminUser)->allows('viewAny', User::class));
        $this->assertFalse(Gate::forUser($adminUser)->allows('viewAny', ActivityLog::class));
        $this->assertFalse(Gate::forUser($adminUser)->allows('viewAny', SiteSetting::class));
        $this->assertFalse(Gate::forUser($adminUser)->allows('viewAny', SeoSetting::class));
    }
}