<?php

namespace App\Filament\Resources\SpecialSchedules\Pages;

use App\Filament\Resources\SpecialSchedules\SpecialScheduleResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditSpecialSchedule extends EditRecord
{
    protected static string $resource = SpecialScheduleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
