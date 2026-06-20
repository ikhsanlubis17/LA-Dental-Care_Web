<?php

namespace App\Filament\Resources\AdminProfiles;

use App\Filament\Resources\AdminProfiles\Pages\CreateAdminProfile;
use App\Filament\Resources\AdminProfiles\Pages\EditAdminProfile;
use App\Filament\Resources\AdminProfiles\Pages\ListAdminProfiles;
use App\Filament\Resources\AdminProfiles\Schemas\AdminProfileForm;
use App\Filament\Resources\AdminProfiles\Tables\AdminProfilesTable;
use App\Models\AdminProfile;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AdminProfileResource extends Resource
{
    protected static ?string $model = AdminProfile::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return AdminProfileForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AdminProfilesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListAdminProfiles::route('/'),
            'create' => CreateAdminProfile::route('/create'),
            'edit' => EditAdminProfile::route('/{record}/edit'),
        ];
    }
}
