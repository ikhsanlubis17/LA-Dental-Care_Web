<?php

namespace App\Filament\Resources\ClinicAdvantages;

use App\Filament\Resources\ClinicAdvantages\Pages\CreateClinicAdvantage;
use App\Filament\Resources\ClinicAdvantages\Pages\EditClinicAdvantage;
use App\Filament\Resources\ClinicAdvantages\Pages\ListClinicAdvantages;
use App\Filament\Resources\ClinicAdvantages\Schemas\ClinicAdvantageForm;
use App\Filament\Resources\ClinicAdvantages\Tables\ClinicAdvantagesTable;
use App\Models\ClinicAdvantage;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ClinicAdvantageResource extends Resource
{
    protected static ?string $model = ClinicAdvantage::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return ClinicAdvantageForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ClinicAdvantagesTable::configure($table);
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
            'index' => ListClinicAdvantages::route('/'),
            'create' => CreateClinicAdvantage::route('/create'),
            'edit' => EditClinicAdvantage::route('/{record}/edit'),
        ];
    }
}
