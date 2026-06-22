<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ActivityLog;

class ActivityLogPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function view(User $user, ActivityLog $activityLog): bool
    {
        return $user->isSuperAdmin();
    }

    public function create(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function update(User $user, ActivityLog $activityLog): bool
    {
        return $user->isSuperAdmin();
    }

    public function delete(User $user, ActivityLog $activityLog): bool
    {
        return $user->isSuperAdmin();
    }

    public function restore(User $user, ActivityLog $activityLog): bool
    {
        return $user->isSuperAdmin();
    }

    public function forceDelete(User $user, ActivityLog $activityLog): bool
    {
        return $user->isSuperAdmin();
    }
}