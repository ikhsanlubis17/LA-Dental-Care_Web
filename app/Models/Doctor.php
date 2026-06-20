<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $guarded = [];

    //
    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function specialSchedules()
    {
        return $this->hasMany(SpecialSchedule::class);
    }
}
