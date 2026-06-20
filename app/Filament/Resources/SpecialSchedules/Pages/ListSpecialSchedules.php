<?php

namespace App\Filament\Resources\SpecialSchedules\Pages;

use App\Filament\Resources\SpecialSchedules\SpecialScheduleResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSpecialSchedules extends ListRecords
{
    protected static string $resource = SpecialScheduleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
