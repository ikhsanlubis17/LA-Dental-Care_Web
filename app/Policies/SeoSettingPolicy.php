<?php

namespace App\Policies;

use App\Models\User;
use App\Models\SeoSetting;

class SeoSettingPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function view(User $user, SeoSetting $seoSetting): bool
    {
        return $user->isSuperAdmin();
    }

    public function create(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function update(User $user, SeoSetting $seoSetting): bool
    {
        return $user->isSuperAdmin();
    }

    public function delete(User $user, SeoSetting $seoSetting): bool
    {
        return $user->isSuperAdmin();
    }

    public function restore(User $user, SeoSetting $seoSetting): bool
    {
        return $user->isSuperAdmin();
    }

    public function forceDelete(User $user, SeoSetting $seoSetting): bool
    {
        return $user->isSuperAdmin();
    }
}