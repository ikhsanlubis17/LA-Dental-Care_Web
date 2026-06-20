<?php

namespace App\Filament\Resources\ClinicAdvantages\Pages;

use App\Filament\Resources\ClinicAdvantages\ClinicAdvantageResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListClinicAdvantages extends ListRecords
{
    protected static string $resource = ClinicAdvantageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
