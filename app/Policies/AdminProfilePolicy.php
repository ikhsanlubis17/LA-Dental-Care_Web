<?php

namespace App\Policies;

use App\Models\User;
use App\Models\AdminProfile;

class AdminProfilePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function view(User $user, AdminProfile $adminProfile): bool
    {
        return $user->isSuperAdmin();
    }

    public function create(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function update(User $user, AdminProfile $adminProfile): bool
    {
        return $user->isSuperAdmin();
    }

    public function delete(User $user, AdminProfile $adminProfile): bool
    {
        return $user->isSuperAdmin();
    }

    public function restore(User $user, AdminProfile $adminProfile): bool
    {
        return $user->isSuperAdmin();
    }

    public function forceDelete(User $user, AdminProfile $adminProfile): bool
    {
        return $user->isSuperAdmin();
    }
}