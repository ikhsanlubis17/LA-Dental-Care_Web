<?php

namespace App\Filament\Resources\ClinicAdvantages\Pages;

use App\Filament\Resources\ClinicAdvantages\ClinicAdvantageResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditClinicAdvantage extends EditRecord
{
    protected static string $resource = ClinicAdvantageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
