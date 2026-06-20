<?php

namespace App\Filament\Resources\AdminProfiles\Pages;

use App\Filament\Resources\AdminProfiles\AdminProfileResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAdminProfile extends EditRecord
{
    protected static string $resource = AdminProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
