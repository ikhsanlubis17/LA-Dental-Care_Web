<?php

namespace App\Filament\Resources\Schedules\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ScheduleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('doctor_id')
                    ->required()
                    ->numeric(),
                TextInput::make('day_name')
                    ->required(),
                TimePicker::make('start_time'),
                TimePicker::make('end_time'),
                Toggle::make('is_open')
                    ->required(),
                TextInput::make('note'),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
