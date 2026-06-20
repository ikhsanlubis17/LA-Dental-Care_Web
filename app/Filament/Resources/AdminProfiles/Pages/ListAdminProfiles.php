<?php

namespace App\Filament\Resources\AdminProfiles\Pages;

use App\Filament\Resources\AdminProfiles\AdminProfileResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAdminProfiles extends ListRecords
{
    protected static string $resource = AdminProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
