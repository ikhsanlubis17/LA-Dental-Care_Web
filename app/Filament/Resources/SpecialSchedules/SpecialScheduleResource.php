<?php

namespace App\Filament\Resources\SpecialSchedules;

use App\Filament\Resources\SpecialSchedules\Pages\CreateSpecialSchedule;
use App\Filament\Resources\SpecialSchedules\Pages\EditSpecialSchedule;
use App\Filament\Resources\SpecialSchedules\Pages\ListSpecialSchedules;
use App\Filament\Resources\SpecialSchedules\Schemas\SpecialScheduleForm;
use App\Filament\Resources\SpecialSchedules\Tables\SpecialSchedulesTable;
use App\Models\SpecialSchedule;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SpecialScheduleResource extends Resource
{
    protected static ?string $model = SpecialSchedule::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return SpecialScheduleForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SpecialSchedulesTable::configure($table);
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
            'index' => ListSpecialSchedules::route('/'),
            'create' => CreateSpecialSchedule::route('/create'),
            'edit' => EditSpecialSchedule::route('/{record}/edit'),
        ];
    }
}
