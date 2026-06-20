<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $guarded = [];

    //
    public function service()
    {
        return $this->belongsTo(Service::class, 'selected_service_id');
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'selected_doctor_id');
    }
}
